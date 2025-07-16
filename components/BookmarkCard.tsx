"use client";
import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";

type Bookmark = {
  url: string;
  title: string;
  favicon: string;
  summary: string;
  tag?: string;
};

interface Props {
  bm: Bookmark;
  idx: number;
  onDelete: (index: number) => void;
}

const BookmarkCard: React.FC<Props> = ({ bm, idx, onDelete }) => {
  return (
    <Draggable draggableId={idx.toString()} index={idx}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`bg-zinc-900/60 backdrop-blur-md border border-zinc-700 p-4 sm:p-5 rounded-xl shadow-lg flex flex-col sm:flex-row gap-4 sm:items-start transition-all duration-300 ${
              snapshot.isDragging ? "scale-105 ring-2 ring-blue-500" : ""
            }`}
          >
            <img
              src={bm.favicon}
              className="w-6 h-6 mt-1 shrink-0"
              alt="favicon"
            />

            <div className="flex-1 text-white">
              <a
                href={bm.url}
                target="_blank"
                rel="noreferrer"
                className="block font-semibold underline break-words hover:text-blue-400 transition text-sm sm:text-base"
              >
                {bm.title}
              </a>

              {bm.tag && (
                <span className="inline-block mt-2 sm:mt-0 ml-0 sm:ml-2 text-xs px-2 py-0.5 bg-blue-500 text-white rounded-full">
                  {bm.tag}
                </span>
              )}

              <p className="text-sm mt-2 whitespace-pre-line break-words text-zinc-300">
                {bm.summary}
              </p>
            </div>

            <div className="sm:self-start sm:ml-2">
              <button
                onClick={() => onDelete(idx)}
                className="text-red-400 hover:text-red-500 text-sm transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </Draggable>
  );
};

export default BookmarkCard;
