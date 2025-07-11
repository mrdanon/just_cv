// Social Media Integration - As specified in PRD Phase 4
export interface SocialMediaConfig {
  youtube: string;
  instagram: string;
  artstation: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface SocialMediaStats {
  platform: string;
  username: string;
  url: string;
  followers?: number;
  videos?: number;
  posts?: number;
  lastUpdate?: string;
}

/**
 * Connect YouTube, Instagram, ArtStation
 * As specified in PRD Phase 4 - Social Media Integration
 */
export const socialIntegrations: SocialMediaConfig = {
  youtube: '@dr.blender',
  instagram: '@doctor.blender',
  artstation: 'drdanon',
  linkedin: 'piotr-dankowiakowski-034a352b4',
  github: 'mrdanon',
  portfolio: 'piotr.danon.site'
};

/**
 * Get social media URLs
 */
export function getSocialMediaUrls(): Record<string, string> {
  return {
    youtube: `https://www.youtube.com/${socialIntegrations.youtube}`,
    instagram: `https://www.instagram.com/${socialIntegrations.instagram}/`,
    artstation: `https://www.artstation.com/${socialIntegrations.artstation}`,
    linkedin: `https://www.linkedin.com/in/${socialIntegrations.linkedin}/`,
    github: `https://github.com/${socialIntegrations.github}`,
    portfolio: `https://${socialIntegrations.portfolio}`
  };
}

/**
 * Get social media display info
 */
export function getSocialMediaInfo() {
  const urls = getSocialMediaUrls();
  
  return [
    {
      platform: 'YouTube',
      username: socialIntegrations.youtube,
      url: urls.youtube,
      description: 'Educational 3D Animation and Blender Tutorials',
      icon: '🎥',
      color: '#FF0000',
      category: 'Educational Content'
    },
    {
      platform: 'Instagram',
      username: socialIntegrations.instagram,
      url: urls.instagram,
      description: '3D Art and Behind-the-Scenes Content',
      icon: '📸',
      color: '#E4405F',
      category: 'Visual Portfolio'
    },
    {
      platform: 'ArtStation',
      username: socialIntegrations.artstation,
      url: urls.artstation,
      description: 'Professional 3D Art Portfolio',
      icon: '🎨',
      color: '#13AFF0',
      category: 'Professional Portfolio'
    },
    {
      platform: 'LinkedIn',
      username: socialIntegrations.linkedin,
      url: urls.linkedin,
      description: 'Professional Network and Career Updates',
      icon: '💼',
      color: '#0077B5',
      category: 'Professional Network'
    },
    {
      platform: 'GitHub',
      username: socialIntegrations.github,
      url: urls.github,
      description: 'Open Source Projects and Code Portfolio',
      icon: '💻',
      color: '#333333',
      category: 'Code Portfolio'
    },
    {
      platform: 'Portfolio',
      username: socialIntegrations.portfolio,
      url: urls.portfolio,
      description: 'Complete Professional Portfolio Website',
      icon: '🌐',
      color: '#6366F1',
      category: 'Main Portfolio'
    }
  ];
}

/**
 * Mock social media statistics (in production, these would come from APIs)
 */
export function getSocialMediaStats(): SocialMediaStats[] {
  return [
    {
      platform: 'YouTube',
      username: socialIntegrations.youtube,
      url: getSocialMediaUrls().youtube,
      followers: 55000,
      videos: 150,
      lastUpdate: new Date().toISOString()
    },
    {
      platform: 'Instagram',
      username: socialIntegrations.instagram,
      url: getSocialMediaUrls().instagram,
      followers: 12000,
      posts: 420,
      lastUpdate: new Date().toISOString()
    },
    {
      platform: 'ArtStation',
      username: socialIntegrations.artstation,
      url: getSocialMediaUrls().artstation,
      followers: 8500,
      posts: 85,
      lastUpdate: new Date().toISOString()
    }
  ];
}

/**
 * Generate social media links for CV
 */
export function generateCVSocialLinks() {
  const urls = getSocialMediaUrls();
  
  return {
    portfolio: urls.portfolio,
    linkedin: urls.linkedin,
    github: urls.github,
    youtube: urls.youtube,
    instagram: urls.instagram,
    artstation: urls.artstation
  };
}

/**
 * Validate social media URLs
 */
export function validateSocialMediaUrls(): { platform: string; url: string; valid: boolean }[] {
  const urls = getSocialMediaUrls();
  const results = [];
  
  for (const [platform, url] of Object.entries(urls)) {
    try {
      new URL(url);
      results.push({ platform, url, valid: true });
    } catch {
      results.push({ platform, url, valid: false });
    }
  }
  
  return results;
}

/**
 * Get social media embed codes (for future integration)
 */
export function getSocialMediaEmbeds() {
  return {
    youtube: {
      channelId: 'UCYourChannelId', // Replace with actual channel ID
      embedUrl: `https://www.youtube.com/embed/videoseries?list=UUYourChannelId`,
      latestVideo: null // Would be fetched from YouTube API
    },
    instagram: {
      embedCode: `https://www.instagram.com/${socialIntegrations.instagram}/embed/`,
      latestPost: null // Would be fetched from Instagram Basic Display API
    },
    artstation: {
      profileUrl: getSocialMediaUrls().artstation,
      rssUrl: `https://www.artstation.com/${socialIntegrations.artstation}.rss`,
      latestArtwork: null // Would be fetched from ArtStation API or RSS
    }
  };
}

/**
 * Update CV data with social media integration
 */
export function updateCVWithSocialMedia() {
  const socialLinks = generateCVSocialLinks();
  const socialInfo = getSocialMediaInfo();
  const socialStats = getSocialMediaStats();
  
  return {
    success: true,
    data: {
      links: socialLinks,
      info: socialInfo,
      stats: socialStats,
      integrations: socialIntegrations
    },
    message: 'Social media integration updated successfully'
  };
} 