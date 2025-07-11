// Production Configuration - As specified in PRD Phase 4
export interface ProductionConfig {
  nextauth: {
    secret: string;
    url: string;
  };
  database: {
    url: string;
    provider: 'postgresql' | 'sqlite';
  };
  webhook: {
    secret: string;
  };
  email: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  };
  admin: {
    emails: string[];
  };
  github: {
    token?: string;
  };
  security: {
    allowedOrigins: string[];
    googleVerification?: string;
  };
}

/**
 * Get production environment configuration
 * As specified in PRD Phase 4 - Production Setup
 */
export function getProductionConfig(): ProductionConfig {
  return {
    nextauth: {
      secret: process.env.NEXTAUTH_SECRET || '',
      url: process.env.NEXTAUTH_URL || 'https://www.piotr.danon.site'
    },
    database: {
      url: process.env.DATABASE_URL || '',
      provider: process.env.DATABASE_URL?.includes('postgresql') ? 'postgresql' : 'sqlite'
    },
    webhook: {
      secret: process.env.WEBHOOK_SECRET || ''
    },
    email: {
      host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
      user: process.env.EMAIL_SERVER_USER || '',
      password: process.env.EMAIL_SERVER_PASSWORD || '',
      from: process.env.EMAIL_FROM || ''
    },
    admin: {
      emails: process.env.ADMIN_EMAILS?.split(',') || ['piotr12451@gmail.com']
    },
    github: {
      token: process.env.GITHUB_TOKEN
    },
    security: {
      allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [
        'https://www.piotr.danon.site',
        'https://piotr.danon.site'
      ],
      googleVerification: process.env.GOOGLE_SITE_VERIFICATION
    }
  };
}

/**
 * Validate production configuration
 */
export function validateProductionConfig(): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const config = getProductionConfig();
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields validation
  if (!config.nextauth.secret) {
    errors.push('NEXTAUTH_SECRET is required');
  }

  if (!config.database.url) {
    errors.push('DATABASE_URL is required');
  }

  if (!config.webhook.secret) {
    errors.push('WEBHOOK_SECRET is required');
  }

  if (!config.email.user || !config.email.password) {
    warnings.push('Email configuration incomplete - authentication features may not work');
  }

  if (!config.github.token) {
    warnings.push('GITHUB_TOKEN not set - GitHub API rate limits will be lower');
  }

  // Security validation
  if (config.nextauth.secret && config.nextauth.secret.length < 32) {
    warnings.push('NEXTAUTH_SECRET should be at least 32 characters long');
  }

  if (config.webhook.secret && config.webhook.secret.length < 32) {
    warnings.push('WEBHOOK_SECRET should be at least 32 characters long');
  }

  // Production environment checks
  if (process.env.NODE_ENV === 'production') {
    if (config.nextauth.url.includes('localhost')) {
      errors.push('NEXTAUTH_URL should not point to localhost in production');
    }

    if (config.database.provider === 'sqlite') {
      warnings.push('SQLite is not recommended for production - consider PostgreSQL');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Get environment-specific configuration
 */
export function getEnvironmentConfig() {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return {
    environment: process.env.NODE_ENV || 'development',
    isProduction,
    isDevelopment,
    domain: isProduction ? 'www.piotr.danon.site' : 'localhost:3000',
    protocol: isProduction ? 'https' : 'http',
    baseUrl: isProduction 
      ? 'https://www.piotr.danon.site' 
      : `http://localhost:${process.env.PORT || 3000}`,
    database: {
      type: isProduction ? 'postgresql' : 'sqlite',
      url: isProduction 
        ? process.env.DATABASE_URL 
        : process.env.DATABASE_URL || 'file:./dev.db'
    }
  };
}

/**
 * Generate production environment variables template
 */
export function generateProductionEnvTemplate(): string {
  return `# Production Environment Variables - CV Website

# NextAuth Configuration
NEXTAUTH_SECRET=your-production-secret-key-here-min-32-chars
NEXTAUTH_URL=https://www.piotr.danon.site

# Database Configuration (PostgreSQL for production)
DATABASE_URL=postgresql://username:password@host:port/database_name

# Webhook Security
WEBHOOK_SECRET=your-production-webhook-secret-here-min-32-chars

# Email Configuration for NextAuth
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com

# Admin Configuration
ADMIN_EMAILS=piotr12451@gmail.com

# GitHub Integration (Optional - for increased API rate limits)
GITHUB_TOKEN=your-github-personal-access-token

# Security Configuration
GOOGLE_SITE_VERIFICATION=your-google-verification-code
ALLOWED_ORIGINS=https://www.piotr.danon.site,https://piotr.danon.site

# Vercel Configuration (if deploying to Vercel)
VERCEL=1
VERCEL_URL=your-vercel-url.vercel.app
`;
}

/**
 * Production readiness check
 */
export function checkProductionReadiness() {
  const config = getProductionConfig();
  const validation = validateProductionConfig();
  const env = getEnvironmentConfig();
  
  const checks = {
    environment: env.isProduction,
    secrets: config.nextauth.secret && config.webhook.secret,
    database: config.database.url && config.database.provider === 'postgresql',
    email: config.email.user && config.email.password,
    domain: !config.nextauth.url.includes('localhost'),
    ssl: config.nextauth.url.startsWith('https'),
    admin: config.admin.emails.length > 0
  };
  
  const readyCount = Object.values(checks).filter(Boolean).length;
  const totalChecks = Object.keys(checks).length;
  const readinessScore = (readyCount / totalChecks) * 100;
  
  return {
    ready: validation.valid && readinessScore >= 85,
    score: readinessScore,
    checks,
    validation,
    recommendations: [
      ...(validation.errors.length > 0 ? ['Fix configuration errors'] : []),
      ...(validation.warnings.length > 0 ? ['Address configuration warnings'] : []),
      ...(!checks.database ? ['Setup PostgreSQL database'] : []),
      ...(!checks.ssl ? ['Ensure HTTPS is configured'] : []),
      ...(!checks.email ? ['Configure email service'] : [])
    ]
  };
} 