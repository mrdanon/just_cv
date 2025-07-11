// GitHub API Integration - As specified in PRD Phase 4
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  clone_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
  homepage: string | null;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

/**
 * Sync projects from GitHub
 * As specified in PRD Phase 4 - Portfolio Integration
 */
export async function syncGitHubProjects(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch('https://api.github.com/users/mrdanon/repos', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'CV-Website-Portfolio-Sync',
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`
        })
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const repos: GitHubRepo[] = await response.json();
    
    // Filter and sort repositories
    const filteredRepos = repos
      .filter(repo => !repo.name.includes('just_cv')) // Exclude this CV project
      .filter(repo => repo.description) // Only repos with descriptions
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 10); // Limit to 10 most recent

    return filteredRepos;
  } catch (error) {
    console.error('Error syncing GitHub projects:', error);
    throw error;
  }
}

/**
 * Get GitHub user information
 */
export async function getGitHubUser(): Promise<GitHubUser> {
  try {
    const response = await fetch('https://api.github.com/users/mrdanon', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'CV-Website-Portfolio-Sync',
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`
        })
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    throw error;
  }
}

/**
 * Convert GitHub repo to CV project format
 */
export function convertRepoToProject(repo: GitHubRepo) {
  return {
    id: `github-project-${repo.id}`,
    name: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: repo.description || 'GitHub repository project',
    technologies: [
      repo.language || 'Mixed',
      'GitHub',
      'Open Source',
      ...(repo.topics || [])
    ].filter(Boolean),
    github: repo.html_url,
    url: repo.homepage || undefined,
    startDate: new Date(repo.created_at).getFullYear().toString(),
    endDate: 'Present',
    achievements: [
      `Developed ${repo.name} project by implementing ${repo.language || 'various technologies'} resulting in ${repo.stargazers_count} stars and ${repo.forks_count} forks on GitHub`,
      `Published open-source project by maintaining active development resulting in active community engagement and regular contributions`,
      `Enhanced coding skills by implementing modern development practices resulting in improved code quality and project visibility`
    ]
  };
}

/**
 * Sync GitHub projects and update CV data
 */
export async function updateCVWithGitHubProjects() {
  try {
    const repos = await syncGitHubProjects();
    const githubProjects = repos.map((repo) => convertRepoToProject(repo));
    
    return {
      success: true,
      projects: githubProjects,
      count: githubProjects.length,
      message: `Successfully synced ${githubProjects.length} GitHub projects`
    };
  } catch (error) {
    console.error('Error updating CV with GitHub projects:', error);
    return {
      success: false,
      projects: [],
      count: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Get GitHub repository statistics
 */
export async function getGitHubStats(): Promise<{
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  languages: string[];
}> {
  try {
    const repos = await syncGitHubProjects();
    const user = await getGitHubUser();
    
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    const languages = [...new Set(repos.map(repo => repo.language).filter(Boolean))] as string[];
    
    return {
      totalRepos: user.public_repos,
      totalStars,
      totalForks,
      languages
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return {
      totalRepos: 0,
      totalStars: 0,
      totalForks: 0,
      languages: []
    };
  }
} 