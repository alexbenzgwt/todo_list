import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Send, Edit, FileText, Copy, Share2, Mail } from 'lucide-react';

const InvoicePreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    // Get invoice data from location state or localStorage
    const data = location.state || JSON.parse(localStorage.getItem('invoiceData') || '{}');
    setInvoiceData(data);
  }, [location.state]);

  if (!invoiceData) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No invoice data found. Please go back and create an invoice.</p>
      </div>
    );
  }

  const {
    clientDetails = {},
    invoiceDetails = {},
    invoiceItems = [],
    // notes = '',
    paymentDetails = {},
    // isPoweredByTruodoit = true
  } = invoiceData;

  // Calculate totals
  const subtotal = invoiceItems.reduce((sum, item) => sum + (item.total || 0), 0);
  const taxRate = 18;
  const taxAmount = Math.round((subtotal * taxRate) / 100);
  const grandTotal = subtotal + taxAmount;

  const handleBack = () => {
    navigate('/dashboard/invoice');
  };

  const handleDownload = () => {
    // Create a new window for printing/downloading
    const printWindow = window.open('', '_blank');
    
    // Get the invoice content
    const invoiceContent = document.querySelector('.bg-white.rounded-lg.shadow-sm.border.border-gray-200.overflow-hidden');
    
    if (invoiceContent) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Invoice - ${invoiceDetails.invoiceNo || 'INV-2024-001247'}</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0; 
              padding: 20px; 
              background: white;
              color: #333;
            }
            .invoice-container { 
              max-width: 800px; 
              margin: 0 auto; 
              background: white;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              overflow: hidden;
            }
            .header { 
              padding: 32px; 
              border-bottom: 2px solid #E5E7EB; 
            }
            .company-info h2 { 
              font-size: 24px; 
              font-weight: bold; 
              margin: 0 0 8px 0; 
              color: #111827; 
            }
            .company-info p { 
              margin: 4px 0; 
              color: #6b7280; 
            }
            .invoice-title { 
              font-size: 36px; 
              font-weight: bold; 
              color: #111827; 
              margin: 0 0 16px 0; 
              border-bottom: 2px solid #E5E7EB; 
              padding-bottom: 8px; 
            }
            .invoice-details { 
              text-align: right; 
            }
            .invoice-details p { 
              margin: 8px 0; 
              color: #6b7280; 
            }
            .client-section { 
              padding: 32px; 
            }
            .client-section h4 { 
              font-size: 18px; 
              font-weight: 600; 
              margin: 0 0 16px 0; 
              color: #111827; 
            }
            .client-info p { 
              margin: 4px 0; 
              color: #6b7280; 
            }
            .client-name { 
              font-weight: 500; 
              font-size: 18px; 
              color: #111827; 
            }
            .table-container { 
              padding: 32px; 
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
            }
            th { 
              text-align: left; 
              padding: 12px 16px; 
              font-weight: 600; 
              color: #111827; 
              border-bottom: 2px solid #e5e7eb; 
              background: #F2F2F2;
            }
            td { 
              padding: 16px; 
              border-bottom: 1px solid #f3f4f6; 
            }
            .text-right { 
              text-align: right; 
            }
            .text-center { 
              text-align: center; 
            }
            .font-medium { 
              font-weight: 500; 
            }
            .totals-section { 
              padding: 32px; 
            }
            .thank-you { 
              margin-bottom: 24px; 
            }
            .totals { 
              display: flex; 
              justify-content: flex-end; 
            }
            .totals-inner { 
              width: 320px; 
            }
            .total-row { 
              display: flex; 
              justify-content: space-between; 
              margin: 12px 0; 
            }
            .grand-total { 
              background: #fef2f2; 
              padding: 16px; 
              border-radius: 8px; 
              margin-top: 12px; 
            }
            .grand-total .total-row { 
              font-size: 18px; 
              font-weight: bold; 
            }
            .grand-total .amount { 
              color: #dc2626; 
            }
            .payment-section { 
              padding: 32px; 
            }
            .payment-section h4 { 
              font-size: 18px; 
              font-weight: 600; 
              margin: 0 0 16px 0; 
              color: #111827; 
            }
            .payment-details p { 
              margin: 8px 0; 
              color: #6b7280; 
            }
            .footer { 
              padding: 32px; 
              text-align: right; 
            }
            .footer p { 
              margin: 0; 
              color: #9ca3af; 
              font-size: 14px; 
            }
            .powered-by { 
              color: #dc2626; 
              font-weight: 500; 
            }
            @media print {
              body { margin: 0; padding: 0; }
              .invoice-container { border: none; box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                  <div style="width: 68px; height: 66px; background: #2563EB; border-radius: 11.06px; display: flex; align-items: center; justify-content: center;">
                    <img src="/svg.png" alt="Company Logo" style="width: 20px; height: 27px;" />
                  </div>
                  <div>
                    <h2 style="margin: 0; font-size: 24px; font-weight: bold; color: #111827;">TechCorp</h2>
                    <p style="margin: 0; font-size: 19.35px; color: #6b7280;">Business Solutions Pvt Ltd</p>
                  </div>
                </div>
                <div>
                  <div class="invoice-title">INVOICE</div>
                </div>
              </div>

              <!-- Separation line -->
              <div style="border-top: 1px solid #E5E7EB; margin: 24px 0;"></div>

              <!-- Middle Section: Date on left, Invoice number in center, Address on right -->
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <!-- Date Section (Left) -->
                <div>
                  <p style="margin: 0; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase;">DATE</p>
                  <p style="margin: 0; font-size: 18px; font-weight: bold; color: #111827;">${invoiceDetails.date || 'October 4, 2024'}</p>
                </div>

                <!-- Invoice Number Section (Center) -->
                <div style="text-align: center;">
                  <p style="margin: 0; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase;">INVOICE NUMBER</p>
                  <p style="margin: 0; font-size: 18px; font-weight: bold; color: #111827;">${invoiceDetails.invoiceNo || 'INV-2024-001247'}</p>
                </div>

                
                <div style="text-align: right;">
                  <p style="margin: 0 0 8px 0; font-weight: bold; color: #111827;">TechCorp Business Solutions Pvt Ltd</p>
                  <div style="display: flex; flex-direction: column; gap: 4px;">
                    <p style="margin: 0; color: #6b7280;">123 Business Park, Tech City</p>
                    <p style="margin: 0; color: #6b7280;">GST: 27AABCT1234C1Z5</p>
                    <p style="margin: 0; color: #6b7280;">Mumbai, Maharashtra - 400001</p>
                    <p style="margin: 0; color: #6b7280;">Phone: +91 98765 43210</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="client-section">
              <h4>TO:</h4>
              <div class="client-info">
                <p class="client-name">${clientDetails.name || 'ABC Designs'}</p>
                <p>${clientDetails.company || 'XYZ Co.'}</p>
                <p>${clientDetails.email || 'client123@gmail.com'}</p>
                <p>${clientDetails.phone || '7687564852'}</p>
              </div>
            </div>
            
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Task / Item</th>
                    <th>Description</th>
                    <th class="text-center">Quantity</th>
                    <th class="text-right">Rate</th>
                    <th class="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${invoiceItems.map(item => `
                    <tr>
                      <td class="font-medium">${item.task || 'Logo design'}</td>
                      <td>${item.description || 'First Draft Delivery'}</td>
                      <td class="text-center">${item.quantity || 1}</td>
                      <td class="text-right">${invoiceDetails.currency || '₹'}${(item.rate || 5000).toLocaleString()}</td>
                      <td class="text-right font-medium">${invoiceDetails.currency || '₹'}${(item.total || 5000).toLocaleString()}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            
            <div class="totals-section">
              <div class="thank-you">
                <p style="font-size: 18px; color: #6b7280;">Thank you for your business</p>
              </div>
              <div class="totals">
                <div class="totals-inner">
                  <div class="total-row">
                    <span>tax type ${invoiceDetails.taxType || 'GST'}</span>
                    <span></span>
                  </div>
                  <div class="total-row">
                    <span>tax 18%</span>
                    <span>${invoiceDetails.currency || '₹'}${taxAmount.toLocaleString()}</span>
                  </div>
                  <div class="grand-total">
                    <div class="total-row">
                      <span>Grand Total</span>
                      <span class="amount">${invoiceDetails.currency || '₹'}${grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="payment-section">
              <h4>Payment Details:</h4>
              <div class="payment-details">
                <p><strong>Bank Name:</strong> ${paymentDetails.bankName || 'HDFC Bank'}</p>
                <p><strong>Account Number:</strong> ${paymentDetails.accountNumber || '1234567890123456'}</p>
                <p><strong>IFSC Code:</strong> ${paymentDetails.ifscCode || 'HDFC0001234'}</p>
                <p><strong>Account Holder:</strong> ${paymentDetails.accountHolder || 'TechCorp Business Solutions Pvt Ltd'}</p>
              </div>
            </div>
            
            <div class="footer">
              <p>Powered by <span class="powered-by">Truodoit</span></p>
            </div>
          </div>
        </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // Wait for content to load, then trigger print dialog
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  // const handleDownloadAsText = () => {
  //   // Function commented out - unused
  // };

  const handleDownloadAsText = () => {
    // Create text content for download
    const textContent = `
INVOICE
${invoiceDetails.invoiceNo || 'INV-2024-001247'}

FROM:
TechCorp Business Solutions Pvt Ltd
123 Business Park, Tech City
GST: 27AABCT1234C1Z5
Mumbai, Maharashtra - 400001
Phone: +91 98765 43210

TO:
${clientDetails.name || 'ABC Designs'}
${clientDetails.company || 'XYZ Co.'}
${clientDetails.email || 'client123@gmail.com'}
${clientDetails.phone || '7687564852'}

DATE: ${invoiceDetails.date || 'October 4, 2024'}

ITEMS:
${invoiceItems.map(item => `
- ${item.task || 'Logo design'}: ${item.description || 'First Draft Delivery'}
  Quantity: ${item.quantity || 1}
  Rate: ${invoiceDetails.currency || '₹'}${(item.rate || 5000).toLocaleString()}
  Total: ${invoiceDetails.currency || '₹'}${(item.total || 5000).toLocaleString()}
`).join('')}

SUBTOTAL: ${invoiceDetails.currency || '₹'}${subtotal.toLocaleString()}
TAX (${taxRate}%): ${invoiceDetails.currency || '₹'}${taxAmount.toLocaleString()}
GRAND TOTAL: ${invoiceDetails.currency || '₹'}${grandTotal.toLocaleString()}

PAYMENT DETAILS:
Bank: ${paymentDetails.bankName || 'HDFC Bank'}
Account Number: ${paymentDetails.accountNumber || '1234567890123456'}
IFSC Code: ${paymentDetails.ifscCode || 'HDFC0001234'}
Account Holder: ${paymentDetails.accountHolder || 'TechCorp Business Solutions Pvt Ltd'}

Thank you for your business!

Powered by Truodoit
    `.trim();

    // Create and download text file
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${invoiceDetails.invoiceNo || 'INV-2024-001247'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleSend = () => {
    // Create email content
    const emailSubject = `Invoice ${invoiceDetails.invoiceNo || 'INV-2024-001247'} - ${clientDetails.name || 'ABC Designs'}`;
    const emailBody = `
Dear ${clientDetails.name || 'ABC Designs'},

Please find attached your invoice for the services provided.

Invoice Details:
- Invoice Number: ${invoiceDetails.invoiceNo || 'INV-2024-001247'}
- Date: ${invoiceDetails.date || 'October 4, 2024'}
- Due Date: ${invoiceDetails.dueDate || 'November 3, 2024'}
- Total Amount: ${invoiceDetails.currency || '₹'}${grandTotal.toLocaleString()}

Payment Instructions:
Please make payment by the due date. If you have any questions, please don't hesitate to contact us.

Thank you for your business!

Best regards,
TechCorp Business Solutions Pvt Ltd
Phone: +91 98765 43210
Email: support@techcorp.com
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:${clientDetails.email || 'client123@gmail.com'}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.open(mailtoLink, '_blank');
  };

  const handleCopyToClipboard = async () => {
    try {
      const invoiceUrl = `${window.location.origin}/dashboard/invoice/preview`;
      await navigator.clipboard.writeText(invoiceUrl);
      alert('Invoice link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy link. Please try again.');
    }
  };

  const handleShareInvoice = () => {
    if (navigator.share) {
      navigator.share({
        title: `Invoice ${invoiceDetails.invoiceNo || 'INV-2024-001247'}`,
        text: `Invoice for ${clientDetails.name || 'ABC Designs'} - Amount: ${invoiceDetails.currency || '₹'}${grandTotal.toLocaleString()}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      handleCopyToClipboard();
    }
  };

  const handleEdit = () => {
    // Navigate back to invoice form with data
    navigate('/dashboard/invoice', { state: invoiceData });
  };

  return (
    <div className="space-y-6">
      {/* Header with navigation and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Invoice Preview</h1>
        </div>
        
         <div className="flex flex-wrap items-center space-x-3">
           <button
             onClick={handleEdit}
             className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
           >
             <Edit className="h-4 w-4" />
             <span>Edit</span>
           </button>
           
           <div className="relative group">
             <button
               onClick={handleDownload}
               className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
             >
               <Download className="h-4 w-4" />
               <span>Download</span>
             </button>
             
             {/* Download dropdown */}
             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
               <button
                 onClick={handleDownload}
                 className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
               >
                 <FileText className="h-4 w-4" />
                 <span>Print/PDF</span>
               </button>
               <button
                 onClick={handleDownloadAsText}
                 className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
               >
                 <Download className="h-4 w-4" />
                 <span>Download as Text</span>
               </button>
             </div>
           </div>
           
           <div className="relative group">
             <button
               onClick={handleSend}
               className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
             >
               <Send className="h-4 w-4" />
               <span>Send Invoice</span>
             </button>
             
             {/* Send dropdown */}
             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
               <button
                 onClick={handleSend}
                 className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
               >
                 <Mail className="h-4 w-4" />
                 <span>Send via Email</span>
               </button>
               <button
                 onClick={handleCopyToClipboard}
                 className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
               >
                 <Copy className="h-4 w-4" />
                 <span>Copy Invoice Link</span>
               </button>
               <button
                 onClick={handleShareInvoice}
                 className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
               >
                 <Share2 className="h-4 w-4" />
                 <span>Share Invoice</span>
               </button>
             </div>
           </div>
         </div>
      </div>

       {/* the entire Invoice Preview */}
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
         {/* the entire Invoice Header */}
         <div className="px-8 py-6 border-b-2 border-gray-300">
           {/* Top Section: Logo + Company name on left, INVOICE title on right */}
           <div className="flex justify-between items-center mb-6">
             <div className="flex items-center gap-4">
               <div className="w-[67.74px] h-[66.36px] opacity-100 rounded-[11.06px] bg-[#2563EB] flex items-center justify-center">
                 <img className="w-[20px] h-[27px] opacity-100" src="/svg.png" alt="Company Logo" />
               </div>
               <div>
                 <h2 className="text-2xl font-bold text-gray-900 mb-2">TechCorp</h2>
                 <p className="font-normal text-[19.35px] leading-[27.65px] text-gray-500">Business Solutions Pvt Ltd</p>
               </div>
             </div>
             
             <div>
               <h3 className="text-4xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2">INVOICE</h3>
             </div>
           </div>

           {/* Separation line */}
           <div className="border-t border-gray-300 my-6"></div>

           {/* Middle Section: Date on left, Invoice number in center, Address on right */}
           <div className="flex justify-between items-start">
             {/* Date Section (Left) */}
             <div>
               <p className="text-sm font-medium text-gray-600 uppercase">DATE</p>
               <p className="text-lg font-bold text-gray-900">{invoiceDetails.date || 'October 4, 2024'}</p>
             </div>

             {/* Invoice Number Section (Center) */}
             <div className="text-center">
               <p className="text-sm font-medium text-gray-600 uppercase">INVOICE NUMBER</p>
               <p className="text-lg font-bold text-gray-900">{invoiceDetails.invoiceNo || 'INV-2024-001247'}</p>
             </div>

             {/* Address Section (Right) */}
             <div className="text-right">
               <p className="font-bold text-gray-900 mb-2">TechCorp Business Solutions Pvt Ltd</p>
               <div className="space-y-1">
                 <p className="text-gray-600">123 Business Park, Tech City</p>
                 <p className="text-gray-600">GST: 27AABCT1234C1Z5</p>
                 <p className="text-gray-600">Mumbai, Maharashtra - 400001</p>
                 <p className="text-gray-600">Phone: +91 98765 43210</p>
               </div>
             </div>
           </div>
         </div>

         {/* Client Details */}
         <div className="px-8 py-6">
           <div className="mb-6">
             <h4 className="text-lg font-semibold text-gray-900 mb-4">TO:</h4>
             <div className="space-y-1">
               <p className="font-medium text-gray-900 text-lg">{clientDetails.name || 'ABC Designs'}</p>
               <p className="text-gray-600">{clientDetails.company || 'XYZ Co.'}</p>
               <p className="text-gray-600">{clientDetails.email || 'client123@gmail.com'}</p>
               <p className="text-gray-600">{clientDetails.phone || '7687564852'}</p>
             </div>
           </div>
         </div>

         {/* Invoice Items Table */}
         <div className="px-8 py-6">
           <div className="overflow-x-auto">
             <table className="w-full">
               <thead>
                 <tr className="border-b-2 border-gray-200 bg-[#F2F2F2]">
                   <th className="text-left py-3 px-4 font-semibold text-gray-900">Task / Item</th>
                   <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                   <th className="text-center py-3 px-4 font-semibold text-gray-900">Quantity</th>
                   <th className="text-right py-3 px-4 font-semibold text-gray-900">Rate</th>
                   <th className="text-right py-3 px-4 font-semibold text-gray-900">Total</th>
                 </tr>
               </thead>
               <tbody>
                 {invoiceItems.map((item, index) => (
                   <tr key={item.id || index} className="border-b border-gray-100">
                     <td className="py-4 px-4 font-medium text-gray-900">{item.task || 'Logo design'}</td>
                     <td className="py-4 px-4 text-gray-600">{item.description || 'First Draft Delivery'}</td>
                     <td className="py-4 px-4 text-center text-gray-600">{item.quantity || 1}</td>
                     <td className="py-4 px-4 text-right text-gray-600">
                       {invoiceDetails.currency || '₹'}{(item.rate || 5000).toLocaleString()}
                     </td>
                     <td className="py-4 px-4 text-right font-medium text-gray-900">
                       {invoiceDetails.currency || '₹'}{(item.total || 5000).toLocaleString()}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
           
           {/* Add Task Button */}
           <div className="mt-4">
             <button className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium">
               <span className="text-xl">+</span>
               <span>Add Task</span>
             </button>
           </div>
           
           {/* Subtotal */}
           <div className="mt-6 flex justify-end">
             <div className="text-right">
               <p className="text-lg font-semibold text-gray-900">
                 Subtotal {invoiceDetails.currency || '₹'}{subtotal.toLocaleString()}
               </p>
             </div>
           </div>
         </div>

         {/* Thank you message and totals */}
         <div className="px-8 py-6">
           <div className="mb-6">
             <p className="text-gray-600 text-lg">Thank you for your business</p>
           </div>
           
           <div className="flex justify-end">
             <div className="w-80">
               <div className="space-y-3">
                 <div className="flex justify-between items-center">
                   <span className="text-gray-600">tax type {invoiceDetails.taxType || 'GST'}</span>
                   <span className="font-medium"></span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-gray-600">tax {taxRate}%</span>
                   <span className="font-medium">{invoiceDetails.currency || '₹'}{taxAmount.toLocaleString()}</span>
                 </div>
                 <div className="border-t border-gray-300 pt-3">
                   <div className="flex justify-between items-center bg-red-50 px-4 py-2 rounded">
                     <span className="text-lg font-bold text-gray-900">Grand Total</span>
                     <span className="text-lg font-bold text-red-600">
                       {invoiceDetails.currency || '₹'}{grandTotal.toLocaleString()}
                     </span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>

         {/* Payment Details */}
         <div className="px-8 py-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Payment Details */}
             <div>
               <h4 className="text-lg font-semibold text-gray-900 mb-3">Payment Details:</h4>
               <div className="space-y-2">
                 <p className="text-gray-600">
                   <span className="font-medium">Bank Name:</span> {paymentDetails.bankName || 'HDFC Bank'}
                 </p>
                 <p className="text-gray-600">
                   <span className="font-medium">Account Number:</span> {paymentDetails.accountNumber || '1234567890123456'}
                 </p>
                 <p className="text-gray-600">
                   <span className="font-medium">IFSC Code:</span> {paymentDetails.ifscCode || 'HDFC0001234'}
                 </p>
                 <p className="text-gray-600">
                   <span className="font-medium">Account Holder:</span> {paymentDetails.accountHolder || 'TechCorp Business Solutions Pvt Ltd'}
                 </p>
               </div>
             </div>
           </div>
         </div>

         {/* Footer */}
         <div className="px-8 py-6">
           <div className="flex justify-end">
             <div className="text-right">
               <p className="text-sm text-gray-500">
                 Powered by <span className="font-medium text-red-600">Truodoit</span>
               </p>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
};

export default InvoicePreviewPage;
