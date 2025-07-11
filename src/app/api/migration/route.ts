import { NextRequest, NextResponse } from 'next/server';
import { createAPIMiddleware, defaultConfigs, addCORSHeaders } from '@/lib/rateLimit';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { 
  getDatabaseInfo,
  backupDatabase,
  restoreDatabase,
  migrateToPostgreSQL,
  validateMigration
} from '@/lib/migration';

// Initialize middleware
const middleware = createAPIMiddleware(defaultConfigs.api);

/**
 * GET - Get database information and migration status (Admin only)
 * As specified in PRD Phase 4 - Database Migration
 */
export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting and CORS
    const middlewareResponse = await middleware(request);
    if (middlewareResponse) {
      return middlewareResponse;
    }

    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return addCORSHeaders(NextResponse.json(
        { success: false, error: 'Unauthorized: Admin access required' },
        { status: 401 }
      ));
    }

    const url = new URL(request.url);
    const action = url.searchParams.get('action');

    let data;
    let message;

    switch (action) {
      case 'info':
        data = await getDatabaseInfo();
        message = 'Database information retrieved successfully';
        break;

      case 'validate':
        data = await validateMigration();
        message = 'Migration validation completed';
        break;

      case 'status':
      default:
        const dbInfo = await getDatabaseInfo();
        data = {
          database: dbInfo,
          migration: {
            required: dbInfo.provider === 'sqlite',
            recommended: dbInfo.provider === 'sqlite' && process.env.NODE_ENV === 'production',
            status: dbInfo.provider === 'postgresql' ? 'completed' : 'pending'
          },
          environment: process.env.NODE_ENV,
          recommendations: dbInfo.provider === 'sqlite' ? [
            'SQLite is not recommended for production',
            'Consider migrating to PostgreSQL',
            'Use /api/migration POST to start migration'
          ] : [
            'Database is production-ready',
            'PostgreSQL is configured correctly'
          ]
        };
        message = 'Migration status retrieved successfully';
        break;
    }

    return addCORSHeaders(NextResponse.json({
      success: true,
      data,
      message
    }));

  } catch (error) {
    console.error('Migration status error:', error);
    return addCORSHeaders(NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch migration status' 
      },
      { status: 500 }
    ));
  }
}

/**
 * POST - Execute database migration operations (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting and CORS
    const middlewareResponse = await middleware(request);
    if (middlewareResponse) {
      return middlewareResponse;
    }

    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return addCORSHeaders(NextResponse.json(
        { success: false, error: 'Unauthorized: Admin access required' },
        { status: 401 }
      ));
    }

    const { action, backupData } = await request.json().catch(() => ({}));

    let result;

    switch (action) {
      case 'backup':
        result = await backupDatabase();
        break;

      case 'restore':
        if (!backupData) {
          return addCORSHeaders(NextResponse.json(
            { success: false, error: 'Backup data required for restore operation' },
            { status: 400 }
          ));
        }
        result = await restoreDatabase(backupData);
        break;

      case 'migrate':
        result = await migrateToPostgreSQL();
        break;

      case 'validate':
        result = await validateMigration();
        break;

      default:
        return addCORSHeaders(NextResponse.json(
          { success: false, error: 'Invalid action. Use: backup, restore, migrate, or validate' },
          { status: 400 }
        ));
    }

    if (!result.success) {
      return addCORSHeaders(NextResponse.json(
        { 
          success: false, 
          error: `Migration ${action} failed: ${result.error}` 
        },
        { status: 500 }
      ));
    }

    return addCORSHeaders(NextResponse.json({
      success: true,
      data: result.data,
      message: result.message,
      action
    }));

  } catch (error) {
    console.error('Migration operation error:', error);
    return addCORSHeaders(NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error during migration operation' 
      },
      { status: 500 }
    ));
  }
}

/**
 * Handle OPTIONS method for CORS preflight
 */
export async function OPTIONS(request: NextRequest) {
  const middlewareResponse = await middleware(request);
  return middlewareResponse || addCORSHeaders(new NextResponse(null, { status: 200 }));
} 