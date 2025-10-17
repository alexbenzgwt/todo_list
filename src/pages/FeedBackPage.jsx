import React, { useState } from "react";

const FeedbackPage = () => {
  const [priority, setPriority] = useState("Select Priority");
  const [rating, setRating] = useState({
    performance: 0,
    ui: 0,
    stability: 0,
  });

  const handleRating = (key, value) => {
    setRating({ ...rating, [key]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-5xl">
        {/* --- Feedback Header --- */}
        <h1 className="text-[20px] font-semibold text-gray-800 mb-6">Feedback</h1>

        {/* --- Issue Type --- */}
        <div className="mb-8">
          <p className="text-[16px] font-medium mb-3">Issue Type</p>
          <div className="flex flex-wrap gap-4">
            {["Bug Report", "Feature Request", "Enhancement", "General"].map((item, i) => (
              <button
                key={i}
                className="flex items-center justify-center gap-2 w-[180px] h-[44px] border border-gray-300 rounded-lg hover:border-[#E04131] hover:text-[#E04131] transition"
              >
                <span>⚙️</span>
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* --- Select Priority --- */}
        <div className="flex justify-end mb-8">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:border-[#E04131]"
          >
            <option>Select Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>

        {/* --- Issue Summary --- */}
        <div className="mb-8">
          <p className="text-[16px] font-medium mb-2">Issue Summary</p>
          <input
            type="text"
            placeholder="Brief description of the issue..."
            className="w-full h-[44px] border border-gray-300 rounded-lg px-4 focus:outline-none focus:border-[#E04131]"
          />
        </div>

        {/* --- Detailed Description --- */}
        <div className="mb-8">
          <p className="text-[16px] font-medium mb-2">Detailed Description</p>
          <textarea
            placeholder="Expected Behaviour:\nActual Behaviour:"
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#E04131] resize-none"
          ></textarea>
        </div>

        {/* --- System Rating --- */}
        <div className="mb-8">
          <p className="text-[16px] font-medium mb-4">System Rating</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { key: "performance", label: "Overall Performance" },
              { key: "ui", label: "User Interface" },
              { key: "stability", label: "Stability" },
            ].map(({ key, label }) => (
              <div key={key} className="border rounded-lg py-4 flex flex-col items-center">
                <p className="font-medium mb-2 text-gray-700">{label}</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleRating(key, num)}
                      className={`text-[22px] ${
                        rating[key] >= num ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Attachments --- */}
        <div className="mb-10">
          <p className="text-[16px] font-medium mb-3">Attachments</p>
          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-[129px] cursor-pointer hover:border-[#E04131] transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#E04131"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="none"
              className="w-12 h-12 mb-2"
            >
              <path d="M4 13v6a2 2 0 002 2h12a2 2 0 002-2v-6M16 9l-4-4m0 0L8 9m4-4v12" />
            </svg>
            <p className="text-gray-500">
              Drop files here or{" "}
              <span className="text-[#E04131] font-medium">click to select</span>
            </p>
            <input id="fileUpload" type="file" multiple className="hidden" />
          </label>
        </div>

        {/* --- Buttons --- */}
        <div className="flex justify-end gap-4">
          <button className="bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-lg hover:bg-gray-300 transition">
            Save Draft
          </button>
          <button className="bg-[#E04131] text-white font-medium py-2 px-6 rounded-lg hover:bg-[#c23224] transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
