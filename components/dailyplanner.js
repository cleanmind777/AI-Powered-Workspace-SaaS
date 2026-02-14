"use client";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, getDocs, orderBy, query, deleteDoc, doc } from "firebase/firestore";

export default function DailyPlanner() {
  const [tasks, setTasks] = useState("");
  const [plan, setPlan] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    if (!tasks.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai/planner", {
        method: "POST",
        body: JSON.stringify({ text: tasks }),
      });
      const data = await res.json();
      setPlan(data.result);
    } catch (error) {
      alert("Error generating plan");
    }
    setLoading(false);
  };

  const savePlan = async () => {
    if (!plan.trim()) return;
    try {
      await addDoc(collection(db, "plans"), {
        content: plan,
        createdAt: new Date(),
      });
      loadHistory();
    } catch (error) {
      console.error(error);
    }
  };

  const loadHistory = async () => {
    const q = query(collection(db, "plans"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    setHistory(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const deletePlan = async (e, id) => {
    e.stopPropagation();
    try {
      await deleteDoc(doc(db, "plans", id));
      loadHistory();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* LEFT: INPUT AND RESULT */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">AI Daily Planner</h2>
              <button onClick={() => {setTasks(""); setPlan("");}} className="text-xs font-bold text-gray-400 uppercase hover:text-red-500 transition">Clear All</button>
            </div>
            
            <textarea
              placeholder="Enter your tasks (e.g. 9am Gym, 11am Client Call, Finish project)..."
              className="w-full h-48 p-8 text-lg outline-none resize-none text-gray-700 leading-relaxed"
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
            />

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={generatePlan}
                className="px-6 py-2.5 bg-[#4F46E5] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md"
              >
                {loading ? "..." : "Generate Plan"}
              </button>
              <button
                onClick={savePlan}
                className="px-6 py-2.5 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md disabled:opacity-50"
                disabled={!plan}
              >
                Save Plan
              </button>
            </div>
          </div>

          {plan && (
            <div className="bg-white rounded-2xl border-2 border-indigo-100 p-8 shadow-lg">
              <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-4">Your Generated Schedule</h3>
              <div className="text-base text-gray-800 leading-relaxed font-semibold whitespace-pre-wrap">
                {plan}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: HISTORY SIDEBAR */}
        <div className="w-full lg:w-80">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-175">
            <div className="p-4 border-b border-gray-100 bg-gray-50 text-center">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Saved Plans</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {history.length === 0 ? (
                <p className="text-gray-400 text-sm italic text-center py-10">No saved plans.</p>
              ) : (
                history.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => setPlan(item.content)}
                    className="group relative p-5 bg-gray-50 border border-transparent rounded-xl hover:border-indigo-300 transition cursor-pointer"
                  >
                    <p className="text-sm text-gray-800 line-clamp-3 leading-snug font-semibold pr-6">
                      {item.content}
                    </p>
                    <div className="mt-2 text-[10px] font-bold text-indigo-500 uppercase">
                      {item.createdAt?.toDate().toLocaleDateString() || "Recent"}
                    </div>
                    
                    <button 
                      onClick={(e) => deletePlan(e, item.id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity font-bold text-lg"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}