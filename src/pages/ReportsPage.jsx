import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Search, Calendar, CheckCircle, Clock, AlertTriangle, MoreVertical, FileText, Download } from "lucide-react";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Get data from Redux store
  const { tasks = [] } = useSelector((state) => state.tasks);
  const { clients = [] } = useSelector((state) => state.clients);

  // Helper function to get client name
  const getClientName = (clientId) => {
    if (!clientId) {
      return 'No Client';
    }
    
    const numericClientId = typeof clientId === 'string' ? parseInt(clientId) : clientId;
    
    if (!clients || clients.length === 0) {
      return 'Loading...';
    }
    
    const client = clients.find(c => c.id === numericClientId);
    return client ? client.name : 'Unknown Client';
  };


  // Filtered tasks
  const filteredTasks = tasks.filter((task) => {
    const clientName = getClientName(task.clientId);
    
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClient = selectedClient
      ? task.clientId === parseInt(selectedClient) || task.clientId === selectedClient
      : true;
    const matchesDate = (() => {
      if (!startDate && !endDate) return true;
      
      const taskDate = task.dueDate || task.date;
      if (!taskDate) return true;
      
      const taskDateObj = new Date(taskDate);
      const startDateObj = startDate ? new Date(startDate) : null;
      const endDateObj = endDate ? new Date(endDate) : null;
      
      if (startDateObj && taskDateObj < startDateObj) return false;
      if (endDateObj && taskDateObj > endDateObj) return false;
      
      return true;
    })();
    
    return matchesSearch && matchesClient && matchesDate;
  });

  // If no tasks found, show a message

  // Group tasks by client
  const groupedTasks = filteredTasks.reduce((acc, task) => {
    const clientName = getClientName(task.clientId);
    if (!acc[clientName]) {
      acc[clientName] = [];
    }
    acc[clientName].push(task);
    return acc;
  }, {});


  // State for expanded clients - expand all by default
  const [expandedClients, setExpandedClients] = useState(new Set());
  const hasExpandedRef = useRef(false);

  // Expand all clients by default when tasks are loaded
  useEffect(() => {
    if (Object.keys(groupedTasks).length > 0 && !hasExpandedRef.current) {
      setExpandedClients(new Set(Object.keys(groupedTasks)));
      hasExpandedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, clients]);

  const toggleClientExpansion = (clientName) => {
    const newExpanded = new Set(expandedClients);
    if (newExpanded.has(clientName)) {
      newExpanded.delete(clientName);
    } else {
      newExpanded.add(clientName);
    }
    setExpandedClients(newExpanded);
  };

  // CSV Export
  const exportCSV = () => {
    const csvRows = [
      ["Client", "Task", "Priority", "Due Date", "Status"],
      ...Object.entries(groupedTasks).flatMap(([clientName, clientTasks]) =>
        clientTasks.map((t) => [
          clientName,
          t.title,
          t.priority,
          t.dueDate,
          t.status === 'completed' ? "Completed" : "Pending",
        ])
      ),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = csvContent;
    link.download = "tasks_report.csv";
    link.click();
  };

  // PDF Export
  const exportPDF = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Task Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .completed { text-decoration: line-through; color: #666; }
          </style>
        </head>
        <body>
          <h2>Task Report</h2>
          ${Object.entries(groupedTasks).map(([clientName, clientTasks]) => `
            <h3>${clientName}</h3>
            <table>
              <tr>
                <th>Task</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
              ${clientTasks.map((t) => `
                <tr>
                  <td class="${t.status === 'completed' ? 'completed' : ''}">${t.title}</td>
                  <td>${t.priority}</td>
                  <td>${t.dueDate}</td>
                  <td>${t.status === 'completed' ? "Completed" : "Pending"}</td>
                </tr>
              `).join('')}
            </table>
          `).join('')}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Unique clients from Redux store

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500 text-white';
      case 'Medium': return 'bg-orange-500 text-white';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-900">Reports</h1>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Users Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900 placeholder-gray-500"
          />
        </div>
        
        {/* Client Select */}
        <div className="flex-1 sm:flex-none sm:w-48">
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900"
          >
            <option value="">All Clients</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Date Range Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Set Date Range</label>
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900"
            />
          </div>
          <div className="flex-1">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Task Section */}
      {/* Grouped Tasks by Client */}
      {Object.keys(groupedTasks).length > 0 ? (
        Object.entries(groupedTasks).map(([clientName, clientTasks]) => (
          <div key={clientName} className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            {/* Client Header - Clickable */}
            <div 
              className="px-6 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleClientExpansion(clientName)}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">{clientName}</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {clientTasks.length} task{clientTasks.length !== 1 ? 's' : ''}
                  </span>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedClients.has(clientName) ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Task List - Collapsible */}
            {expandedClients.has(clientName) && (
              <div className="divide-y divide-gray-200">
                {clientTasks.map((task) => (
                  <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      {/* Checkbox */}
                      <div className="flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={task.status === 'completed'}
                          readOnly
                          className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500 accent-red-600"
                          style={{
                            accentColor: '#dc2626'
                          }}
                        />
                      </div>
                      
                      {/* Task Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-base font-medium truncate ${
                              task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'
                            }`}>
                              {task.title}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              {task.status === 'completed' ? (
                                <>
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span className="text-sm text-green-600">
                                    Completed on {task.completedDate}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Clock className="h-4 w-4 text-orange-500" />
                                  <span className="text-sm text-gray-500">
                                    Due {task.dueDate}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          
                          {/* Priority and Actions */}
                          <div className="flex items-center space-x-2 ml-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            
                            {/* More Options Menu */}
                            <button
                              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                              title="More options"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 text-center text-gray-500">
            <p className="text-sm">
              {tasks.length === 0 
                ? "No tasks available. Please add some tasks first." 
                : "No tasks found matching your criteria. Try adjusting your search or filters."
              }
            </p>
            {tasks.length > 0 && (
              <div className="mt-2 text-xs text-gray-400">
                <p>Total tasks in system: {tasks.length}</p>
                <p>Filtered tasks: {filteredTasks.length}</p>
                {selectedClient && (
                  <p>Selected client ID: {selectedClient}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Export Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          onClick={exportCSV}
          className="flex items-center space-x-2 px-4 py-2 text-black rounded-lg transition-colors"
          style={{ backgroundColor: '#F5C4BF' }}
        >
          <FileText className="h-4 w-4" />
          <span>Export as CSV</span>
        </button>
          <button
            onClick={exportPDF}
            className="flex items-center space-x-2 px-4 py-2 text-black rounded-lg transition-colors"
            style={{ backgroundColor: '#F5C4BF' }}
          >
            <Download className="h-4 w-4" />
            <span>Export as PDF</span>
          </button>
      </div>
    </div>
  );
};

export default Reports;