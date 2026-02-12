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

  const priorityColors = {
    high: "bg-red-50 text-red-600 border-red-100",
    medium: "bg-amber-50 text-amber-600 border-amber-100",
    low: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };

  return (
    <div className="w-200 mx-auto mt-12 p-2 bg-black rounded-[20px]">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        Upcoming Tasks
        
      </h2>

     
      <div className="flex flex-wrap gap-2 mb-10 p-2 bg-white rounded-2xl shadow-sm border border-gray-100">
        <input
          type="text"
          placeholder="Add your tasks"
          className="flex-1 px-4 py-2 outline-none text-gray-700 bg-transparent placeholder-gray-400"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <div className="flex gap-2 items-center px-2">
          <select 
            className="text-xs font-bold uppercase bg-gray-50 text-gray-500 p-2 rounded-lg outline-none cursor-pointer hover:bg-gray-100 transition"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <input 
            type="date" 
            className="text-xs bg-gray-50 text-gray-500 p-2 rounded-lg outline-none"
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button
          onClick={addTask}
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition shadow-md shadow-indigo-100"
        >
          Add Task
        </button>
      </div>

     
      <div className="grid gap-3">
        {tasks.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-3xl">
            <p className="text-gray-400 text-sm italic">No task</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`group flex items-center justify-between p-4 bg-white rounded-2xl border transition-all duration-200 ${
                task.done ? "opacity-60 grayscale border-transparent" : "shadow-sm border-gray-100 hover:border-indigo-200 hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded-full border-2 border-gray-300 checked:bg-indigo-600 cursor-pointer transition-all"
                  checked={task.done}
                  onChange={() => setTasks(tasks.map(t => t.id === task.id ? {...t, done: !t.done} : t))}
                />
                <div>
                  <p className={`font-medium ${task.done ? "line-through text-gray-400" : "text-gray-800"}`}>
                    {task.text}
                  </p>
                  <div className="flex gap-2 mt-1 items-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded-md border font-bold uppercase tracking-tighter ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                    {task.dueDate && (
                      <span className="text-[11px] text-gray-400 font-medium">
                         • Due {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}