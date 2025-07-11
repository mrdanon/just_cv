import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getDeploymentEnvironment } from '@/lib/deployment';

/**
 * Health check endpoint for deployment validation
 * As specified in PRD Phase 4 - Deploy to Vercel
 */
export async function GET() {
  try {
    const startTime = Date.now();

    // Check database connection
    let dbStatus = 'unknown';
    let dbError = null;
    try {
      await prisma.$connect();
      await prisma.cV.count(); // Test database connection
      dbStatus = 'connected';
    } catch (error) {
      dbStatus = 'error';
      dbError = error instanceof Error ? error.message : 'Unknown database error';
    }

    // Get environment information
    const environment = getDeploymentEnvironment();

    // Performance timing
    const responseTime = Date.now() - startTime;

    // Health status
    const isHealthy = dbStatus === 'connected';

    const healthData = {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      responseTime,
      version: '1.0.0',
      environment: {
        node_env: process.env.NODE_ENV,
        vercel_env: environment.vercel.env,
        vercel_region: environment.vercel.region
      },
      database: {
        status: dbStatus,
        provider: process.env.DATABASE_URL?.includes('postgresql') ? 'postgresql' : 'sqlite',
        error: dbError
      },
      services: {
        nextauth: Boolean(process.env.NEXTAUTH_SECRET),
        webhook: Boolean(process.env.WEBHOOK_SECRET),
        email: Boolean(process.env.EMAIL_SERVER_USER),
        github: Boolean(process.env.GITHUB_TOKEN)
      },
      deployment: {
        commit: environment.vercel.gitCommitSha?.substring(0, 7),
        branch: environment.vercel.gitBranch,
        buildTime: environment.nextjs.buildTime,
        url: environment.vercel.url
      }
    };

    return NextResponse.json(healthData, {
      status: isHealthy ? 200 : 503,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Health-Check': 'cv-website',
        'X-Response-Time': `${responseTime}ms`
      }
    });

  } catch (error) {
    console.error('Health check error:', error);
    
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: {
        node_env: process.env.NODE_ENV,
        vercel_env: process.env.VERCEL_ENV
      }
    }, {
      status: 503,
      headers: {
        'Content-Type': 'application/json',
        'X-Health-Check': 'cv-website',
        'X-Health-Status': 'error'
      }
    });
  }
} 