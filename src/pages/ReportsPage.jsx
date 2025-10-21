import React, { useState } from "react";
import { Calendar, Search, MoreVertical, Download } from "lucide-react";

const Reports = () => {
  const [startDate, setStartDate] = useState("2025-09-09");
  const [endDate, setEndDate] = useState("2025-09-28");

  const tasks = [
    { id: 1, title: "Reply to client", company: "XYZ Designs", status: "pending", priority: "High" },
    { id: 2, title: "Send Invoice", company: "XYZ Designs", status: "done", priority: "High" },
    { id: 3, title: "Submit Logo", company: "XYZ Designs", status: "pending", priority: "High" },
    { id: 4, title: "Send Invoice", company: "XYZ Designs", status: "pending", priority: "High" },
  ];

  return (
    <div className="min-h-screen bg-white p-6 text-gray-800">
      {/* Header */}
      <h2 className="text-xl font-semibold mb-4">Reports</h2>

      {/* Search + Client */}
      <div className="flex flex-wrap gap-3 items-center mb-5">
        <div className="flex items-center w-full sm:w-1/2 bg-gray-100 rounded-lg px-3 py-2">
          <Search className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search Users Here"
            className="bg-transparent focus:outline-none w-full text-sm"
          />
        </div>

        <select className="bg-gray-100 text-gray-700 text-sm rounded-lg px-3 py-2">
          <option>Select Client</option>
          <option>XYZ Designs</option>
          <option>ABC Studio</option>
        </select>
      </div>

      {/* Date Range */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-transparent focus:outline-none text-sm"
          />
          <Calendar size={18} className="text-gray-500" />
        </div>

        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-transparent focus:outline-none text-sm"
          />
          <Calendar size={18} className="text-gray-500" />
        </div>
      </div>

      {/* Tasks */}
      <h3 className="text-lg font-medium mb-3">Tasks</h3>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center bg-white border border-gray-200 shadow-sm rounded-lg px-4 py-3"
          >
            <div className="flex items-center gap-2">
              {task.status === "done" ? (
                <input type="checkbox" checked readOnly className="accent-green-500" />
              ) : (
                <input type="checkbox" className="accent-red-400" />
              )}
              <div>
                <p
                  className={`text-sm font-medium ${
                    task.status === "done" ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {task.title}
                </p>
                <p
                  className={`text-xs ${
                    task.status === "done" ? "text-green-500" : "text-yellow-500"
                  }`}
                >
                  {task.company}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-red-100 text-red-500 text-xs font-semibold px-3 py-1 rounded-full">
                {task.priority}
              </span>
              <MoreVertical size={16} className="text-gray-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Export Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button className="flex items-center gap-2 bg-red-100 text-red-500 text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-200 transition">
          <Download size={16} /> Export as CSV
        </button>
        <button className="flex items-center gap-2 bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-600 transition">
          <Download size={16} /> Export as PDF
        </button>
      </div>
    </div>
  );
};

export default Reports;
