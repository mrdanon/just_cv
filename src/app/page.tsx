'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import CVLayout from '@/components/cv/CVLayout';
import { piotrCVData } from '@/lib/cvData';
import { PDFGenerator } from '@/lib/pdf';

// Dynamically import PDF functions to avoid SSR issues
const PDFControls = dynamic(() => import('@/components/PDFControls'), {
  ssr: false,
  loading: () => (
    <div className="no-print fixed top-4 right-4 z-10 flex flex-col gap-2">
      <div className="bg-gray-300 animate-pulse h-10 w-32 rounded-lg"></div>
      <div className="bg-gray-300 animate-pulse h-10 w-32 rounded-lg"></div>
      <div className="bg-gray-300 animate-pulse h-10 w-32 rounded-lg"></div>
      <div className="bg-gray-300 animate-pulse h-10 w-32 rounded-lg"></div>
    </div>
  )
});

export default function Home() {
  const handleDownloadPDF = async () => {
    try {
      await PDFGenerator.generateFromElement('cv-container');
    } catch (error) {
      console.error('PDF generation error:', error);
    }
  };

  const handlePrintOptimized = () => {
    try {
      PDFGenerator.printOptimized();
    } catch (error) {
      console.error('Print optimization error:', error);
    }
  };

  const handleDownloadATS = async () => {
    try {
      await PDFGenerator.generateATS('cv-container');
    } catch (error) {
      console.error('ATS PDF generation error:', error);
    }
  };

  const handleDownloadJobApplication = async () => {
    try {
      const jobTitle = prompt("Enter target job title (optional):");
      await PDFGenerator.generateJobApplication('cv-container', jobTitle || undefined);
    } catch (error) {
      console.error('Job application PDF generation error:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* PDF Download Buttons */}
      <Suspense fallback={
        <div className="no-print fixed top-4 right-4 z-10 flex flex-col gap-2">
          <div className="bg-gray-300 animate-pulse h-10 w-32 rounded-lg"></div>
          <div className="bg-gray-300 animate-pulse h-10 w-32 rounded-lg"></div>
          <div className="bg-gray-300 animate-pulse h-10 w-32 rounded-lg"></div>
          <div className="bg-gray-300 animate-pulse h-10 w-32 rounded-lg"></div>
        </div>
      }>
        <PDFControls
          onDownloadPDF={handleDownloadPDF}
          onPrintOptimized={handlePrintOptimized}
          onDownloadATS={handleDownloadATS}
          onDownloadJobApplication={handleDownloadJobApplication}
        />
      </Suspense>
      
      {/* CV Content */}
      <CVLayout data={piotrCVData} />
    </main>
  );
}
