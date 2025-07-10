import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PDFOptions } from '@/types/cv';

export class PDFGenerator {
  private static readonly DEFAULT_OPTIONS: PDFOptions = {
    filename: 'Piotr_Dankowiakowski_CV.pdf',
    format: 'A4',
    quality: 1.0
  };

  /**
   * Generate PDF from HTML element using html2canvas and jsPDF
   */
  static async generateFromElement(
    elementId: string, 
    options: Partial<PDFOptions> = {}
  ): Promise<void> {
    const config = { ...this.DEFAULT_OPTIONS, ...options };
    
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(`Element with ID '${elementId}' not found`);
      }

      // Show loading state
      this.showLoadingState(true);

      // Configure html2canvas for high quality
      const canvas = await html2canvas(element, {
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0
      });

      // Calculate dimensions for A4
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm  
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      // Create PDF
      const pdf = new jsPDF('portrait', 'mm', 'a4');
      let position = 0;

      // Add pages as needed
      pdf.addImage(
        canvas.toDataURL('image/png', config.quality), 
        'PNG', 
        0, 
        position, 
        imgWidth, 
        imgHeight
      );
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          canvas.toDataURL('image/png', config.quality), 
          'PNG', 
          0, 
          position, 
          imgWidth, 
          imgHeight
        );
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save(config.filename);
      
      this.showSuccessMessage('PDF downloaded successfully!');
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      this.showErrorMessage('Failed to generate PDF. Please try again.');
    } finally {
      this.showLoadingState(false);
    }
  }

  /**
   * Generate PDF using browser's native print functionality (optimized for ATS)
   */
  static printOptimized(): void {
    // Add print-specific styles temporarily
    const printStyles = document.createElement('style');
    printStyles.textContent = `
      @media print {
        body * { visibility: hidden; }
        #cv-container, #cv-container * { visibility: visible; }
        #cv-container { 
          position: absolute; 
          left: 0; 
          top: 0; 
          width: 100% !important;
          margin: 0 !important;
          padding: 0.5in !important;
        }
        .no-print { display: none !important; }
      }
    `;
    document.head.appendChild(printStyles);

    // Trigger print
    window.print();

    // Clean up styles after print
    setTimeout(() => {
      document.head.removeChild(printStyles);
    }, 1000);
  }

  /**
   * Create PDF with proper ATS optimization
   */
  static async generateATS(elementId: string): Promise<void> {
    // First, apply ATS-specific optimizations
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID '${elementId}' not found`);
    }

    // Clone element for ATS optimization
    const clone = element.cloneNode(true) as HTMLElement;
    clone.id = 'cv-ats-temp';
    
    // Apply ATS optimizations
    this.optimizeForATS(clone);
    
    // Temporarily add to DOM
    document.body.appendChild(clone);
    
    try {
      await this.generateFromElement('cv-ats-temp', {
        filename: 'Piotr_Dankowiakowski_CV_ATS.pdf',
        quality: 1.0
      });
    } finally {
      // Clean up
      document.body.removeChild(clone);
    }
  }

  /**
   * Apply ATS-specific optimizations to element
   */
  private static optimizeForATS(element: HTMLElement): void {
    // Remove all images except the profile photo
    const images = element.querySelectorAll('img');
    images.forEach((img, index) => {
      if (index > 0) { // Keep only the first image (profile photo)
        img.remove();
      }
    });

    // Simplify colors to black/white
    const allElements = element.querySelectorAll('*');
    allElements.forEach(el => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.color = 'black';
      htmlEl.style.backgroundColor = 'transparent';
      htmlEl.style.borderColor = 'black';
    });

    // Remove complex styling
    element.style.fontFamily = 'Arial, sans-serif';
    element.style.fontSize = '11pt';
    element.style.lineHeight = '1.4';
  }

  /**
   * Show loading state
   */
  private static showLoadingState(show: boolean): void {
    const button = document.querySelector('.download-btn') as HTMLButtonElement;
    if (button) {
      if (show) {
        button.textContent = 'Generating PDF...';
        button.disabled = true;
        button.classList.add('loading');
      } else {
        button.textContent = 'Download PDF';
        button.disabled = false;
        button.classList.remove('loading');
      }
    }
  }

  /**
   * Show success message
   */
  private static showSuccessMessage(message: string): void {
    this.showToast(message, 'success');
  }

  /**
   * Show error message
   */
  private static showErrorMessage(message: string): void {
    this.showToast(message, 'error');
  }

  /**
   * Show toast notification
   */
  private static showToast(message: string, type: 'success' | 'error'): void {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white z-50 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
} 