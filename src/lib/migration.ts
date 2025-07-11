// Database Migration Utilities - As specified in PRD Phase 4
import { prisma } from './db';

export interface MigrationResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export interface DatabaseInfo {
  provider: 'postgresql' | 'sqlite';
  url: string;
  connected: boolean;
  version?: string;
  tables: string[];
  records: {
    cv: number;
    user: number;
    account?: number;
    session?: number;
    verificationToken?: number;
  };
}

/**
 * Check database connection and get information
 */
export async function getDatabaseInfo(): Promise<DatabaseInfo> {
  try {
    const databaseUrl = process.env.DATABASE_URL || '';
    const provider = databaseUrl.includes('postgresql') ? 'postgresql' : 'sqlite';

    // Test connection
    await prisma.$connect();

    // Get table information
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    ` as any[];

    // Count records in each table
    const cvCount = await prisma.cV.count();
    const userCount = await prisma.user.count();
    
    let accountCount = 0, sessionCount = 0, verificationTokenCount = 0;
    try {
      // Try to access NextAuth tables if they exist
      const accountModel = (prisma as any).account;
      const sessionModel = (prisma as any).session;
      const verificationTokenModel = (prisma as any).verificationToken;
      
      if (accountModel) accountCount = await accountModel.count();
      if (sessionModel) sessionCount = await sessionModel.count();
      if (verificationTokenModel) verificationTokenCount = await verificationTokenModel.count();
    } catch {
      // Tables might not exist in older schema
      accountCount = 0;
      sessionCount = 0;
      verificationTokenCount = 0;
    }

    return {
      provider,
      url: databaseUrl.replace(/:[^:]*@/, ':***@'), // Redact password
      connected: true,
      tables: tables.map((t: any) => t.table_name || t.name),
      records: {
        cv: cvCount,
        user: userCount,
        account: accountCount,
        session: sessionCount,
        verificationToken: verificationTokenCount
      }
    };

  } catch (error) {
    console.error('Database info error:', error);
    return {
      provider: 'sqlite',
      url: process.env.DATABASE_URL || '',
      connected: false,
      tables: [],
      records: {
        cv: 0,
        user: 0,
        account: 0,
        session: 0,
        verificationToken: 0
      }
    };
  }
}

/**
 * Backup current data before migration
 */
export async function backupDatabase(): Promise<MigrationResult> {
  try {
    console.log('Starting database backup...');

    // Get all CV data
    const cvData = await prisma.cV.findMany();
    
    // Get all user data
    const userData = await prisma.user.findMany();

    // Get NextAuth data if exists
    let authData = {};
    try {
      const accountModel = (prisma as any).account;
      const sessionModel = (prisma as any).session;
      const verificationTokenModel = (prisma as any).verificationToken;
      
      const accounts = accountModel ? await accountModel.findMany() : [];
      const sessions = sessionModel ? await sessionModel.findMany() : [];
      const verificationTokens = verificationTokenModel ? await verificationTokenModel.findMany() : [];
      
      authData = {
        accounts,
        sessions,
        verificationTokens
      };
    } catch {
      // NextAuth tables might not exist yet
      authData = {
        accounts: [],
        sessions: [],
        verificationTokens: []
      };
    }

    const backup = {
      timestamp: new Date().toISOString(),
      source: 'sqlite',
      target: 'postgresql',
      data: {
        cv: cvData,
        users: userData,
        auth: authData
      },
      counts: {
        cv: cvData.length,
        users: userData.length,
        accounts: (authData as any).accounts?.length || 0,
        sessions: (authData as any).sessions?.length || 0,
        verificationTokens: (authData as any).verificationTokens?.length || 0
      }
    };

    console.log('Database backup completed successfully');

    return {
      success: true,
      message: `Database backup completed: ${backup.counts.cv} CV records, ${backup.counts.users} users`,
      data: backup
    };

  } catch (error) {
    console.error('Database backup error:', error);
    return {
      success: false,
      message: 'Database backup failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Restore data to new database
 */
export async function restoreDatabase(backupData: any): Promise<MigrationResult> {
  try {
    console.log('Starting database restore...');

    // Restore users first
    if (backupData.data.users?.length > 0) {
      for (const user of backupData.data.users) {
        await prisma.user.upsert({
          where: { id: user.id },
          update: user,
          create: user
        });
      }
    }

    // Restore CV data
    if (backupData.data.cv?.length > 0) {
      for (const cv of backupData.data.cv) {
        await prisma.cV.upsert({
          where: { id: cv.id },
          update: {
            personalInfo: cv.personalInfo,
            workExperience: cv.workExperience,
            education: cv.education,
            skills: cv.skills,
            projects: cv.projects,
            courses: cv.courses,
            languages: cv.languages,
            updatedAt: cv.updatedAt
          },
          create: cv
        });
      }
    }

    // Restore NextAuth data if exists
    if (backupData.data.auth) {
      const { accounts, sessions, verificationTokens } = backupData.data.auth;

      const accountModel = (prisma as any).account;
      const sessionModel = (prisma as any).session;
      const verificationTokenModel = (prisma as any).verificationToken;

      if (accounts?.length > 0 && accountModel) {
        for (const account of accounts) {
          await accountModel.upsert({
            where: { 
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId
              }
            },
            update: account,
            create: account
          });
        }
      }

      if (sessions?.length > 0 && sessionModel) {
        for (const session of sessions) {
          await sessionModel.upsert({
            where: { sessionToken: session.sessionToken },
            update: session,
            create: session
          });
        }
      }

      if (verificationTokens?.length > 0 && verificationTokenModel) {
        for (const token of verificationTokens) {
          await verificationTokenModel.upsert({
            where: {
              identifier_token: {
                identifier: token.identifier,
                token: token.token
              }
            },
            update: token,
            create: token
          });
        }
      }
    }

    console.log('Database restore completed successfully');

    return {
      success: true,
      message: `Database restore completed: ${backupData.counts.cv} CV records, ${backupData.counts.users} users restored`,
      data: backupData.counts
    };

  } catch (error) {
    console.error('Database restore error:', error);
    return {
      success: false,
      message: 'Database restore failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Complete migration process from SQLite to PostgreSQL
 */
export async function migrateToPostgreSQL(): Promise<MigrationResult> {
  try {
    console.log('Starting migration from SQLite to PostgreSQL...');

    // Step 1: Check current database
    const currentDB = await getDatabaseInfo();
    
    if (currentDB.provider === 'postgresql') {
      return {
        success: true,
        message: 'Database is already using PostgreSQL',
        data: currentDB
      };
    }

    // Step 2: Backup current data
    const backup = await backupDatabase();
    
    if (!backup.success) {
      throw new Error(`Backup failed: ${backup.error}`);
    }

    console.log('Migration preparation completed');

    return {
      success: true,
      message: 'Migration preparation completed. Please update DATABASE_URL to PostgreSQL and run restore.',
      data: {
        backup: backup.data,
        nextSteps: [
          '1. Update DATABASE_URL to PostgreSQL connection string',
          '2. Run: npx prisma migrate deploy',
          '3. Call /api/migration/restore to restore data',
          '4. Test the application thoroughly'
        ]
      }
    };

  } catch (error) {
    console.error('Migration error:', error);
    return {
      success: false,
      message: 'Database migration failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Validate migration success
 */
export async function validateMigration(): Promise<MigrationResult> {
  try {
    const dbInfo = await getDatabaseInfo();
    
    if (!dbInfo.connected) {
      throw new Error('Database connection failed');
    }

    if (dbInfo.provider !== 'postgresql') {
      throw new Error('Database is not using PostgreSQL');
    }

    if (dbInfo.records.cv === 0) {
      throw new Error('No CV data found after migration');
    }

    // Check required tables exist
    const requiredTables = ['CV', 'User', 'Account', 'Session', 'VerificationToken'];
    const missingTables = requiredTables.filter(table => 
      !dbInfo.tables.some(t => t.toLowerCase() === table.toLowerCase())
    );

    if (missingTables.length > 0) {
      throw new Error(`Missing tables: ${missingTables.join(', ')}`);
    }

    return {
      success: true,
      message: 'Migration validation successful',
      data: {
        provider: dbInfo.provider,
        connected: dbInfo.connected,
        records: dbInfo.records,
        tables: dbInfo.tables.length
      }
    };

  } catch (error) {
    console.error('Migration validation error:', error);
    return {
      success: false,
      message: 'Migration validation failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
} 