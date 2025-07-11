// Automatic Portfolio Synchronization - As specified in PRD Phase 4
import { updateCVWithGitHubProjects, getGitHubStats } from './github';
import { updateCVWithSocialMedia, getSocialMediaStats } from './socialMedia';
import { prisma } from './db';

export interface PortfolioSyncResult {
  success: boolean;
  data?: {
    github: any;
    socialMedia: any;
    stats: any;
    updatedAt: string;
  };
  error?: string;
  message: string;
}

/**
 * Comprehensive portfolio synchronization
 * Combines GitHub projects and social media integration
 */
export async function syncCompletePortfolio(): Promise<PortfolioSyncResult> {
  try {
    console.log('Starting comprehensive portfolio synchronization...');

    // Sync GitHub projects
    const githubResult = await updateCVWithGitHubProjects();
    if (!githubResult.success) {
      throw new Error(`GitHub sync failed: ${githubResult.error}`);
    }

    // Update social media integration
    const socialMediaResult = updateCVWithSocialMedia();
    if (!socialMediaResult.success) {
      throw new Error('Social media integration failed');
    }

    // Get comprehensive statistics
    const githubStats = await getGitHubStats();
    const socialStats = getSocialMediaStats();

    // Update CV data in database
    const existingCV = await prisma.cV.findFirst({
      orderBy: { updatedAt: 'desc' }
    });

    if (!existingCV) {
      throw new Error('CV data not found in database');
    }

    // Merge GitHub projects with existing CV projects
    const existingProjects = existingCV.projects as any[] || [];
    const githubProjects = githubResult.projects || [];
    
    // Keep manual projects and add/update GitHub projects
    const manualProjects = existingProjects.filter(p => !p.id.startsWith('github-project-'));
    const updatedProjects = [...manualProjects, ...githubProjects];

    // Update social media links
    const updatedPersonalInfo = {
      ...(existingCV.personalInfo as any),
      links: socialMediaResult.data.links
    };

    // Update database
    await prisma.cV.update({
      where: { id: existingCV.id },
      data: {
        personalInfo: updatedPersonalInfo,
        projects: updatedProjects,
        updatedAt: new Date()
      }
    });

    const syncData = {
      github: {
        projects: githubProjects,
        stats: githubStats,
        count: githubProjects.length
      },
      socialMedia: socialMediaResult.data,
      stats: {
        github: githubStats,
        social: socialStats,
        totalProjects: updatedProjects.length,
        githubProjects: githubProjects.length,
        manualProjects: manualProjects.length
      },
      updatedAt: new Date().toISOString()
    };

    console.log('Portfolio synchronization completed successfully');

    return {
      success: true,
      data: syncData,
      message: `Portfolio synchronized successfully: ${githubProjects.length} GitHub projects, ${socialStats.length} social media platforms`
    };

  } catch (error) {
    console.error('Portfolio synchronization error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Portfolio synchronization failed'
    };
  }
}

/**
 * Sync only GitHub projects
 */
export async function syncGitHubOnly(): Promise<PortfolioSyncResult> {
  try {
    const githubResult = await updateCVWithGitHubProjects();
    
    if (!githubResult.success) {
      throw new Error(`GitHub sync failed: ${githubResult.error}`);
    }

    // Update database with GitHub projects only
    const existingCV = await prisma.cV.findFirst({
      orderBy: { updatedAt: 'desc' }
    });

    if (existingCV) {
      const existingProjects = existingCV.projects as any[] || [];
      const manualProjects = existingProjects.filter(p => !p.id.startsWith('github-project-'));
      const updatedProjects = [...manualProjects, ...githubResult.projects];

      await prisma.cV.update({
        where: { id: existingCV.id },
        data: {
          projects: updatedProjects,
          updatedAt: new Date()
        }
      });
    }

    return {
      success: true,
      data: {
        github: githubResult,
        socialMedia: null,
        stats: await getGitHubStats(),
        updatedAt: new Date().toISOString()
      },
      message: `GitHub projects synchronized: ${githubResult.count} projects`
    };

  } catch (error) {
    console.error('GitHub sync error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'GitHub synchronization failed'
    };
  }
}

/**
 * Sync only social media
 */
export async function syncSocialMediaOnly(): Promise<PortfolioSyncResult> {
  try {
    const socialMediaResult = updateCVWithSocialMedia();
    
    if (!socialMediaResult.success) {
      throw new Error('Social media integration failed');
    }

    // Update database with social media links
    const existingCV = await prisma.cV.findFirst({
      orderBy: { updatedAt: 'desc' }
    });

    if (existingCV) {
      const updatedPersonalInfo = {
        ...(existingCV.personalInfo as any),
        links: socialMediaResult.data.links
      };

      await prisma.cV.update({
        where: { id: existingCV.id },
        data: {
          personalInfo: updatedPersonalInfo,
          updatedAt: new Date()
        }
      });
    }

    return {
      success: true,
      data: {
        github: null,
        socialMedia: socialMediaResult.data,
        stats: getSocialMediaStats(),
        updatedAt: new Date().toISOString()
      },
      message: 'Social media synchronized successfully'
    };

  } catch (error) {
    console.error('Social media sync error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Social media synchronization failed'
    };
  }
}

/**
 * Get portfolio synchronization status
 */
export async function getPortfolioSyncStatus() {
  try {
    const existingCV = await prisma.cV.findFirst({
      orderBy: { updatedAt: 'desc' }
    });

    if (!existingCV) {
      return {
        success: false,
        error: 'CV data not found',
        lastSync: null,
        status: 'not_synced'
      };
    }

    const projects = existingCV.projects as any[] || [];
    const githubProjects = projects.filter(p => p.id.startsWith('github-project-'));
    const manualProjects = projects.filter(p => !p.id.startsWith('github-project-'));

    return {
      success: true,
      lastSync: existingCV.updatedAt.toISOString(),
      status: 'synced',
      stats: {
        totalProjects: projects.length,
        githubProjects: githubProjects.length,
        manualProjects: manualProjects.length
      }
    };

  } catch (error) {
    console.error('Portfolio sync status error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      lastSync: null,
      status: 'error'
    };
  }
}

/**
 * Schedule automatic portfolio sync (for future cron job integration)
 */
export function schedulePortfolioSync() {
  // This would be implemented with a cron job or scheduled task
  // For now, it returns configuration for manual or webhook-triggered sync
  return {
    enabled: true,
    schedule: 'daily', // daily, weekly, manual
    lastRun: null,
    nextRun: null,
    webhookUrl: '/api/sync/portfolio',
    manualUrl: '/api/github/sync'
  };
} 