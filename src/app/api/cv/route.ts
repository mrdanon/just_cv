import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { CVData } from '@/types/cv';
import { createAPIMiddleware, defaultConfigs, addCORSHeaders } from '@/lib/rateLimit';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Initialize middleware
const middleware = createAPIMiddleware(defaultConfigs.api);

// GET - Retrieve CV data
export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting and CORS
    const middlewareResponse = await middleware(request);
    if (middlewareResponse) {
      return middlewareResponse;
    }

    // Get the latest CV record
    const cvRecord = await prisma.cV.findFirst({
      orderBy: {
        updatedAt: 'desc'
      }
    });

    if (!cvRecord) {
      return addCORSHeaders(NextResponse.json(
        { success: false, error: 'CV data not found' },
        { status: 404 }
      ));
    }

    // Parse JSON fields back to objects
    const cvData: CVData = {
      personalInfo: cvRecord.personalInfo as any,
      workExperience: cvRecord.workExperience as any,
      education: cvRecord.education as any,
      skills: cvRecord.skills as any,
      projects: cvRecord.projects as any,
      courses: cvRecord.courses as any,
      languages: cvRecord.languages as any,
    };

    return addCORSHeaders(NextResponse.json({
      success: true,
      data: cvData,
      message: 'CV data retrieved successfully'
    }));

  } catch (error) {
    console.error('Error fetching CV data:', error);
    return addCORSHeaders(NextResponse.json(
      { success: false, error: 'Failed to fetch CV data' },
      { status: 500 }
    ));
  }
}

// POST - Create or Update CV data (Admin only)
export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting and CORS
    const middlewareResponse = await middleware(request);
    if (middlewareResponse) {
      return middlewareResponse;
    }

    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return addCORSHeaders(NextResponse.json(
        { success: false, error: 'Unauthorized: Admin access required' },
        { status: 401 }
      ));
    }

    const cvData: CVData = await request.json();

    // Validate required fields
    if (!cvData.personalInfo || !cvData.personalInfo.name) {
      return addCORSHeaders(NextResponse.json(
        { success: false, error: 'Personal information with name is required' },
        { status: 400 }
      ));
    }

    // Check if CV record exists
    const existingCV = await prisma.cV.findFirst({
      orderBy: {
        updatedAt: 'desc'
      }
    });

    let cvRecord;

    if (existingCV) {
      // Update existing record
      cvRecord = await prisma.cV.update({
        where: { id: existingCV.id },
        data: {
          personalInfo: cvData.personalInfo as any,
          workExperience: cvData.workExperience as any,
          education: cvData.education as any,
          skills: cvData.skills as any,
          projects: cvData.projects as any,
          courses: cvData.courses as any,
          languages: cvData.languages as any,
          updatedAt: new Date()
        }
      });
    } else {
      // Create new record
      cvRecord = await prisma.cV.create({
        data: {
          personalInfo: cvData.personalInfo as any,
          workExperience: cvData.workExperience as any,
          education: cvData.education as any,
          skills: cvData.skills as any,
          projects: cvData.projects as any,
          courses: cvData.courses as any,
          languages: cvData.languages as any,
        }
      });
    }

    return addCORSHeaders(NextResponse.json({
      success: true,
      data: { id: cvRecord.id },
      message: existingCV ? 'CV data updated successfully' : 'CV data created successfully'
    }));

  } catch (error) {
    console.error('Error saving CV data:', error);
    return addCORSHeaders(NextResponse.json(
      { success: false, error: 'Failed to save CV data' },
      { status: 500 }
    ));
  }
}

// PUT - Update specific section of CV (Admin only)
export async function PUT(request: NextRequest) {
  try {
    // Apply rate limiting and CORS
    const middlewareResponse = await middleware(request);
    if (middlewareResponse) {
      return middlewareResponse;
    }

    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return addCORSHeaders(NextResponse.json(
        { success: false, error: 'Unauthorized: Admin access required' },
        { status: 401 }
      ));
    }

    const { section, data } = await request.json();

    if (!section || !data) {
      return addCORSHeaders(NextResponse.json(
        { success: false, error: 'Section and data are required' },
        { status: 400 }
      ));
    }

    // Get the latest CV record
    const existingCV = await prisma.cV.findFirst({
      orderBy: {
        updatedAt: 'desc'
      }
    });

    if (!existingCV) {
      return addCORSHeaders(NextResponse.json(
        { success: false, error: 'CV data not found' },
        { status: 404 }
      ));
    }

    // Update specific section
    const updateData: any = { updatedAt: new Date() };
    updateData[section] = data;

    const cvRecord = await prisma.cV.update({
      where: { id: existingCV.id },
      data: updateData
    });

    return addCORSHeaders(NextResponse.json({
      success: true,
      data: { id: cvRecord.id },
      message: `${section} updated successfully`
    }));

  } catch (error) {
    console.error('Error updating CV section:', error);
    return addCORSHeaders(NextResponse.json(
      { success: false, error: 'Failed to update CV section' },
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