import { NextRequest, NextResponse } from 'next/server';
import { createAPIMiddleware, defaultConfigs, addCORSHeaders } from '@/lib/rateLimit';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { updateCVWithGitHubProjects, getGitHubStats } from '@/lib/github';

// Initialize middleware
const middleware = createAPIMiddleware(defaultConfigs.api);

/**
 * POST - Sync GitHub projects (Admin only)
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

    // Sync GitHub projects
    const syncResult = await updateCVWithGitHubProjects();

    if (!syncResult.success) {
      return addCORSHeaders(NextResponse.json(
        { 
          success: false, 
          error: `GitHub sync failed: ${syncResult.error}` 
        },
        { status: 500 }
      ));
    }

    return addCORSHeaders(NextResponse.json({
      success: true,
      data: {
        projects: syncResult.projects,
        count: syncResult.count
      },
      message: syncResult.message
    }));

  } catch (error) {
    console.error('GitHub sync error:', error);
    return addCORSHeaders(NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error during GitHub sync' 
      },
      { status: 500 }
    ));
  }
}

/**
 * GET - Get GitHub statistics
 */
export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting and CORS
    const middlewareResponse = await middleware(request);
    if (middlewareResponse) {
      return middlewareResponse;
    }

    // Get GitHub statistics
    const stats = await getGitHubStats();

    return addCORSHeaders(NextResponse.json({
      success: true,
      data: stats,
      message: 'GitHub statistics retrieved successfully'
    }));

  } catch (error) {
    console.error('GitHub stats error:', error);
    return addCORSHeaders(NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch GitHub statistics' 
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