"use client";
import { useState } from "react";

export default function Checklist() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const addTask = () => {
    if (!taskText.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: taskText, done: false, priority, dueDate }]);
    setTaskText("");
  };

  return (
    <div className="w-200 mx-auto mt-12 p-8 bg-white rounded-[30px] border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Upcoming Tasks
          <span className="text-sm font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
            {tasks.filter(t => !t.done).length} active
          </span>
        </h2>
      </div>

      <div className="flex items-center gap-2 mb-10 p-2 bg-gray-50 rounded-2xl border border-gray-100 focus-within:bg-white focus-within:border-indigo-200 transition-all">
        <input
          type="text"
          placeholder="Add your tasks..."
          className="flex-1 px-4 py-2 outline-none text-gray-700 bg-transparent placeholder-gray-400"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <div className="flex gap-2 items-center px-2">
          <select 
            className="text-[10px] font-bold uppercase bg-white text-gray-500 p-2 rounded-lg outline-none cursor-pointer border border-gray-100 hover:text-gray-800 transition"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <input 
            type="date" 
            className="text-[10px] bg-white text-gray-500 p-2 rounded-lg outline-none border border-gray-100 cursor-pointer hover:text-gray-800 transition"
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button
          onClick={addTask}
          className="bg-[#4F46E5] text-white px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-indigo-700 transition active:scale-95 shadow-lg shadow-indigo-100"
        >
          Add Task
        </button>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-200 rounded-3xl">
            <p className="text-gray-400 text-sm italic">No tasks</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`group flex items-center justify-between p-5 rounded-2xl transition-all border ${
                task.done 
                ? "bg-gray-50 border-transparent opacity-60" 
                : "bg-white border-gray-100 hover:border-indigo-200 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-5">
                <div 
                  onClick={() => setTasks(tasks.map(t => t.id === task.id ? {...t, done: !t.done} : t))}
                  className={`w-6 h-6 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all ${
                    task.done ? "bg-[#4F46E5] border-[#4F46E5]" : "border-gray-200 hover:border-[#4F46E5]"
                  }`}
                >
                  {task.done && <span className="text-white text-[10px]">✓</span>}
                </div>

                <div>
                  <p className={`text-lg font-semibold transition-all ${
                    task.done ? "line-through text-gray-400" : "text-gray-800"
                  }`}>
                    {task.text}
                  </p>
                  <div className="flex gap-3 mt-1 items-center">
                    <span className="text-[9px] px-2 py-0.5 rounded border border-gray-200 bg-gray-50 text-gray-500 font-black uppercase tracking-widest">
                      {task.priority}
                    </span>
                    {task.dueDate && (
                      <span className="text-[11px] text-gray-400 font-bold uppercase">
                        • Due {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                className="text-gray-300 hover:text-red-500 font-bold text-2xl px-4 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}