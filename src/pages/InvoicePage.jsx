import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';


const InvoicePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Form state management
  const [clientDetails, setClientDetails] = useState({
    name: '',
    company: '',
    email: '',
    phone: ''
  });

  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNo: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    currency: '₹',
    taxType: 'GST'
  });

  const [invoiceItems, setInvoiceItems] = useState([
    {
      id: 1,
      task: 'Logo design',
      description: 'First Draft Delivery',
      quantity: 1,
      rate: 5000,
      total: 5000
    }
  ]);

  const [notes, setNotes] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountHolder: ''
  });

  const [isPoweredByTruodoit, setIsPoweredByTruodoit] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load data from location state or localStorage when component mounts
  useEffect(() => {
    const loadInvoiceData = () => {
      // First try to get data from location state (when coming from preview page)
      const stateData = location.state;
      
      if (stateData) {
        // Load data from location state
        if (stateData.clientDetails) setClientDetails(stateData.clientDetails);
        if (stateData.invoiceDetails) setInvoiceDetails(stateData.invoiceDetails);
        if (stateData.invoiceItems) setInvoiceItems(stateData.invoiceItems);
        if (stateData.notes) setNotes(stateData.notes);
        if (stateData.paymentDetails) setPaymentDetails(stateData.paymentDetails);
        if (stateData.isPoweredByTruodoit !== undefined) setIsPoweredByTruodoit(stateData.isPoweredByTruodoit);
      } else {
        // Try to load from localStorage as fallback
        const savedData = localStorage.getItem('invoiceData');
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            if (parsedData.clientDetails) setClientDetails(parsedData.clientDetails);
            if (parsedData.invoiceDetails) setInvoiceDetails(parsedData.invoiceDetails);
            if (parsedData.invoiceItems) setInvoiceItems(parsedData.invoiceItems);
            if (parsedData.notes) setNotes(parsedData.notes);
            if (parsedData.paymentDetails) setPaymentDetails(parsedData.paymentDetails);
            if (parsedData.isPoweredByTruodoit !== undefined) setIsPoweredByTruodoit(parsedData.isPoweredByTruodoit);
          } catch (error) {
            console.error('Error parsing saved invoice data:', error);
          }
        }
      }
    };

    loadInvoiceData();
    setDataLoaded(true);
    
    // Clear location state after loading to prevent re-loading on subsequent visits
    if (location.state) {
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  // Calculate totals
  const subtotal = invoiceItems.reduce((sum, item) => sum + (item.total || 0), 0);
  const taxRate = 18;
  const taxAmount = Math.round((subtotal * taxRate) / 100);
  const grandTotal = subtotal + taxAmount;

  // Handle form changes
  const handleClientChange = (e) => {
    setClientDetails({ ...clientDetails, [e.target.name]: e.target.value });
  };

  const handleInvoiceChange = (e) => {
    setInvoiceDetails({ ...invoiceDetails, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };
  
  // Handle invoice items
  const addInvoiceItem = () => {
    const newItem = {
      id: Date.now(),
      task: '',
      description: '',
      quantity: 1,
      rate: 0,
      total: 0
    };
    setInvoiceItems([...invoiceItems, newItem]);
  };

  const updateInvoiceItem = (id, field, value) => {
    setInvoiceItems(items => 
      items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rate') {
            updatedItem.total = (updatedItem.quantity || 0) * (updatedItem.rate || 0);
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const removeInvoiceItem = (id) => {
    setInvoiceItems(items => items.filter(item => item.id !== id));
  };

  // Handle preview navigation
  const handleGoToPreview = () => {
    // Validate required fields
    if (!clientDetails.name || !clientDetails.email) {
      alert('Please fill in at least Client Name and Email before previewing the invoice.');
      return;
    }

    const invoiceData = {
      clientDetails,
      invoiceDetails,
      invoiceItems,
      notes,
      paymentDetails,
      isPoweredByTruodoit
    };
    
    // Store data in localStorage as backup
    localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
    
    // Navigate to preview page with data
    navigate('/dashboard/invoice/preview', { state: invoiceData });
  };

  return (
    <div className="space-y-6">
      {/* //the title of the page is invoice */}
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">invoice</h1>
        {dataLoaded && location.state && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
            <p className="text-sm text-green-700">
              ✓ Data loaded from preview page
            </p>
          </div>
        )}
      </div> 

      {/* now taking Invoice Form - 2 Column Layout */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       
          <div>
            {/* client details starts here */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Client Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <input
                  type="text"
                  name="name"
                  value={clientDetails.name}
                  onChange={handleClientChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  value={clientDetails.company}
                  onChange={handleClientChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={clientDetails.email}
                  onChange={handleClientChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={clientDetails.phone}
                  onChange={handleClientChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
      </div>

          {/*  here you get the details of the invoice fields from here Right Column - Invoice Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Invoice Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice No.</label>
                <input
                  type="text"
                  name="invoiceNo"
                  value={invoiceDetails.invoiceNo}
                  onChange={handleInvoiceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter invoice number"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={invoiceDetails.date}
                    onChange={handleInvoiceChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  </div>
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={invoiceDetails.dueDate}
                    onChange={handleInvoiceChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  </div>
                </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select
                    name="currency"
                    value={invoiceDetails.currency}
                    onChange={handleInvoiceChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="₹">₹ (INR)</option>
                    <option value="$">$ (USD)</option>
                    <option value="€">€ (EUR)</option>
                  </select>
                  </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax Type</label>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setInvoiceDetails({...invoiceDetails, taxType: 'GST'})}
                      className={`px-4 py-2 text-sm font-medium rounded-md border-2 transition-all ${
                        invoiceDetails.taxType === 'GST'
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      GST
                    </button>
                    <button
                      type="button"
                      onClick={() => setInvoiceDetails({...invoiceDetails, taxType: 'VAT'})}
                      className={`px-4 py-2 text-sm font-medium rounded-md border-2 transition-all ${
                        invoiceDetails.taxType === 'VAT'
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      VAT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* here yo can enter the details of task about the description and quantity and rate and total of the bill  */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Task/Item</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Quantity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Rate</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Total</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={item.task}
                      onChange={(e) => updateInvoiceItem(item.id, 'task', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                      placeholder="Enter task/item"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateInvoiceItem(item.id, 'description', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                      placeholder="Enter description"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      value={item.quantity || ''}
                      onChange={(e) => updateInvoiceItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                      min="0"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      value={item.rate || ''}
                      onChange={(e) => updateInvoiceItem(item.id, 'rate', parseInt(e.target.value) || 0)}
                      className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                      min="0"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {invoiceDetails.currency}{(item.total || 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => removeInvoiceItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* here you can add the task of the bill  */}
        <div className="mt-4">
          <button
            onClick={addInvoiceItem}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
          >
            <Plus className="h-4 w-4" />
            <span>+ Add Task</span>
          </button>
        </div>

        {/* Subtotal */}
        <div className="mt-6 flex justify-end">
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">
              Subtotal: {invoiceDetails.currency}{subtotal.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Notes and Payment Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notes Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Enter any additional notes or terms..."
          />
        </div>

        {/* Payment Details Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={paymentDetails.bankName}
                onChange={handlePaymentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter bank name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={paymentDetails.accountNumber}
                onChange={handlePaymentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter account number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={paymentDetails.ifscCode}
                onChange={handlePaymentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter IFSC code"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder</label>
              <input
                type="text"
                name="accountHolder"
                value={paymentDetails.accountHolder}
                onChange={handlePaymentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter account holder name"
              />
            </div>
          </div>

          {/* Powered by Truodoit Toggle */}
          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Powered by Truodoit</span>
            <button
              type="button"
              onClick={() => setIsPoweredByTruodoit(!isPoweredByTruodoit)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isPoweredByTruodoit ? 'bg-red-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isPoweredByTruodoit ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Summary Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-end">
          <div className="text-right space-y-2">
            <div className="flex justify-between items-center w-64">
              <span className="text-gray-600 dark:text-gray-400">tax {taxRate}%</span>
              <span className="font-medium">{invoiceDetails.currency}{taxAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center w-64 text-lg font-bold">
              <span>Grand Total</span>
              <span>{invoiceDetails.currency}{grandTotal.toLocaleString()}</span>
            </div>
            <div className="pt-4">
              <button 
                onClick={handleGoToPreview}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Go to Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
