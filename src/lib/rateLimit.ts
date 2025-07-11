import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limit store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  message?: string; // Custom error message
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

// Default rate limit configurations
export const defaultConfigs = {
  api: { windowMs: 15 * 60 * 1000, maxRequests: 100 }, // 100 requests per 15 minutes
  webhook: { windowMs: 60 * 1000, maxRequests: 10 }, // 10 requests per minute
  auth: { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 requests per 15 minutes
  strict: { windowMs: 60 * 1000, maxRequests: 1 }, // 1 request per minute
};

/**
 * Rate limiting middleware for API endpoints
 * As specified in PRD Phase 3
 */
export function rateLimit(config: RateLimitConfig) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    const ip = getClientIP(request);
    const key = `${ip}:${request.nextUrl.pathname}`;
    
    const now = Date.now();
    const windowStart = now - config.windowMs;
    
    // Clean up expired entries
    cleanupExpiredEntries(windowStart);
    
    // Get current rate limit info
    const current = rateLimitStore.get(key);
    
    if (!current || current.resetTime <= now) {
      // First request in window or window expired
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + config.windowMs
      });
      return null; // Allow request
    }
    
    if (current.count >= config.maxRequests) {
      // Rate limit exceeded
      const remainingTime = Math.ceil((current.resetTime - now) / 1000);
      
      return NextResponse.json(
        {
          error: config.message || 'Too many requests',
          retryAfter: remainingTime,
          limit: config.maxRequests,
          windowMs: config.windowMs
        },
        {
          status: 429,
          headers: {
            'Retry-After': remainingTime.toString(),
            'X-RateLimit-Limit': config.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(current.resetTime).toISOString(),
          }
        }
      );
    }
    
    // Increment counter
    current.count++;
    rateLimitStore.set(key, current);
    
    return null; // Allow request
  };
}

/**
 * Get client IP address from request
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const clientIP = request.headers.get('x-client-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  if (clientIP) {
    return clientIP;
  }
  
  return '127.0.0.1';
}

/**
 * Clean up expired rate limit entries
 */
function cleanupExpiredEntries(windowStart: number): void {
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime <= windowStart) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Get rate limit status for a key
 */
export function getRateLimitStatus(ip: string, endpoint: string, config: RateLimitConfig) {
  const key = `${ip}:${endpoint}`;
  const current = rateLimitStore.get(key);
  const now = Date.now();
  
  if (!current || current.resetTime <= now) {
    return {
      remaining: config.maxRequests - 1,
      reset: now + config.windowMs,
      limit: config.maxRequests
    };
  }
  
  return {
    remaining: Math.max(0, config.maxRequests - current.count),
    reset: current.resetTime,
    limit: config.maxRequests
  };
}

/**
 * CORS configuration
 */
export const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Signature-256, X-Timestamp',
  'Access-Control-Max-Age': '86400', // 24 hours
};

/**
 * Handle CORS preflight requests
 */
export function handleCORS(request: NextRequest): NextResponse | null {
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders
    });
  }
  
  return null;
}

/**
 * Add CORS headers to response
 */
export function addCORSHeaders(response: NextResponse): NextResponse {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}

/**
 * Combined middleware for rate limiting and CORS
 */
export function createAPIMiddleware(config: RateLimitConfig) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    // Handle CORS first
    const corsResponse = handleCORS(request);
    if (corsResponse) {
      return corsResponse;
    }
    
    // Apply rate limiting
    const rateLimitResponse = await rateLimit(config)(request);
    if (rateLimitResponse) {
      return addCORSHeaders(rateLimitResponse);
    }
    
    return null; // Continue to handler
  };
} 