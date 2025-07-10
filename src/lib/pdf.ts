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

    // Add metadata for ATS parsing
    const metaData = document.createElement('div');
    metaData.style.display = 'none';
    metaData.innerHTML = `
      <!-- ATS Metadata -->
      <span>Target Position: ${jobTitle}</span>
      <span>Keywords: 3D Artist, AI Specialist, Blender, Educational Technology, Machine Learning</span>
      <span>Location: Warsaw, Poland</span>
      <span>Experience: 6+ years</span>
    `;
    element.appendChild(metaData);
  }

  /**
   * Apply ATS-specific optimizations to element
   */
  private static optimizeForATS(element: HTMLElement): void {
    // Remove all images except the profile photo for maximum ATS compatibility
    const images = element.querySelectorAll('img');
    images.forEach((img, index) => {
      if (index > 0) { // Keep only the first image (profile photo)
        img.remove();
      } else {
        // Optimize the profile photo for ATS
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.border = '1px solid black';
        img.style.borderRadius = '0';
      }
    });

    // Enhanced ATS color optimization
    const allElements = element.querySelectorAll('*');
    allElements.forEach(el => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.color = 'black';
      htmlEl.style.backgroundColor = 'white';
      htmlEl.style.borderColor = 'black';
      htmlEl.style.textDecoration = 'none';
      
      // Remove gradients and complex styling
      htmlEl.style.background = 'transparent';
      htmlEl.style.boxShadow = 'none';
      htmlEl.style.borderRadius = '0';
    });

    // ATS-optimized typography
    element.style.fontFamily = 'Arial, Helvetica, sans-serif';
    element.style.fontSize = '11pt';
    element.style.lineHeight = '1.4';
    element.style.margin = '0';
    element.style.padding = '0.5in';
    element.style.maxWidth = '8.5in';
    element.style.color = 'black';
    element.style.backgroundColor = 'white';

    // Optimize headings for ATS parsing
    const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
      const htmlHeading = heading as HTMLElement;
      htmlHeading.style.fontWeight = 'bold';
      htmlHeading.style.marginTop = '12pt';
      htmlHeading.style.marginBottom = '6pt';
      htmlHeading.style.color = 'black';
      htmlHeading.style.backgroundColor = 'transparent';
      htmlHeading.style.borderBottom = '1pt solid black';
    });

    // Optimize lists for ATS
    const lists = element.querySelectorAll('ul, ol');
    lists.forEach(list => {
      const htmlList = list as HTMLElement;
      htmlList.style.marginLeft = '0.25in';
      htmlList.style.paddingLeft = '0';
    });

    // Optimize list items
    const listItems = element.querySelectorAll('li');
    listItems.forEach(item => {
      const htmlItem = item as HTMLElement;
      htmlItem.style.marginBottom = '3pt';
      htmlItem.style.listStyleType = 'disc';
      htmlItem.style.listStylePosition = 'outside';
    });

    // Remove any remaining complex layouts
    const complexElements = element.querySelectorAll('[class*="grid"], [class*="flex"]');
    complexElements.forEach(el => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.display = 'block';
      htmlEl.style.width = '100%';
    });
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