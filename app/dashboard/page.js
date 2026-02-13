"use client";

import { useRouter } from "next/navigation";
import { logoutUser } from "../../lib/auth";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Brain,
  LogOut,
  Plus,
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [pages, setPages] = useState([]);

  // 🔐 Logout
  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  // Fetch pages in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "pages"), (snapshot) => {
      const pageList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPages(pageList);
    });

    return () => unsubscribe();
  }, []);

  //  Create new page (for sidebar + Open Workspace)
  const handleCreateWorkspace = async () => {
    const newId = crypto.randomUUID();

    await setDoc(doc(db, "pages", newId), {
      title: "Untitled Page",
      content: "",
      createdAt: new Date(),
    });

    router.push(`/page/${newId}`);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
          <LayoutDashboard size={22} />
          CollabAI
        </h2>

        {/* Workspace Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="flex items-center gap-2 text-gray-700 font-medium">
              <FileText size={18} />
              Real-Time Workspace
            </span>

            <button
              onClick={handleCreateWorkspace}
              className="text-indigo-600 hover:text-indigo-800"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Page List */}
          <div className="space-y-2 max-h-[50vh] overflow-y-auto">
            {pages.length === 0 && (
              <p className="text-sm text-gray-400">No pages yet</p>
            )}

            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => router.push(`/page/${page.id}`)}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm truncate"
              >
                {page.title || page.id}
              </button>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-2 text-red-500 hover:text-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Welcome to Your Workspace
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Open Workspace */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FileText size={28} className="text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Real-Time Workspace
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Collaborate live with your team in shared documents.
            </p>
            <button
              onClick={handleCreateWorkspace}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Open Workspace
            </button>
          </div>

          {/* AI Generate */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Sparkles size={28} className="text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              AI Generate
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Generate intelligent content instantly using Gemini AI.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Generate Content
            </button>
          </div>

          {/* AI Summarize */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <Brain size={28} className="text-pink-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              AI Summarize
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Summarize long paragraphs into concise insights.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
            >
              Summarize Now
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
