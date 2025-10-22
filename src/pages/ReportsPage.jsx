import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Download, Calendar, ChevronDown, ChevronUp } from "lucide-react";

/**
 * Helper: Try many possible date fields and parse to a readable string.
 * - Looks for common keys (date, dueDate, created_at, createdAt, startDate, etc.)
 * - Scans any key containing "date" or "time" if explicit keys not found
 * - Handles number (epoch ms or s), ISO strings, yyyy-mm-dd, or other parseable strings
 */
function getTaskDateRaw(task) {
  if (!task || typeof task !== "object") return null;

  // explicit keys to try first (common names)
  const explicitKeys = [
    "date", "dueDate", "due_date", "due_date", "due_date_time",
    "created_at", "createdAt", "created", "taskDate", "task_date",
    "startDate", "start_date", "updated_at", "timestamp", "time"
  ];

  for (const key of explicitKeys) {
    if (key in task && task[key] != null && task[key] !== "") {
      return task[key];
    }
  }

  // fallback: any key containing 'date' or 'time'
  const keys = Object.keys(task);
  for (const k of keys) {
    if (/date|time/i.test(k) && task[k] != null && task[k] !== "") {
      return task[k];
    }
  }

  // no date-like field found
  return null;
}

function formatTaskDate(value) {
  if (value == null || value === "") return null;

  // If it's already a Date
  if (value instanceof Date && !isNaN(value)) {
    return value.toLocaleDateString();
  }

  // If number: could be seconds or milliseconds
  if (typeof value === "number") {
    // Heuristic: if seconds (10 digits) multiply by 1000
    const asMs = value < 1e12 ? value * 1000 : value;
    const d = new Date(asMs);
    if (!isNaN(d)) return d.toLocaleDateString();
    return null;
  }

  // If string: try to parse ISO-like or yyyy-mm-dd first
  if (typeof value === "string") {
    const s = value.trim();

    // common yyyy-mm-dd or yyyy/mm/dd
    const plainDateMatch = s.match(/^(\d{4})[-/](\d{2})[-/](\d{2})/);
    if (plainDateMatch) {
      const d = new Date(s);
      if (!isNaN(d)) return d.toLocaleDateString();
    }

    // try Date parse (handles full ISO like 2025-10-21T12:00:00Z)
    const parsed = new Date(s);
    if (!isNaN(parsed)) return parsed.toLocaleDateString();

    // If string contains epoch digits
    const digitsMatch = s.match(/\d{10,13}/);
    if (digitsMatch) {
      const num = Number(digitsMatch[0]);
      const asMs = num < 1e12 ? num * 1000 : num;
      const d = new Date(asMs);
      if (!isNaN(d)) return d.toLocaleDateString();
    }

    // not parseable
    return null;
  }

  return null;
}

const Reports = () => {
  // Use your real tasks from Redux (your created tasks)
  const tasks = useSelector((state) => state.tasks.tasks || []);
  

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expandedTask, setExpandedTask] = useState(null);

  // prepare clients from your real tasks
  const clients = [...new Set((tasks || []).map((t) => t.client).filter(Boolean))];

  // Filter tasks by search/client/date range
  const filteredTasks = (tasks || []).filter((task) => {
    const matchesSearch =
      !searchTerm ||
      (task.title && task.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.client && task.client.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesClient = !selectedClient || (task.client === selectedClient);

    // get raw date value and normalized ISO for comparisons
    const rawDate = getTaskDateRaw(task);
    const parsedDate = formatTaskDate(rawDate); // e.g. "10/21/2025" or locale
    // For comparison, convert startDate/endDate (YYYY-MM-DD inputs) and the task raw into YYYY-MM-DD
    const toYMD = (val) => {
      if (!val) return null;
      // if val is already yyyy-mm-dd
      if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
      // try parse Date
      const parsed = new Date(val);
      if (isNaN(parsed)) return null;
      // get YYYY-MM-DD in local tz
      const yyyy = parsed.getFullYear();
      const mm = String(parsed.getMonth() + 1).padStart(2, "0");
      const dd = String(parsed.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    };

    const taskYMD = toYMD(rawDate);
    const matchesDateRange =
      (!startDate || (taskYMD && taskYMD >= startDate)) &&
      (!endDate || (taskYMD && taskYMD <= endDate));

    return matchesSearch && matchesClient && matchesDateRange;
  });

  // CSV Export using filteredTasks
  const exportCSV = () => {
    const csvRows = [
      ["Task", "Client", "Priority", "Date", "Status"],
      ...filteredTasks.map((t) => [
        t.title || "",
        t.client || "",
        t.priority || "",
        // format date for CSV using formatTaskDate
        formatTaskDate(getTaskDateRaw(t)) || "",
        t.completed ? "Completed" : (t.status || "Pending" || "")
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
    printWindow.document.write("<h2>Task Report</h2>");
    printWindow.document.write("<table border='1' cellspacing='0' cellpadding='5'>");
    printWindow.document.write("<tr><th>Task</th><th>Client</th><th>Priority</th><th>Date</th><th>Status</th></tr>");
    filteredTasks.forEach((t) => {
      printWindow.document.write(
        `<tr>
          <td>${t.title || ""}</td>
          <td>${t.client || ""}</td>
          <td>${t.priority || ""}</td>
          <td>${formatTaskDate(getTaskDateRaw(t)) || "No date"}</td>
          <td>${t.completed ? "Completed" : (t.status || "Pending")}</td>
        </tr>`
      );
    });
    printWindow.document.write("</table>");
    printWindow.print();
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full mx-auto">
      <h1 className="text-2xl font-semibold mb-5">Reports</h1>

      {/* Search & Client */}
      <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden border border-gray-300">
        <input
          type="text"
          placeholder="Search your tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-3 bg-transparent outline-none text-gray-700"
        />
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="bg-white border-l border-gray-300 p-2 outline-none text-gray-700"
        >
          <option value="">Select Client</option>
          {clients.map((client, idx) => (
            <option key={idx} value={client}>
              {client}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range */}
      <h2 className="font-medium mt-5">Set Date Range</h2>
      <div className="flex gap-4 mt-3">
        <div className="flex items-center bg-gray-100 rounded-xl p-2 w-1/2">
          <Calendar className="text-gray-500 ml-2" size={20} />
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

      {/* Tasks List */}
      <h2 className="text-lg font-semibold mt-8 mb-4">Your Tasks</h2>
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            const raw = getTaskDateRaw(task);
            const formatted = formatTaskDate(raw);
            return (
              <div
                key={task.id}
                className="border rounded-xl p-4 bg-gray-50 hover:shadow-md transition cursor-pointer"
                onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">{task.title || "Untitled"}</h3>
                    <p className="text-sm text-gray-500">
                      {task.client || task.clientName || task.client_name || (task.client && task.client.name) || "No client"}
                    </p>

                  </div>
                  <div>
                    {expandedTask === task.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {expandedTask === task.id && (
                  <div className="mt-3 text-sm text-gray-700 space-y-1">
                    <p><span className="font-medium">Priority:</span> {task.priority || "—"}</p>
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {formatted || (() => {
                        // If no formatted date, log the task once to help debugging
                        console.warn("Task missing date — inspect object:", task);
                        return "No date";
                      })()}
                    </p>
                    <p><span className="font-medium">Status:</span> {task.completed ? "✅ Completed" : (task.status || "Pending")}</p>
                    <p><span className="font-medium">Description:</span> {task.description || "—"}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm">No tasks found.</p>
        )}
      </div>

      {/* Export Buttons */}
      <div className="flex justify-end gap-3 mt-8">
        <button
          onClick={exportCSV}
          className="bg-red-100 text-red-600 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-red-200"
        >
          <Download size={18} /> Export CSV
        </button>
        <button
          onClick={exportPDF}
          className="bg-red-100 text-red-600 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-red-200"
        >
          <Download size={18} /> Export PDF
        </button>
      </div>
    </div>
  );
};

export default Reports;
