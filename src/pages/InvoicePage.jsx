import { FileText, Plus, Download, Eye } from 'lucide-react';

const InvoicePage = () => {
  const invoices = [
    { id: 1, client: 'ABC Designs', amount: '$2,500', date: '2024-01-15', status: 'Paid' },
    { id: 2, client: 'Tech Solutions Inc', amount: '$1,800', date: '2024-01-12', status: 'Pending' },
    { id: 3, client: 'Creative Agency', amount: '$3,200', date: '2024-01-10', status: 'Paid' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Create Invoice</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Invoice #{invoice.id}</h3>
                    <p className="text-sm text-gray-500">{invoice.client}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">{invoice.amount}</p>
                    <p className="text-sm text-gray-500">{invoice.date}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    invoice.status === 'Paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {invoice.status}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
