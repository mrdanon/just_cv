import { NextRequest, NextResponse } from 'next/server';
import { createAPIMiddleware, defaultConfigs, addCORSHeaders } from '@/lib/rateLimit';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { 
  getProductionConfig,
  validateProductionConfig,
  getEnvironmentConfig,
  checkProductionReadiness,
  generateProductionEnvTemplate
} from '@/lib/production';

// Initialize middleware
const middleware = createAPIMiddleware(defaultConfigs.api);

/**
 * GET - Get production configuration status (Admin only)
 * As specified in PRD Phase 4 - Production Setup
 */
export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting and CORS
    const middlewareResponse = await middleware(request);
    if (middlewareResponse) {
      return middlewareResponse;
    }

    // Check authentication for sensitive configuration data
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
      case 'config':
        data = getProductionConfig();
        // Redact sensitive information
        data.nextauth.secret = data.nextauth.secret ? '***REDACTED***' : '';
        data.webhook.secret = data.webhook.secret ? '***REDACTED***' : '';
        data.email.password = data.email.password ? '***REDACTED***' : '';
        data.github.token = data.github.token ? '***REDACTED***' : '';
        message = 'Production configuration retrieved (sensitive data redacted)';
        break;

      case 'validate':
        data = validateProductionConfig();
        message = 'Production configuration validation completed';
        break;

      case 'environment':
        data = getEnvironmentConfig();
        message = 'Environment configuration retrieved';
        break;

      case 'readiness':
        data = checkProductionReadiness();
        message = 'Production readiness check completed';
        break;

      case 'template':
        data = { template: generateProductionEnvTemplate() };
        message = 'Production environment template generated';
        break;

      case 'status':
      default:
        const validation = validateProductionConfig();
        const readiness = checkProductionReadiness();
        const environment = getEnvironmentConfig();
        
        data = {
          environment,
          validation,
          readiness,
          summary: {
            ready: readiness.ready,
            score: readiness.score,
            environment: environment.environment,
            errors: validation.errors.length,
            warnings: validation.warnings.length
          }
        };
        message = 'Production status overview retrieved';
        break;
    }

    return addCORSHeaders(NextResponse.json({
      success: true,
      data,
      message
    }));

  } catch (error) {
    console.error('Production config error:', error);
    return addCORSHeaders(NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch production configuration' 
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