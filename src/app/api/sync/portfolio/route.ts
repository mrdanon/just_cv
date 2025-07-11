import { NextRequest, NextResponse } from 'next/server';
import { createAPIMiddleware, defaultConfigs, addCORSHeaders } from '@/lib/rateLimit';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { 
  syncCompletePortfolio, 
  syncGitHubOnly, 
  syncSocialMediaOnly,
  getPortfolioSyncStatus,
  schedulePortfolioSync
} from '@/lib/portfolioSync';

// Initialize middleware
const middleware = createAPIMiddleware(defaultConfigs.api);

/**
 * POST - Comprehensive portfolio synchronization (Admin only)
 * As specified in PRD Phase 4 - Portfolio Integration
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

    const { syncType = 'complete' } = await request.json().catch(() => ({}));

    let syncResult;

    switch (syncType) {
      case 'github':
        syncResult = await syncGitHubOnly();
        break;
      case 'social':
        syncResult = await syncSocialMediaOnly();
        break;
      case 'complete':
      default:
        syncResult = await syncCompletePortfolio();
        break;
    }

    if (!syncResult.success) {
      return addCORSHeaders(NextResponse.json(
        { 
          success: false, 
          error: `Portfolio sync failed: ${syncResult.error}` 
        },
        { status: 500 }
      ));
    }

    return addCORSHeaders(NextResponse.json({
      success: true,
      data: syncResult.data,
      message: syncResult.message,
      syncType
    }));

  } catch (error) {
    console.error('Portfolio sync error:', error);
    return addCORSHeaders(NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error during portfolio sync' 
      },
      { status: 500 }
    ));
  }
}

/**
 * GET - Get portfolio synchronization status and configuration
 */
export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting and CORS
    const middlewareResponse = await middleware(request);
    if (middlewareResponse) {
      return middlewareResponse;
    }

    const url = new URL(request.url);
    const action = url.searchParams.get('action');

    let data;
    let message;

    switch (action) {
      case 'status':
        data = await getPortfolioSyncStatus();
        message = 'Portfolio sync status retrieved successfully';
        break;
      case 'schedule':
        data = schedulePortfolioSync();
        message = 'Portfolio sync schedule retrieved successfully';
        break;
      case 'info':
      default:
        const status = await getPortfolioSyncStatus();
        const schedule = schedulePortfolioSync();
        data = {
          status,
          schedule,
          endpoints: {
            sync: '/api/sync/portfolio',
            github: '/api/github/sync',
            social: '/api/social'
          }
        };
        message = 'Portfolio sync information retrieved successfully';
        break;
    }

    return addCORSHeaders(NextResponse.json({
      success: true,
      data,
      message
    }));

  } catch (error) {
    console.error('Portfolio sync info error:', error);
    return addCORSHeaders(NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch portfolio sync information' 
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