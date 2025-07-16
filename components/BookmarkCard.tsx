"use client";
import React from "react";
import { Draggable } from "@hello-pangea/dnd";

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
          className={`bg-white dark:bg-zinc-800 p-4 rounded shadow flex gap-4 items-start transition-all duration-200 ${
            snapshot.isDragging ? "scale-105 ring-2 ring-blue-400" : ""
          }`}
        >
          <img src={bm.favicon} className="w-6 h-6 mt-1" alt="favicon" />
          <div className="flex-1">
            <a
              href={bm.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold underline break-all"
            >
              {bm.title}
            </a>
            {bm.tag && (
              <span className="text-xs ml-2 px-2 py-1 bg-gray-200 dark:bg-zinc-700 rounded">
                {bm.tag}
              </span>
            )}
            <p className="text-sm mt-2 whitespace-pre-line break-words">
              {bm.summary}
            </p>
          </div>
          <button
            onClick={() => onDelete(idx)}
            className="text-red-600 hover:underline text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default BookmarkCard;
