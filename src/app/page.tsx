'use client';

import CVLayout from '@/components/cv/CVLayout';
import { piotrCVData } from '@/lib/cvData';
import { PDFGenerator } from '@/lib/pdf';

export default function Home() {
  const handleDownloadPDF = async () => {
    await PDFGenerator.generateFromElement('cv-container');
  };

  const handlePrintOptimized = () => {
    PDFGenerator.printOptimized();
  };

  const handleDownloadATS = async () => {
    await PDFGenerator.generateATS('cv-container');
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* PDF Download Buttons */}
      <div className="no-print fixed top-4 right-4 z-10 flex flex-col gap-2">
        <button 
          onClick={handleDownloadPDF}
          className="download-btn"
        >
          Download PDF
        </button>
        <button 
          onClick={handlePrintOptimized}
          className="download-btn bg-green-600 hover:bg-green-700"
        >
          Print (ATS)
        </button>
        <button 
          onClick={handleDownloadATS}
          className="download-btn bg-purple-600 hover:bg-purple-700"
        >
          ATS PDF
        </button>
      </div>
      
      {/* CV Content */}
      <CVLayout data={piotrCVData} />
    </main>
  );
}
