'use client';

interface PDFControlsProps {
  onDownloadPDF: () => Promise<void>;
  onPrintOptimized: () => void;
  onDownloadATS: () => Promise<void>;
  onDownloadJobApplication: () => Promise<void>;
}

export default function PDFControls({
  onDownloadPDF,
  onPrintOptimized,
  onDownloadATS,
  onDownloadJobApplication
}: PDFControlsProps) {
  return (
    <div className="no-print fixed top-4 right-4 z-10 flex flex-col gap-2">
      <button 
        onClick={onDownloadPDF}
        className="download-btn"
      >
        Download PDF
      </button>
      <button 
        onClick={onPrintOptimized}
        className="download-btn bg-green-600 hover:bg-green-700"
      >
        Print (ATS)
      </button>
      <button 
        onClick={onDownloadATS}
        className="download-btn bg-purple-600 hover:bg-purple-700"
      >
        ATS PDF
      </button>
      <button 
        onClick={onDownloadJobApplication}
        className="download-btn bg-orange-600 hover:bg-orange-700"
      >
        Job Application PDF
      </button>
    </div>
  );
} 