import React, { useState } from "react";
import { MdOutlineReportProblem } from "react-icons/md";
import { VscExpandAll } from "react-icons/vsc";
import { VscTools } from "react-icons/vsc";
import { LuFilePen } from "react-icons/lu";


const FeedbackPage = () => {
  const [priority, setPriority] = useState("Select Priority");
  const [rating, setRating] = useState({
    performance: 0,
    ui: 0,
    stability: 0,
  });

  const issueTypes = [
  {
    name: "Bug Report",
    icon: <MdOutlineReportProblem className=" w-6 h-6" />,
  },
  {
    name: "Feature Request",
    icon: <VscExpandAll className=" w-6 h-6" />,
  },
  {
    name: "Enhancement",
    icon: <VscTools className=" w-6 h-6" />,
  },
  {
    name: "General",
    icon: <LuFilePen className="text-gray-500 w-6 h-6" />,
  },
];


  const handleRating = (key, value) => {
    setRating({ ...rating, [key]: value });
  };

  return (
    <div className="min-h-screen bg-white lg:px-4 py-5">
      <div className="rounded-xl p-2 w-full max-w-7xl">
        <h1 className="text-[28px] font-semibold text-gray-800 mb-6">Feedback</h1>

        <div className=" p-4 border-2 rounded-md border-gray-300">
        <div className="mb-1 ">
          <p className="text-[24px] font-semibold mb-3">Issue Type</p>
          <div className="flex flex-wrap gap-6">
  {issueTypes.map((item, i) => (
    <button
      key={i}
      className="flex items-center justify-center gap-2 w-[180px] h-[44px] bg-[#F2F2F266] rounded-lg hover:border-[#E04131] hover:text-[#E04131] transition"
    >
      <span>{item.icon}</span>
      {item.name}
    </button>
  ))}
</div>

        </div>

        <div className="flex justify-end">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-4 py-2 font-medium text-gray-700 focus:outline-none focus:border-[#E04131]"
          >
            <option className="">Select Priority</option>
            <option type="radio">Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>
        </div>

        <div className="mb-8 border border-gray-300 mt-8 p-4 rounded-md">
          <p className="text-[24px] font-semibold mb-3">Issue Summary</p>
          <input
            type="text"
            placeholder="Brief description of the issue..."
            className="w-full h-[44px] bg-[#F2F2F266] placeholder-[#343434] rounded-md px-4 focus:outline-none focus:border-[#E04131]"
          />
        </div>

        <div className="mb-8 border border-gray-300 mt-8 p-4 rounded-md">
          <p className="text-[24px] font-semibold mb-3">Detailed Description</p>
          <div className="w-full bg-[#F2F2F266] rounded-lg px-4 py-2 focus:outline-none focus:border-[#E04131] resize-none">
            <p className="font-medium mb-3">1.<input type="text" border="none" /></p>
            <p className="font-medium mb-3">2.</p>
            <p className="font-medium mb-3">Expected Behavior:</p>
            <p className="font-medium mb-3">Actual Behavior:</p> 
           
        </div> 
        </div>

        <div className="mb-8 border border-gray-300 mt-8 p-4 rounded-md">
          <p className="text-[24px] font-semibold mb-3">System Rating</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { key: "performance", label: "Overall Performance" },
              { key: "ui", label: "User Interface" },
              { key: "stability", label: "Stability" },
            ].map(({ key, label }) => (
              <div key={key} className="border rounded-lg py-4 flex flex-col items-center">
                <p className="font-medium mb-2 text-gray-700">{label}</p>
                <div className="flex gap-8">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleRating(key, num)}
                      className={`text-[40px] ${
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

        <div className="mb-8 border-2 border-gray-300 p-4 rounded-md">
          <p className="text-[24px] font-semibold mb-3">Attachments</p>
          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center  border-gray-300 rounded-lg h-[129px] cursor-pointer hover:border-[#E04131] transition"
          ><img src="../src/assets/Fileimg.png" alt="" /> 
            <p className="text-gray-500">
              Drop files here or{" "}
              <span className="text-[#E04131] font-medium">click to select</span>
            </p>
            <input id="fileUpload" type="file" multiple className="hidden" />
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <button className="border border-[#E04131] text-gray-700 font-medium py-2 px-6 rounded-lg hover:bg-gray-300 transition">
            Reset
          </button>
          <button className="border border-[#E04131] text-gray-700 font-medium py-2 px-6 rounded-lg hover:bg-gray-300 transition">
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
