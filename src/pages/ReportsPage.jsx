import React, { useState } from "react";
import { Download, Calendar } from "lucide-react";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Reply to client",
      client: "XYZ Designs",
      priority: "High",
      date: "2025-09-10",
      completed: false,
    },
    {
      id: 2,
      title: "Send Invoice",
      client: "XYZ Designs",
      priority: "High",
      date: "2025-09-15",
      completed: true,
    },
    {
      id: 3,
      title: "Submit Logo",
      client: "XYZ Designs",
      priority: "High",
      date: "2025-09-20",
      completed: false,
    },
    {
      id: 4,
      title: "Send Invoice",
      client: "ABC Media",
      priority: "High",
      date: "2025-09-22",
      completed: false,
    },
  ]);

  // Filtered tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClient = selectedClient
      ? task.client === selectedClient
      : true;
    const matchesDate =
      (!startDate || task.date >= startDate) &&
      (!endDate || task.date <= endDate);
    return matchesSearch && matchesClient && matchesDate;
  });

  // CSV Export
  const exportCSV = () => {
    const csvRows = [
      ["Task", "Client", "Priority", "Date", "Status"],
      ...filteredTasks.map((t) => [
        t.title,
        t.client,
        t.priority,
        t.date,
        t.completed ? "Completed" : "Pending",
      ]),
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
    printWindow.document.write("<h2>Task Report</h2>");
    printWindow.document.write("<table border='1' cellspacing='0' cellpadding='5'>");
    printWindow.document.write("<tr><th>Task</th><th>Client</th><th>Priority</th><th>Date</th><th>Status</th></tr>");
    filteredTasks.forEach((t) => {
      printWindow.document.write(
        `<tr>
          <td>${t.title}</td>
          <td>${t.client}</td>
          <td>${t.priority}</td>
          <td>${t.date}</td>
          <td>${t.completed ? "Completed" : "Pending"}</td>
        </tr>`
      );
    });
    printWindow.document.write("</table>");
    printWindow.print();
  };

  // Unique clients
  const clients = [...new Set(tasks.map((t) => t.client))];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-full mx-auto">
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
          {clients.map((client, index) => (
            <option key={index} value={client}>
              {client}
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
      <h2 className="text-xl font-medium mt-6 mb-3">Tasks</h2>
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center bg-gray-50 rounded-xl p-4 border"
            >
              <div>
                <p
                  className={`text-lg ${
                    task.completed ? "line-through text-gray-500" : "text-black"
                  }`}
                >
                  {task.title}
                </p>
                <p
                  className={`text-sm ${
                    task.completed
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {task.client} • {task.date}
                </p>
              </div>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                {task.priority}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-5">No tasks found.</p>
        )}
      </div>

      {/* Export Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={exportCSV}
          className="bg-red-100 text-red-600 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-red-200"
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
    </div>
  );
};

export default Reports;
