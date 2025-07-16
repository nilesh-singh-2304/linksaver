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
      window.location.href = "/auth/login";
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
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-zinc-900 text-black dark:text-white">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome, {user}</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logout();
                window.location.href = "/auth/login";
              }}
              className="text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Paste URL..."
            className="w-full p-2 border rounded text-black"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Optional Tag (e.g., AI, News)"
            className="w-full p-2 border rounded text-black"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <button
            onClick={handleAdd}
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Bookmark"}
          </button>
        </div>

        {tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-2">
            <button
              onClick={() => setFilter("")}
              className={`px-3 py-1 rounded text-sm ${
                !filter
                  ? "bg-black text-white"
                  : "bg-gray-200 dark:bg-zinc-700"
              }`}
            >
              All
            </button>
            {tags.map((t, i) => (
              <button
                key={i}
                onClick={() => setFilter(t!)}
                className={`px-3 py-1 rounded text-sm ${
                  filter === t
                    ? "bg-black text-white"
                    : "bg-gray-200 dark:bg-zinc-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <DragDropContext onDragEnd={handleDrag}>
          <Droppable droppableId="bookmarks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
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
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
