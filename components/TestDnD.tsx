// components/TestDnD.tsx
"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

export default function TestDnD() {
  const [items, setItems] = useState(["🍔 Burger", "🥗 Salad", "🍕 Pizza"]);

  const handleDrag = (result: DropResult) => {
    if (!result.destination) return;
    const updated = [...items];
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);
    setItems(updated);
  };

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            className="space-y-4"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map((item, index) => (
              <Draggable draggableId={item} index={index} key={item}>
                {(provided, snapshot) => (
                  <div
                    className={`p-4 rounded bg-zinc-800 shadow ${
                      snapshot.isDragging ? "scale-105 ring-2 ring-blue-500" : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
