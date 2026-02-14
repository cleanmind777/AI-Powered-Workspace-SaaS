"use client";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, getDocs, orderBy, query, deleteDoc, doc } from "firebase/firestore";

export default function AIEditor() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAction = async (path) => {
    if (!text) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/ai/${path}`, { method: "POST", body: JSON.stringify({ text }) });
      const data = await res.json();
      setText(data.result);
    } catch (error) { 
      console.error(error); 
    }
    setLoading(false);
  };

  const saveNote = async () => {
    if (!text.trim()) return;
    try {
      await addDoc(collection(db, "notes"), { content: text, createdAt: new Date() });
      loadNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const loadNotes = async () => {
    const q = query(collection(db, "notes"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    setNotes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const deleteNote = async (e, id) => {
    e.stopPropagation();
    try {
      await deleteDoc(doc(db, "notes", id));
      loadNotes();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { 
    loadNotes(); 
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* MAIN EDITOR */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <textarea
              className="w-full h-125 p-8 text-lg outline-none resize-none text-gray-700 leading-relaxed"
              placeholder="Start typing..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            
            <div className="flex justify-between items-center p-4 bg-gray-50 border-t border-gray-100">
              <div className="flex gap-2">
                <button 
                  onClick={() => handleAction("summarize")} 
                  className="px-4 py-2 bg-[#E11D48] text-white rounded-xl text-xs font-bold uppercase"
                >
                  Summarize
                </button>
                <button 
                  onClick={() => handleAction("improve")} 
                  className="px-4 py-2 bg-[#7C3AED] text-white rounded-xl text-xs font-bold uppercase"
                >
                  Improve
                </button>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleAction("generate")} 
                  className="px-6 py-2 bg-[#4F46E5] text-white rounded-xl text-xs font-bold uppercase shadow-md"
                >
                  {loading ? "..." : "Generate"}
                </button>
                <button 
                  onClick={saveNote}
                  className="px-6 py-2 bg-black text-white rounded-xl text-xs font-bold uppercase shadow-md"
                >
                  Save 
                </button>
              </div>
            </div>
          </div>

        </div>

       
        <div className="w-full md:w-80">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-162.5">
            <div className="p-4 border-b border-gray-100 bg-gray-50 text-center">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">History</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notes.length === 0 ? (
                <p className="text-gray-400 text-sm italic text-center py-10">No history yet.</p>
              ) : (
                notes.map(note => (
                  <div 
                    key={note.id} 
                    onClick={() => setText(note.content)}
                    className="group relative p-5 bg-gray-50 border border-transparent rounded-xl hover:border-indigo-300 transition cursor-pointer"
                  >
                    <p className="text-base text-gray-800 line-clamp-3 leading-snug font-semibold pr-8">
                      {note.content}
                    </p>
                    <div className="mt-2 text-[10px] font-bold text-indigo-500 uppercase">
                      {note.createdAt?.toDate().toLocaleDateString() || "Just now"}
                    </div>
                    
                    <button 
                      onClick={(e) => deleteNote(e, note.id)}
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