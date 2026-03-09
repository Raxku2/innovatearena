import { createRoot } from 'react-dom/client';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Invoice } from '../../component';

export const usePdfDownload = () => {
  const downloadPdf = async (invoiceData, fileName = 'invoice.pdf') => {
    // 1. Create a hidden container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    // Set width to match your max-w-212.5 (approx 850px) to ensure Tailwind classes apply correctly
    container.style.width = '850px';
    document.body.appendChild(container);

    // 2. Render the component off-screen
    const root = createRoot(container);
    root.render(<Invoice customInvoiceData={invoiceData} />);

    // 3. Wait for React to mount and Tailwind styles to apply
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      // 4. Capture the element
      const canvas = await html2canvas(container.firstChild, {
        // scale: 2,
        scale: 1.5,
        useCORS: true,
        backgroundColor: '#0f172a', // Tailwind slate-900 to match your theme
        logging: false
      });

      await new Promise(resolve => setTimeout(resolve, 50));

      const imgData = canvas.toDataURL('image/png');
      // const imgData = canvas.toDataURL('image/jpeg',0.75);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
        compress: true
      });

      await new Promise(resolve => setTimeout(resolve, 50));

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      // pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(fileName);
    } finally {
      // 5. Cleanup
      root.unmount();
      document.body.removeChild(container);
    }
  };

  return { downloadPdf };
};