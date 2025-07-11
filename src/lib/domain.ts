// Custom Domain Configuration - As specified in PRD Phase 4
export interface DomainConfig {
  primary: string;
  aliases: string[];
  ssl: {
    enabled: boolean;
    provider: string;
    autoRenew: boolean;
  };
  dns: {
    provider: string;
    records: DNSRecord[];
  };
  redirects: DomainRedirect[];
}

export interface DNSRecord {
  type: 'A' | 'AAAA' | 'CNAME' | 'TXT' | 'MX';
  name: string;
  value: string;
  ttl: number;
}

export interface DomainRedirect {
  source: string;
  destination: string;
  permanent: boolean;
}

export interface DomainStatus {
  domain: string;
  active: boolean;
  ssl: boolean;
  dns: boolean;
  verification: boolean;
  issues: string[];
}

/**
 * Get custom domain configuration
 * As specified in PRD Phase 4 - Setup Custom Domain
 */
export function getDomainConfig(): DomainConfig {
  return {
    primary: 'www.piotr.danon.site',
    aliases: [
      'piotr.danon.site',
      'cv.piotr.danon.site',
      'resume.piotr.danon.site'
    ],
    ssl: {
      enabled: true,
      provider: 'Vercel',
      autoRenew: true
    },
    dns: {
      provider: 'Cloudflare', // or domain registrar
      records: [
        {
          type: 'CNAME',
          name: 'www',
          value: 'cname.vercel-dns.com',
          ttl: 300
        },
        {
          type: 'A',
          name: '@',
          value: '76.76.19.61', // Vercel's IP
          ttl: 300
        },
        {
          type: 'TXT',
          name: '@',
          value: 'v=spf1 include:vercel.com ~all',
          ttl: 300
        }
      ]
    },
    redirects: [
      {
        source: 'piotr.danon.site',
        destination: 'www.piotr.danon.site',
        permanent: true
      },
      {
        source: 'cv.piotr.danon.site',
        destination: 'www.piotr.danon.site',
        permanent: false
      },
      {
        source: 'resume.piotr.danon.site',
        destination: 'www.piotr.danon.site',
        permanent: false
      }
    ]
  };
}

/**
 * Check domain status and configuration
 */
export async function checkDomainStatus(domain: string): Promise<DomainStatus> {
  const issues: string[] = [];
  let active = false;
  let ssl = false;
  let dns = false;
  let verification = false;

  try {
    // Check if domain is accessible
    const response = await fetch(`https://${domain}/api/health`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Domain-Checker/1.0'
      }
    }).catch(() => null);

    if (response?.ok) {
      active = true;
      ssl = true; // If HTTPS works, SSL is configured
      dns = true; // If domain resolves, DNS is configured
      verification = true;
    } else {
      issues.push('Domain not accessible or health check failed');
    }

  } catch (error) {
    console.error(`Domain check error for ${domain}:`, error);
    issues.push(`Domain check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  return {
    domain,
    active,
    ssl,
    dns,
    verification,
    issues
  };
}

/**
 * Validate all configured domains
 */
export async function validateAllDomains(): Promise<{
  primary: DomainStatus;
  aliases: DomainStatus[];
  overall: {
    healthy: boolean;
    issues: string[];
    recommendations: string[];
  };
}> {
  const config = getDomainConfig();
  
  // Check primary domain
  const primary = await checkDomainStatus(config.primary);
  
  // Check all aliases
  const aliases = await Promise.all(
    config.aliases.map(alias => checkDomainStatus(alias))
  );

  // Overall health assessment
  const allDomains = [primary, ...aliases];
  const healthyDomains = allDomains.filter(d => d.active).length;
  const totalDomains = allDomains.length;
  const healthy = healthyDomains === totalDomains;

  const issues: string[] = [];
  const recommendations: string[] = [];

  if (!primary.active) {
    issues.push(`Primary domain ${primary.domain} is not accessible`);
    recommendations.push('Configure primary domain DNS and SSL');
  }

  const failedAliases = aliases.filter(a => !a.active);
  if (failedAliases.length > 0) {
    issues.push(`${failedAliases.length} alias domains are not working`);
    recommendations.push('Configure alias domain redirects and SSL');
  }

  if (healthy) {
    recommendations.push('All domains are configured correctly');
  }

  return {
    primary,
    aliases,
    overall: {
      healthy,
      issues,
      recommendations
    }
  };
}

/**
 * Generate domain setup commands
 */
export function generateDomainCommands(): {
  vercel: string[];
  dns: string[];
  ssl: string[];
  verification: string[];
} {
  const config = getDomainConfig();
  
  return {
    vercel: [
      `vercel domains add ${config.primary}`,
      ...config.aliases.map(alias => `vercel domains add ${alias}`),
      `vercel alias production-url ${config.primary}`,
      'vercel domains ls'
    ],
    dns: [
      'Add CNAME record: www -> cname.vercel-dns.com',
      'Add A record: @ -> 76.76.19.61',
      'Add TXT record for domain verification',
      'Set TTL to 300 seconds for faster propagation'
    ],
    ssl: [
      'SSL certificates are automatically provisioned by Vercel',
      'Verify HTTPS is working after DNS propagation',
      'Check certificate validity and auto-renewal',
      'Test SSL Labs rating (aim for A+ grade)'
    ],
    verification: [
      `curl -I https://${config.primary}/api/health`,
      `nslookup ${config.primary}`,
      `dig ${config.primary}`,
      'Check domain in browser with dev tools'
    ]
  };
}

/**
 * Get domain configuration for SEO and metadata
 */
export function getDomainSEOConfig() {
  const config = getDomainConfig();
  
  return {
    canonical: `https://${config.primary}`,
    sitemap: `https://${config.primary}/sitemap.xml`,
    robots: `https://${config.primary}/robots.txt`,
    manifest: `https://${config.primary}/manifest.json`,
    openGraph: {
      url: `https://${config.primary}`,
      siteName: 'Piotr Dankowiakowski - Professional CV',
      images: [
        {
          url: `https://${config.primary}/MyPhoto.jpg`,
          width: 400,
          height: 400,
          alt: 'Piotr Dankowiakowski - Professional Photo'
        }
      ]
    },
    twitter: {
      site: '@doctor.blender',
      creator: '@doctor.blender',
      cardType: 'summary_large_image'
    },
    alternateUrls: config.aliases.map(alias => `https://${alias}`)
  };
}

/**
 * Monitor domain health
 */
export async function monitorDomainHealth(): Promise<{
  timestamp: string;
  results: DomainStatus[];
  alerts: string[];
  summary: {
    total: number;
    healthy: number;
    unhealthy: number;
    uptime: number;
  };
}> {
  const config = getDomainConfig();
  const allDomains = [config.primary, ...config.aliases];
  
  const results = await Promise.all(
    allDomains.map(domain => checkDomainStatus(domain))
  );

  const healthy = results.filter(r => r.active).length;
  const unhealthy = results.length - healthy;
  const uptime = (healthy / results.length) * 100;

  const alerts: string[] = [];
  
  if (unhealthy > 0) {
    alerts.push(`${unhealthy} domains are currently unavailable`);
  }
  
  if (uptime < 100) {
    alerts.push(`Domain uptime is ${uptime.toFixed(1)}%`);
  }

  return {
    timestamp: new Date().toISOString(),
    results,
    alerts,
    summary: {
      total: results.length,
      healthy,
      unhealthy,
      uptime
    }
  };
} 