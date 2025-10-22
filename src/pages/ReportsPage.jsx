import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Search, Calendar, CheckCircle, Clock, AlertTriangle, MoreVertical, FileText, Download, Users, ChevronUp } from "lucide-react";

const Reports = () => {
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
  

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const taskListRef = useRef(null);

  // Handle scroll to show/hide scroll-to-top button
  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const scrollHeight = e.target.scrollHeight;
    const clientHeight = e.target.clientHeight;
    
    setShowScrollTop(scrollTop > 100);
    setShowScrollIndicator(scrollHeight > clientHeight);
  };

  // Scroll to top function
  const scrollToTop = () => {
    if (taskListRef.current) {
      taskListRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
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





  // CSV Export using filteredTasks
  const exportCSV = () => {
    const csvRows = [
      ["Task", "Client", "Priority", "Due Date", "Status", "Description", "Notes", "Completed Date"],
      ...filteredTasks.map((t) => [
        t.title,
        getClientName(t.clientId),
        t.priority,
        t.dueDate || t.date,
        t.status === 'completed' ? "Completed" : "Pending",
        t.description || "",
        t.notes || "",
        t.completedDate || "",
      ]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "tasks_report.csv";
    link.click();
  };

  // PDF export lightweight
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
            th { background-color: #f2f2f2; font-weight: bold; }
            .completed { text-decoration: line-through; color: #666; }
            .task-details { margin: 10px 0; padding: 10px; background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h2>Task Report</h2>
    `);
    
    filteredTasks.forEach((t) => {
      printWindow.document.write(`
        <div class="task-details">
          <h3 class="${t.status === 'completed' ? 'completed' : ''}">${t.title}</h3>
          <p><strong>Client:</strong> ${getClientName(t.clientId)}</p>
          <p><strong>Priority:</strong> ${t.priority}</p>
          <p><strong>Due Date:</strong> ${t.dueDate || t.date}</p>
          <p><strong>Status:</strong> ${t.status === 'completed' ? "Completed" : "Pending"}</p>
          ${t.description ? `<p><strong>Description:</strong> ${t.description}</p>` : ''}
          ${t.notes ? `<p><strong>Notes:</strong> ${t.notes}</p>` : ''}
          ${t.completedDate ? `<p><strong>Completed Date:</strong> ${t.completedDate}</p>` : ''}
        </div>
      `);
    });
    
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };


  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-full mx-auto overflow-y-auto max-h-screen">
      <h1 className="text-2xl font-semibold mb-5">Reports</h1>

      {/* Combined Search + Client Select */}
      <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden border border-gray-300">
        <input
          type="text"
          placeholder="Search Users Here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-3 bg-transparent outline-none text-gray-700"
        />
      <div></div>
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="bg-white border-l border-gray-300 p-1 rounded-md mr-5 outline-none text-gray-700"
        >
          <option value="">Select Client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range */}
      <h1 className="font-medium mt-5">Set Date Range</h1>
      <div className="flex gap-4 mt-3">
        <div className="flex items-center bg-gray-100 rounded-xl p-2 w-1/2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="flex-1 p-2 bg-transparent outline-none"
          />
        </div>

        <div className="flex items-center bg-gray-100 rounded-xl p-2 w-1/2">
          <Calendar className="text-gray-500 ml-2" size={20} />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="flex-1 p-2 bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Task Section */}
      <div className="flex items-center justify-between mt-6 mb-3">
        <h2 className="text-xl font-medium">Tasks</h2>
        {filteredTasks.length > 0 && (
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>
      <div 
        ref={taskListRef}
        onScroll={handleScroll}
        className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 pr-2"
      >
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center bg-gray-50 rounded-xl p-4 border"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p
                    className={`text-lg font-medium ${
                      task.status === 'completed' ? "line-through text-gray-500" : "text-black"
                    }`}
                  >
                    {task.title}
                  </p>
                  {task.status === 'completed' && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      <strong>Client:</strong> {getClientName(task.clientId)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className={`${
                      task.status === 'completed' ? "text-green-600" : "text-gray-600"
                    }`}>
                      <strong>Due:</strong> {task.dueDate || task.date}
                    </span>
                  </div>
                  
                  {task.description && (
                    <div className="flex items-start gap-2 md:col-span-2">
                      <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
                      <span className="text-gray-600">
                        <strong>Description:</strong> {task.description}
                      </span>
                    </div>
                  )}
                  
                  {task.status === 'completed' && task.completedDate && (
                    <div className="flex items-center gap-2 md:col-span-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-green-600">
                        <strong>Completed:</strong> {task.completedDate}
                      </span>
                    </div>
                  )}
                  
                  {task.notes && (
                    <div className="flex items-start gap-2 md:col-span-2">
                      <AlertTriangle className="h-4 w-4 text-gray-400 mt-0.5" />
                      <span className="text-gray-600">
                        <strong>Notes:</strong> {task.notes}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                {task.priority}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-5">No tasks found.</p>
        )}
        
        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <div className="text-center py-2">
            <div className="inline-flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
              <span>Scroll for more tasks</span>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            </div>
          </div>
        )}
      </div>

      {/* Export Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={exportCSV}
          className="flex items-center space-x-2 px-4 py-2 text-black rounded-lg transition-colors"
          style={{ backgroundColor: '#F5C4BF' }}
        >
          <Download size={18} /> Export as CSV
        </button>
        <button
          onClick={exportPDF}
          className="bg-red-100 text-red-600 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-red-200"
        >
          <Download size={18} /> Export as PDF
        </button>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
          title="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Reports;