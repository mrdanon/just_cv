import { NextRequest, NextResponse } from 'next/server';
import { createAPIMiddleware, defaultConfigs, addCORSHeaders } from '@/lib/rateLimit';
import { 
  getSocialMediaInfo, 
  getSocialMediaStats, 
  validateSocialMediaUrls,
  updateCVWithSocialMedia,
  getSocialMediaEmbeds 
} from '@/lib/socialMedia';

// Initialize middleware
const middleware = createAPIMiddleware(defaultConfigs.api);

/**
 * GET - Get social media information and statistics
 * As specified in PRD Phase 4 - Social Media Integration
 */
export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting and CORS
    const middlewareResponse = await middleware(request);
    if (middlewareResponse) {
      return middlewareResponse;
    }

    const url = new URL(request.url);
    const type = url.searchParams.get('type');

    let data;
    let message;

    switch (type) {
      case 'info':
        data = getSocialMediaInfo();
        message = 'Social media information retrieved successfully';
        break;
      case 'stats':
        data = getSocialMediaStats();
        message = 'Social media statistics retrieved successfully';
        break;
      case 'validate':
        data = validateSocialMediaUrls();
        message = 'Social media URLs validated successfully';
        break;
      case 'embeds':
        data = getSocialMediaEmbeds();
        message = 'Social media embeds retrieved successfully';
        break;
      case 'all':
      default:
        data = updateCVWithSocialMedia().data;
        message = 'Complete social media data retrieved successfully';
        break;
    }

    return addCORSHeaders(NextResponse.json({
      success: true,
      data,
      message
    }));

  } catch (error) {
    console.error('Social media API error:', error);
    return addCORSHeaders(NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch social media data' 
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