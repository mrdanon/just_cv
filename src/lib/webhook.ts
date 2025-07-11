import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Verify webhook signature for secure API endpoints
 * As specified in PRD Phase 3
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  try {
    const expectedSignature = createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    
    // Format signature to match GitHub/standard webhook format
    const formattedExpected = `sha256=${expectedSignature}`;
    
    // Use timing-safe comparison to prevent timing attacks
    return timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(formattedExpected)
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return false;
  }
}

/**
 * Generate webhook signature for outgoing requests
 */
export function generateWebhookSignature(payload: string, secret: string): string {
  const signature = createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return `sha256=${signature}`;
}

/**
 * Validate webhook timestamp to prevent replay attacks
 */
export function validateWebhookTimestamp(
  timestamp: string,
  toleranceSeconds: number = 300 // 5 minutes
): boolean {
  try {
    const webhookTime = parseInt(timestamp, 10);
    const currentTime = Math.floor(Date.now() / 1000);
    
    return Math.abs(currentTime - webhookTime) <= toleranceSeconds;
  } catch (error) {
    console.error('Webhook timestamp validation failed:', error);
    return false;
  }
}

/**
 * Extract and validate webhook headers
 */
export function validateWebhookHeaders(headers: Headers): {
  signature: string | null;
  timestamp: string | null;
  isValid: boolean;
} {
  const signature = headers.get('x-signature-256') || headers.get('x-hub-signature-256');
  const timestamp = headers.get('x-timestamp');
  
  return {
    signature,
    timestamp,
    isValid: !!(signature && timestamp),
  };
}

/**
 * Middleware function for webhook authentication
 */
export async function authenticateWebhook(
  request: Request,
  secret: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const headers = request.headers;
    const payload = await request.text();
    
    // Validate headers
    const { signature, timestamp, isValid } = validateWebhookHeaders(headers);
    
    if (!isValid) {
      return { success: false, error: 'Missing required webhook headers' };
    }
    
    // Validate timestamp
    if (!validateWebhookTimestamp(timestamp!)) {
      return { success: false, error: 'Webhook timestamp is invalid or expired' };
    }
    
    // Verify signature
    if (!verifyWebhookSignature(payload, signature!, secret)) {
      return { success: false, error: 'Webhook signature verification failed' };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Webhook authentication error:', error);
    return { success: false, error: 'Internal authentication error' };
  }
} 