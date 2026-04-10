import { createRoot } from 'react-dom/client';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Invoice } from '../../component'; // USE YOUR ORIGINAL HTML COMPONENT

export const usePdfDownload = () => {
  const downloadPdf = async (invoiceData, fileName = 'invoice.pdf') => {
    // 1. Create a hidden container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';

    // EXACT A4 Pixel Width at 96 DPI. This prevents the right-side gap.
    container.style.width = '794px';
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(<Invoice customInvoiceData={invoiceData} />);

    // Wait for fonts and Tailwind to fully load
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const element = container.firstChild;

      // 2. The HTML2Canvas Magic Settings
      const canvas = await html2canvas(element, {
        scale: 3, // Bumping to 3 makes it incredibly sharp, almost vector-like.
        useCORS: true, // Forces it to load your external fonts/icons
        backgroundColor: '#0f172a',
        logging: false,

        // These two lines STOP mobile devices from ruining the layout
        windowWidth: 794,
        width: 794,
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0); // Use JPEG at max quality to keep file size reasonable

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
        compress: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Drop the perfect screenshot onto the page
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(fileName);

    } finally {
      root.unmount();
      document.body.removeChild(container);
    }
  };

  return { downloadPdf };
};