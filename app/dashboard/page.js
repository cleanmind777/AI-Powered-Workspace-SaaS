"use client";

import { useRouter } from "next/navigation";
import { logoutUser } from "../lib/auth";
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

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
          <LayoutDashboard size={22} />
          CollabAI
        </h2>

        <nav className="space-y-4">
          <button className="flex items-center gap-3 text-gray-700 hover:text-indigo-600">
            <FileText size={18} />
            Real-Time Workspace
          </button>

          <button className="flex items-center gap-3 text-gray-700 hover:text-indigo-600">
            <Sparkles size={18} />
            AI Generate
          </button>

          <button className="flex items-center gap-3 text-gray-700 hover:text-indigo-600">
            <Brain size={18} />
            AI Summarize
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 flex items-center gap-2 text-red-500 hover:text-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Welcome to Your Workspace
        </h1>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Real-Time Workspace */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FileText size={28} className="text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Real-Time Workspace
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Collaborate live with your team in shared documents.
            </p>
            <button
              onClick={() => router.push("/page/demo")}
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
              onClick={() => router.push("/page/demo")}
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
              Summarize long documents into concise insights.
            </p>
            <button
              onClick={() => router.push("/page/demo")}
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
