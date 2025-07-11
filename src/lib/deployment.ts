// Deployment Utilities - As specified in PRD Phase 4
export interface DeploymentConfig {
  vercel: {
    projectId?: string;
    orgId?: string;
    alias: string[];
    domain: string;
  };
  environment: {
    production: boolean;
    staging: boolean;
    preview: boolean;
  };
  github: {
    repo: string;
    branch: string;
    autoDeployment: boolean;
  };
}

export interface DeploymentStatus {
  ready: boolean;
  score: number;
  checks: {
    build: boolean;
    environment: boolean;
    database: boolean;
    domain: boolean;
    ssl: boolean;
    performance: boolean;
  };
  issues: string[];
  recommendations: string[];
}

/**
 * Get deployment configuration
 * As specified in PRD Phase 4 - Deploy to Vercel
 */
export function getDeploymentConfig(): DeploymentConfig {
  return {
    vercel: {
      projectId: process.env.VERCEL_PROJECT_ID,
      orgId: process.env.VERCEL_ORG_ID,
      alias: ['www.piotr.danon.site', 'piotr.danon.site'],
      domain: 'www.piotr.danon.site'
    },
    environment: {
      production: process.env.NODE_ENV === 'production',
      staging: process.env.VERCEL_ENV === 'preview',
      preview: Boolean(process.env.VERCEL_URL)
    },
    github: {
      repo: 'mrdanon/just_cv',
      branch: 'master',
      autoDeployment: true
    }
  };
}

/**
 * Check deployment readiness
 */
export async function checkDeploymentReadiness(): Promise<DeploymentStatus> {
  const checks = {
    build: false,
    environment: false,
    database: false,
    domain: false,
    ssl: false,
    performance: false
  };

  const issues: string[] = [];
  const recommendations: string[] = [];

  try {
    // Check build configuration
    checks.build = Boolean(
      process.env.NEXTAUTH_SECRET &&
      process.env.WEBHOOK_SECRET
    );
    if (!checks.build) {
      issues.push('Missing required environment variables');
      recommendations.push('Set NEXTAUTH_SECRET and WEBHOOK_SECRET');
    }

    // Check environment configuration
    checks.environment = Boolean(
      process.env.NEXTAUTH_URL &&
      !process.env.NEXTAUTH_URL.includes('localhost')
    );
    if (!checks.environment) {
      issues.push('NEXTAUTH_URL not configured for production');
      recommendations.push('Set NEXTAUTH_URL to https://www.piotr.danon.site');
    }

    // Check database configuration
    checks.database = Boolean(
      process.env.DATABASE_URL &&
      process.env.DATABASE_URL.includes('postgresql')
    );
    if (!checks.database) {
      issues.push('Database not configured for production');
      recommendations.push('Configure PostgreSQL database');
    }

    // Check domain configuration
    checks.domain = Boolean(
      process.env.NEXTAUTH_URL?.includes('piotr.danon.site')
    );
    if (!checks.domain) {
      issues.push('Custom domain not configured');
      recommendations.push('Configure custom domain: www.piotr.danon.site');
    }

    // Check SSL configuration
    checks.ssl = Boolean(
      process.env.NEXTAUTH_URL?.startsWith('https')
    );
    if (!checks.ssl) {
      issues.push('SSL not configured');
      recommendations.push('Ensure HTTPS is enabled');
    }

    // Performance check (basic)
    checks.performance = Boolean(
      process.env.NODE_ENV === 'production'
    );
    if (!checks.performance) {
      recommendations.push('Set NODE_ENV=production for optimal performance');
    }

  } catch (error) {
    console.error('Deployment readiness check error:', error);
    issues.push('Error checking deployment readiness');
  }

  const readyCount = Object.values(checks).filter(Boolean).length;
  const totalChecks = Object.keys(checks).length;
  const score = (readyCount / totalChecks) * 100;

  return {
    ready: score >= 85 && issues.length === 0,
    score,
    checks,
    issues,
    recommendations
  };
}

/**
 * Generate Vercel deployment commands
 */
export function generateDeploymentCommands(): {
  install: string[];
  login: string[];
  deploy: string[];
  domain: string[];
  environment: string[];
} {
  return {
    install: [
      'npm install -g vercel',
      'npm install -g @vercel/cli'
    ],
    login: [
      'vercel login',
      'vercel whoami'
    ],
    deploy: [
      'vercel --prod',
      'vercel alias',
      'vercel ls'
    ],
    domain: [
      'vercel domains add www.piotr.danon.site',
      'vercel domains add piotr.danon.site',
      'vercel alias production-url www.piotr.danon.site'
    ],
    environment: [
      'vercel env add NEXTAUTH_SECRET production',
      'vercel env add DATABASE_URL production',
      'vercel env add WEBHOOK_SECRET production',
      'vercel env add EMAIL_SERVER_USER production',
      'vercel env add EMAIL_SERVER_PASSWORD production'
    ]
  };
}

/**
 * Validate production deployment
 */
export async function validateDeployment(url: string): Promise<{
  success: boolean;
  status: number;
  response?: any;
  error?: string;
}> {
  try {
    const response = await fetch(`${url}/api/health`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Deployment-Validator/1.0'
      }
    });

    const data = await response.json().catch(() => null);

    return {
      success: response.ok,
      status: response.status,
      response: data
    };

  } catch (error) {
    console.error('Deployment validation error:', error);
    return {
      success: false,
      status: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Get deployment environment information
 */
export function getDeploymentEnvironment() {
  return {
    vercel: {
      env: process.env.VERCEL_ENV, // 'production', 'preview', or 'development'
      url: process.env.VERCEL_URL,
      region: process.env.VERCEL_REGION,
      gitCommitSha: process.env.VERCEL_GIT_COMMIT_SHA,
      gitCommitMessage: process.env.VERCEL_GIT_COMMIT_MESSAGE,
      gitBranch: process.env.VERCEL_GIT_COMMIT_REF
    },
    runtime: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch
    },
    nextjs: {
      version: process.env.npm_package_dependencies_next,
      buildTime: new Date().toISOString()
    }
  };
}

/**
 * Generate deployment checklist
 */
export function generateDeploymentChecklist(): {
  preDeployment: string[];
  deployment: string[];
  postDeployment: string[];
  verification: string[];
} {
  return {
    preDeployment: [
      '✅ Test application locally (npm run build && npm start)',
      '✅ Verify all environment variables are set',
      '✅ Ensure PostgreSQL database is configured',
      '✅ Run tests and linting (npm run test && npm run lint)',
      '✅ Backup current data if needed',
      '✅ Review and commit all changes to git'
    ],
    deployment: [
      '📦 Install Vercel CLI (npm install -g vercel)',
      '🔐 Login to Vercel (vercel login)',
      '🚀 Deploy to production (vercel --prod)',
      '🔗 Configure custom domain aliases',
      '⚙️ Set production environment variables',
      '📋 Verify deployment status'
    ],
    postDeployment: [
      '🌐 Verify custom domain is working',
      '🔒 Test SSL certificate is valid',
      '📊 Check application performance',
      '🔐 Test authentication flow',
      '📄 Verify PDF generation works',
      '🎯 Test all API endpoints'
    ],
    verification: [
      '✅ Navigate to https://www.piotr.danon.site',
      '✅ Test CV display and PDF download',
      '✅ Verify admin authentication works',
      '✅ Check GitHub integration',
      '✅ Test social media links',
      '✅ Monitor application logs for errors'
    ]
  };
} 