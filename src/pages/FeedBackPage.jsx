import React, { useState } from "react";
import { MdOutlineReportProblem } from "react-icons/md";
import { VscExpandAll, VscTools } from "react-icons/vsc";
import { LuFilePen } from "react-icons/lu";

const FeedbackPage = () => {
  const [priority, setPriority] = useState("Select Priority");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState({
    step1: "",
    step2: "",
    expected: "",
    actual: "",
  });
  const [files, setFiles] = useState([]);
  const [rating, setRating] = useState({
    performance: 0,
    ui: 0,
    stability: 0,
  });
  const [errors, setErrors] = useState({});

  const issueTypes = [
    { name: "Bug Report", icon: <MdOutlineReportProblem className="w-6 h-6" /> },
    { name: "Feature Request", icon: <VscExpandAll className="w-6 h-6" /> },
    { name: "Enhancement", icon: <VscTools className="w-6 h-6" /> },
    { name: "General", icon: <LuFilePen className="text-gray-500 w-6 h-6" /> },
  ];

  const handleSelect = (type) => setSelectedIssue(type);

  const handleRating = (key, num) => {
    setRating((prev) => ({
      ...prev,
      [key] : num,
      // [key]: prev[key] === num ? num - 1 : num,
    }));
  };

  const handleFileChange = (e) => setFiles(Array.from(e.target.files));

  const validateForm = () => {
    const newErrors = {};

    if (!selectedIssue) newErrors.issue = "Please select an issue type.";
    if (priority === "Select Priority") newErrors.priority = "Please select priority.";
    if (!summary.trim()) newErrors.summary = "Please enter an issue summary.";
    if (!description.step1.trim() && !description.step2.trim())
      newErrors.description = "Please describe at least one step.";
    if (!description.expected.trim()) newErrors.expected = "Please describe expected behavior.";
    if (!description.actual.trim()) newErrors.actual = "Please describe actual behavior.";

    if (!rating.performance || !rating.ui || !rating.stability)
      newErrors.rating = "Please rate all three categories.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("✅ Feedback submitted successfully!");
      console.log({
        selectedIssue,
        priority,
        summary,
        description,
        rating,
        files,
      });
    } else {
      alert("❌ Please fill the above details before submitting.");
    }
  };

  const handleReset = () => {
    setPriority("Select Priority");
    setSelectedIssue("");
    setSummary("");
    setDescription({ step1: "", step2: "", expected: "", actual: "" });
    setRating({ performance: 0, ui: 0, stability: 0 });
    setFiles([]);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-white lg:px-4 py-5">
      <div className="rounded-xl p-2 w-full max-w-7xl">
        <h1 className="text-[28px] font-semibold text-gray-800 mb-6">Feedback</h1>

        <div className="p-4 border-2 rounded-md border-gray-300">
          <p className="text-[24px] font-semibold mb-3">Issue Type</p>
          <div className="flex flex-wrap gap-6">
            {issueTypes.map(({ name, icon }) => (
              <button
                key={name}
                onClick={() => handleSelect(name)}
                className={`flex items-center justify-center gap-2 w-[180px] h-[44px] rounded-lg transition ${
                  selectedIssue === name
                    ? "bg-[#E04131] text-white"
                    : "bg-[#F2F2F266] hover:border-[#E04131] hover:text-[#E04131]"
                }`}
              >
                {icon} {name}
              </button>
            ))}
          </div>
          {errors.issue && <p className="text-red-500 mt-2">{errors.issue}</p>}

          <div className="flex justify-end mt-4">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="px-4 py-2 font-medium text-gray-700 rounded-md focus:outline-none focus:border-[#E04131]"
            >
              <option>Select Priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
          {errors.priority && <p className="text-red-500 mt-2">{errors.priority}</p>}
        </div>

        <div className="mb-8 border border-gray-300 mt-8 p-4 rounded-md">
          <p className="text-[24px] font-semibold mb-3">Issue Summary</p>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Brief description of the issue..."
            className="w-full h-[44px] bg-[#F2F2F266] placeholder-[#343434] rounded-md px-4 focus:outline-none focus:border-[#E04131]"
          />
          {errors.summary && <p className="text-red-500 mt-2">{errors.summary}</p>}
        </div>

        <div className="mb-8 border border-gray-300 mt-8 p-4 rounded-md">
          <p className="text-[24px] font-semibold mb-3">Detailed Description</p>
          {["step1", "step2"].map((step, i) => (
            <div key={step} className="flex h-6 mb-5">
              <p className="font-medium mr-2">{i + 1}.</p>
              <textarea
                className="w-full rounded-md px-3 resize-none focus:outline-none focus:border-[#E04131]"
                rows={2}
                value={description[step]}
                onChange={(e) => setDescription({ ...description, [step]: e.target.value })}
              />
            </div>
          ))}
          <div className="flex items-baseline">
            <p className="font-medium w-43">Expected Behavior:</p>
            <textarea
              className="w-full rounded-md px-3 resize-none focus:outline-none focus:border-[#E04131]"
              rows={2}
              value={description.expected}
              onChange={(e) => setDescription({ ...description, expected: e.target.value })}
            />
          </div>
          {errors.expected && <p className="text-red-500 ">{errors.expected}</p>}

          <div className="flex items-baseline">
            <p className="font-medium w-35">Actual Behavior:</p>
            <textarea
              className="w-full rounded-md px-3 resize-none focus:outline-none focus:border-[#E04131]"
              rows={2}
              value={description.actual}
              onChange={(e) => setDescription({ ...description, actual: e.target.value })}
            />
          </div>
          {errors.actual && <p className="text-red-500">{errors.actual}</p>}
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
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleRating(key, num)}
                      type="button"
                      className={`text-[45px] ${
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
          {errors.rating && <p className="text-red-500 mt-2">{errors.rating}</p>}
        </div>

        <div className="mb-8 border-2 border-gray-300 p-4 rounded-md">
          <p className="text-[24px] font-semibold mb-3">Attachments</p>
          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center border-gray-300 rounded-lg h-[129px] cursor-pointer hover:border-[#E04131] transition"
          >
            <img src="/FileImg.png" alt="" />
            <p className="text-gray-500">
              Drop files here or{" "}
              <span className="text-[#E04131] font-medium">click to select</span>
            </p>
            <input id="fileUpload" type="file" multiple className="hidden" onChange={handleFileChange} />
          </label>
          {files.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600">
              {files.map((f, i) => (
                <li key={i}>{f.name}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleReset}
            className="border border-[#E04131] text-gray-700 font-medium py-2 px-6 rounded-lg  transition"
          >
            Reset
          </button>
          <button
            type="button"
            className="border border-[#E04131] text-gray-700 font-medium py-2 px-6 rounded-lg  transition"
          >
            Save Draft
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#E04131] text-white font-medium py-2 px-6 rounded-lg hover:bg-[#c23224] transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
