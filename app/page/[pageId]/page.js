"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { auth } from "../../../lib/firebase";

export default function Page() {
  const router = useRouter();
  const { pageId } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false); //  Added

  useEffect(() => {
    if (!pageId) return;

    const docRef = doc(db, "pages", pageId);

    const unsubscribe = onSnapshot(docRef, async (snapshot) => {
      if (!snapshot.exists()) {
        await setDoc(docRef, {
          title: "Untitled Page",
          content: "",
          updatedAt: new Date(),
          updatedBy: auth.currentUser?.email || "Unknown",
        });
      } else {
        const data = snapshot.data();
        setTitle(data.title || "Untitled Page");
        setContent(data.content || "");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [pageId]);

  //  Copy link function
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  // Save title
  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    await setDoc(
      doc(db, "pages", pageId),
      { title: newTitle },
      { merge: true }
    );
  };

  // Save content
  const handleContentChange = async (e) => {
    const newContent = e.target.value;
    setContent(newContent);

    await setDoc(
      doc(db, "pages", pageId),
      {
        content: newContent,
        updatedAt: new Date(),
        updatedBy: auth.currentUser?.email || "Unknown",
      },
      { merge: true }
    );
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Back
          </button>

          {/*  Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>

        {/* Editable Title */}
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="text-3xl font-bold w-full mb-6 outline-none border-b pb-2"
        />

        {/* Content */}
        <textarea
          value={content}
          onChange={handleContentChange}
          className="w-full h-96 p-4 border rounded-lg"
          placeholder="Start typing..."
        />

      </div>
    </div>
  );
}
