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
   * Convert image to base64 for PDF embedding
   */
  private static async convertImageToBase64(imgElement: HTMLImageElement): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      canvas.width = imgElement.naturalWidth || imgElement.width;
      canvas.height = imgElement.naturalHeight || imgElement.height;

      // Handle CORS and create a new image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png', 1.0));
      };
      
      img.onerror = () => {
        // Fallback: try to get the image from the current element
        try {
          ctx.drawImage(imgElement, 0, 0);
          resolve(canvas.toDataURL('image/png', 1.0));
        } catch (e) {
          console.warn('Could not convert image to base64:', e);
          resolve(''); // Return empty string if conversion fails
        }
      };

      // Try to load the image
      if (imgElement.src.startsWith('data:')) {
        img.src = imgElement.src;
      } else if (imgElement.src.startsWith('/_next/')) {
        // Handle Next.js optimized images
        img.src = imgElement.src;
      } else {
        img.src = imgElement.src;
      }
    });
  }

  /**
   * Prepare element for PDF generation by converting images to base64
   */
  private static async prepareElementForPDF(element: HTMLElement): Promise<void> {
    const images = element.querySelectorAll('img');
    const promises = Array.from(images).map(async (img) => {
      try {
        const base64 = await this.convertImageToBase64(img);
        if (base64) {
          img.src = base64;
        }
      } catch (error) {
        console.warn('Failed to convert image to base64:', error);
      }
    });
    
    await Promise.all(promises);
  }

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

      // Clone element to avoid modifying the original
      const clone = element.cloneNode(true) as HTMLElement;
      clone.id = elementId + '-pdf-temp';
      
      // Apply PDF-specific styles
      this.applyPDFStyles(clone);
      
      // Temporarily add to DOM
      document.body.appendChild(clone);
      
      try {
        // Prepare images for PDF
        await this.prepareElementForPDF(clone);
        
        // Wait a bit for images to load
        await new Promise(resolve => setTimeout(resolve, 500));

        // Configure html2canvas for high quality
        const canvas = await html2canvas(clone, {
          scale: 2, // Higher resolution
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          width: clone.scrollWidth,
          height: clone.scrollHeight,
          scrollX: 0,
          scrollY: 0,
          onclone: (clonedDoc) => {
            // Ensure all images are loaded in the cloned document
            const clonedImages = clonedDoc.querySelectorAll('img');
            clonedImages.forEach(img => {
              if (img.src.startsWith('/_next/')) {
                // Handle Next.js images
                img.style.display = 'block';
              }
            });
          }
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
        
      } finally {
        // Clean up cloned element
        document.body.removeChild(clone);
      }
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      this.showErrorMessage('Failed to generate PDF. Please try again.');
    } finally {
      this.showLoadingState(false);
    }
  }

  /**
   * Apply PDF-specific styles to element
   */
  private static applyPDFStyles(element: HTMLElement): void {
    // Add PDF-specific styles
    element.style.fontFamily = 'Arial, Helvetica, sans-serif';
    element.style.fontSize = '12px';
    element.style.lineHeight = '1.4';
    element.style.color = '#000000';
    element.style.backgroundColor = '#ffffff';
    element.style.width = '210mm';
    element.style.maxWidth = '210mm';
    element.style.padding = '15mm';
    element.style.margin = '0';
    element.style.boxShadow = 'none';
    element.style.borderRadius = '0';
    
    // Handle gradients for PDF - convert to solid colors
    const gradientElements = element.querySelectorAll('[class*="gradient"]');
    gradientElements.forEach(el => {
      const htmlEl = el as HTMLElement;
      if (htmlEl.classList.contains('bg-gradient-to-r')) {
        // Convert gradients to solid colors for PDF
        htmlEl.style.background = '#f8fafc'; // Light gray background
        htmlEl.style.backgroundImage = 'none';
      }
    });
    
    // Ensure images are sized properly for PDF
    const images = element.querySelectorAll('img');
    images.forEach(img => {
      const imgEl = img as HTMLImageElement;
      imgEl.style.maxWidth = '100%';
      imgEl.style.height = 'auto';
      imgEl.style.display = 'block';
    });
    
    // Handle circular images
    const photoContainers = element.querySelectorAll('.photo-container');
    photoContainers.forEach(container => {
      const htmlContainer = container as HTMLElement;
      htmlContainer.style.borderRadius = '50%';
      htmlContainer.style.overflow = 'hidden';
      htmlContainer.style.border = '2px solid #e5e7eb';
    });
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
          background: white !important;
          box-shadow: none !important;
        }
        .no-print { display: none !important; }
        
        /* Convert gradients to solid colors for print */
        .bg-gradient-to-r {
          background: #f8fafc !important;
          background-image: none !important;
        }
        
        /* Ensure proper photo display */
        .photo-container {
          width: 100px !important;
          height: 100px !important;
          border-radius: 50% !important;
          overflow: hidden !important;
          border: 2px solid #e5e7eb !important;
        }
        
        .photo-container img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
        
        /* Simplify layout for print */
        .grid {
          display: block !important;
        }
        
        .grid > div {
          margin-bottom: 0.5rem !important;
        }
        
        /* Ensure text is readable */
        * {
          color: black !important;
          font-family: Arial, sans-serif !important;
        }
        
        /* Remove shadows and modern effects */
        .shadow-lg, .shadow-sm {
          box-shadow: none !important;
        }
        
        .backdrop-blur-sm {
          backdrop-filter: none !important;
        }
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
        filename: 'Piotr_Dankowiakowski_CV_ATS_Optimized.pdf',
        quality: 1.0
      });
    } finally {
      // Clean up
      document.body.removeChild(clone);
    }
  }

  /**
   * Generate keyword-optimized PDF specifically for job applications
   */
  static async generateJobApplication(elementId: string, jobTitle?: string): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID '${elementId}' not found`);
    }

    // Clone element for job-specific optimization
    const clone = element.cloneNode(true) as HTMLElement;
    clone.id = 'cv-job-temp';
    
    // Apply job-specific ATS optimizations
    this.optimizeForATS(clone);
    this.addJobSpecificOptimizations(clone, jobTitle);
    
    // Temporarily add to DOM
    document.body.appendChild(clone);
    
    try {
      const filename = jobTitle 
        ? `Piotr_Dankowiakowski_CV_${jobTitle.replace(/\s+/g, '_')}.pdf`
        : 'Piotr_Dankowiakowski_CV_Job_Application.pdf';
        
      await this.generateFromElement('cv-job-temp', {
        filename,
        quality: 1.0
      });
    } finally {
      // Clean up
      document.body.removeChild(clone);
    }
  }

  /**
   * Apply job-specific optimizations
   */
  private static addJobSpecificOptimizations(element: HTMLElement, jobTitle?: string): void {
    if (!jobTitle) return;

    // Add job title context to summary if relevant
    const summary = element.querySelector('section p');
    if (summary && jobTitle) {
      const currentText = summary.textContent || '';
      if (!currentText.toLowerCase().includes(jobTitle.toLowerCase())) {
        summary.innerHTML = `${currentText} Seeking ${jobTitle} opportunities to leverage expertise in 3D animation, AI development, and educational technology.`;
      }
    }
  }

  /**
   * Optimize element for ATS systems
   */
  private static optimizeForATS(element: HTMLElement): void {
    // Remove all background colors and gradients
    element.style.background = 'white';
    element.style.backgroundImage = 'none';
    
    // Simplify all child elements
    const allElements = element.querySelectorAll('*');
    allElements.forEach(el => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.background = 'white';
      htmlEl.style.backgroundImage = 'none';
      htmlEl.style.boxShadow = 'none';
      htmlEl.style.borderRadius = '0';
      htmlEl.style.color = 'black';
      htmlEl.style.fontFamily = 'Arial, sans-serif';
    });
    
    // Convert grid layouts to simple blocks
    const gridElements = element.querySelectorAll('.grid');
    gridElements.forEach(grid => {
      const htmlGrid = grid as HTMLElement;
      htmlGrid.style.display = 'block';
      htmlGrid.style.gridTemplateColumns = 'none';
      htmlGrid.style.gap = '0';
    });
    
    // Ensure proper spacing
    const sections = element.querySelectorAll('section');
    sections.forEach(section => {
      const htmlSection = section as HTMLElement;
      htmlSection.style.marginBottom = '20px';
      htmlSection.style.pageBreakInside = 'avoid';
    });
    
    // Simplify headers
    const headers = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headers.forEach(header => {
      const htmlHeader = header as HTMLElement;
      htmlHeader.style.color = 'black';
      htmlHeader.style.fontWeight = 'bold';
      htmlHeader.style.marginBottom = '10px';
      htmlHeader.style.marginTop = '15px';
    });
    
    // Ensure photo is ATS-friendly
    const photoContainer = element.querySelector('.photo-container');
    if (photoContainer) {
      const htmlContainer = photoContainer as HTMLElement;
      htmlContainer.style.width = '100px';
      htmlContainer.style.height = '100px';
      htmlContainer.style.borderRadius = '0';
      htmlContainer.style.border = '1px solid black';
      htmlContainer.style.float = 'right';
      htmlContainer.style.marginLeft = '10px';
      htmlContainer.style.marginBottom = '10px';
    }
  }

  /**
   * Show loading state
   */
  private static showLoadingState(show: boolean): void {
    const buttons = document.querySelectorAll('.download-btn');
    buttons.forEach(button => {
      const btn = button as HTMLButtonElement;
      if (show) {
        btn.disabled = true;
        btn.style.opacity = '0.5';
        btn.textContent = 'Generating...';
      } else {
        btn.disabled = false;
        btn.style.opacity = '1';
        // Reset button text (you might want to store original text)
        if (btn.textContent === 'Generating...') {
          btn.textContent = 'Download PDF';
        }
      }
    });
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
    toast.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white font-medium z-50 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
} 