"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import BookmarkCard from "@/components/BookmarkCard";
import { getMetadata, getSummary } from "@/lib/metadata";
import { logout } from "@/lib/auth";
import { motion } from "framer-motion";

type Bookmark = {
  url: string;
  title: string;
  favicon: string;
  summary: string;
  tag?: string;
};

export default function DashboardClient() {
  const [url, setUrl] = useState("");
  const [tag, setTag] = useState("");
  const [filter, setFilter] = useState("");
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("link-saver-bookmarks");
    if (saved) setBookmarks(JSON.parse(saved));

    const u = localStorage.getItem("link-saver-session");
    if (!u) {
      window.location.href = "/login";
    } else {
      setUser(u);
    }
  }, []);

  const saveToLocalStorage = (items: Bookmark[]) => {
    localStorage.setItem("link-saver-bookmarks", JSON.stringify(items));
  };

  const handleAdd = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const meta = await getMetadata(url);
      const summary = await getSummary(url);
      const newBookmark = { url, ...meta, summary, tag };
      const updated = [newBookmark, ...bookmarks];
      setBookmarks(updated);
      saveToLocalStorage(updated);
      setUrl("");
      setTag("");
    } catch {
      alert("Failed to fetch bookmark data.");
    }
    setLoading(false);
  };
  const handleDelete = (idx: number) => {
    const updated = bookmarks.filter((_, i) => i !== idx);
    setBookmarks(updated);
    saveToLocalStorage(updated);
  };

  const handleDrag = (result: DropResult) => {
    if (!result.destination) return;
    const items = [...bookmarks];
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setBookmarks(items);
    saveToLocalStorage(items);
  };

  const filtered = filter
    ? bookmarks.filter((b) => b.tag?.toLowerCase() === filter.toLowerCase())
    : bookmarks;

  const tags = Array.from(new Set(bookmarks.map((b) => b.tag).filter(Boolean)));

  if (!user) return null;

  return (
    <div className="min-h-screen p-4 bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <h1 className="text-3xl font-bold">Welcome, {user}</h1>
          <button
            onClick={() => {
              logout();
              window.location.href = "/auth/login";
            }}
            className="text-sm text-red-400 hover:underline"
          >
            Logout
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-3"
        >
          <input
            type="text"
            placeholder="Paste URL..."
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-600 focus:ring-2 focus:ring-blue-500 outline-none"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Optional Tag (e.g., AI, News)"
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-600 focus:ring-2 focus:ring-blue-500 outline-none"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <button
            onClick={handleAdd}
            disabled={loading}
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
          >
            {loading ? "Saving..." : "Save Bookmark"}
          </button>
        </motion.div>

        {tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-2 flex-wrap"
          >
            <button
              onClick={() => setFilter("")}
              className={`px-3 py-1 rounded-full text-sm ${
                !filter
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-800 border border-zinc-600"
              }`}
            >
              All
            </button>
            {tags.map((t, i) => (
              <button
                key={i}
                onClick={() => setFilter(t!)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === t
                    ? "bg-blue-500 text-white"
                    : "bg-zinc-800 border border-zinc-600"
                }`}
              >
                {t}
              </button>
            ))}
          </motion.div>
        )}

        <DragDropContext onDragEnd={handleDrag}>
          <Droppable droppableId="bookmarks">
            {(provided) => (
              <motion.div
                {...provided.droppableProps}
                ref={provided.innerRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 mt-4"
              >
                {filtered.map((bm, idx) => (
                  <BookmarkCard
                    key={idx}
                    bm={bm}
                    idx={idx}
                    onDelete={handleDelete}
                  />
                ))}
                {provided.placeholder}
              </motion.div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
