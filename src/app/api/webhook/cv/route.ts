import { NextRequest, NextResponse } from 'next/server';
import { authenticateWebhook } from '@/lib/webhook';
import { prisma } from '@/lib/db';
import { createAPIMiddleware, defaultConfigs, addCORSHeaders } from '@/lib/rateLimit';
import { validateSectionData, CVUpdateSchema } from '@/lib/validations';

// Initialize middleware
const middleware = createAPIMiddleware(defaultConfigs.webhook);

/**
 * Secure webhook endpoint for CV updates
 * As specified in PRD Phase 3 - Webhook Security
 */
export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting and CORS
    const middlewareResponse = await middleware(request);
    if (middlewareResponse) {
      return middlewareResponse;
    }

    const webhookSecret = process.env.WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error('WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Authenticate webhook
    const authResult = await authenticateWebhook(request, webhookSecret);
    
    if (!authResult.success) {
      console.error('Webhook authentication failed:', authResult.error);
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    
    // Validate request structure
    const validatedRequest = CVUpdateSchema.parse(body);
    const { section, data } = validatedRequest;

    // Validate section-specific data
    try {
      validateSectionData(section, data);
    } catch (validationError) {
      const errorMessage = validationError instanceof Error ? validationError.message : 'Validation failed';
      return addCORSHeaders(NextResponse.json(
        { error: `Data validation failed: ${errorMessage}` },
        { status: 400 }
      ));
    }

    // Get existing CV data
    const existingCV = await prisma.cV.findFirst({
      orderBy: { createdAt: 'desc' }
    });

    if (!existingCV) {
      return NextResponse.json(
        { error: 'CV not found' },
        { status: 404 }
      );
    }

    // Update the specific section
    const updateData = {
      [section]: data,
      updatedAt: new Date()
    };

    // Save updated CV
    const updatedCV = await prisma.cV.update({
      where: { id: existingCV.id },
      data: updateData
    });

    return addCORSHeaders(NextResponse.json({
      success: true,
      message: `CV section '${section}' updated successfully`,
      updatedAt: updatedCV.updatedAt
    }));

  } catch (error) {
    console.error('Webhook CV update error:', error);
    return addCORSHeaders(NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    ));
  }
}

/**
 * GET method for webhook verification
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting and CORS
  const middlewareResponse = await middleware(request);
  if (middlewareResponse) {
    return middlewareResponse;
  }

  const url = new URL(request.url);
  const challenge = url.searchParams.get('challenge');
  
  if (challenge) {
    // Webhook verification for platforms that require it
    return addCORSHeaders(NextResponse.json({ challenge }));
  }

  return addCORSHeaders(NextResponse.json({
    message: 'CV Webhook endpoint is active',
    timestamp: new Date().toISOString()
  }));
}

/**
 * Handle OPTIONS method for CORS preflight
 */
export async function OPTIONS(request: NextRequest) {
  const middlewareResponse = await middleware(request);
  return middlewareResponse || addCORSHeaders(new NextResponse(null, { status: 200 }));
} 