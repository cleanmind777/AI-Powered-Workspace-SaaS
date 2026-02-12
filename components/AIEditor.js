"use client";
import { useState } from "react";
import Checklist from "./checklist";

export default function AIEditor() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAction = async (path) => {
    if (!text) return;
    setLoading(true);
    const res = await fetch(`/api/ai/${path}`, {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setText(data.result);
    setLoading(false);
  };

  
   return (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-4">

   
    <div className="w-200 h-75 bg-black rounded-xl shadow-sm border border-gray-200">
      
      <textarea
        className="w-full h-64 p-6 rounded-t-xl text-white text-lg"
        placeholder="Type here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-xl">
        <div className="flex gap-2">
          <button 
            onClick={() => handleAction("summarize")}
            className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-200 rounded-md transition"
          >
            Summarize
          </button>

          <button 
            onClick={() => handleAction("improve")}
            className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-200 rounded-md transition"
          >
            Improve
          </button>
        </div>

        <button 
          onClick={() => handleAction("generate")}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium bg-black text-white rounded-md hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Working..." : "Generate"}
        </button>
      </div>
    </div>

   
    <div className="h-8"></div>
    <Checklist />

  </div>
);

  
}