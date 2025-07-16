import dynamic from "next/dynamic";
import { useState } from "react";

// dynamically load only on client
const DragDrop = dynamic(() => import("../components/TestDnD"), {
  ssr: false,
});

export default function TestPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl mb-4">Drag and Drop Test</h1>
      <DragDrop />
    </div>
  );
}
