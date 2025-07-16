"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { getCurrentUser } from "@/lib/auth";

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-zinc-950 via-zinc-900 to-black text-white relative overflow-hidden">
      {/* Glowing Blobs */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600/20 rounded-full top-[-100px] left-[-100px] blur-3xl animate-pulse z-0"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 rounded-full bottom-[-120px] right-[-100px] blur-3xl animate-pulse z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent"
        >
          🔖 Link Saver + Auto Summary
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 text-zinc-400 max-w-xl text-lg sm:text-xl"
        >
          Save, organize, and auto-summarize your links with beautiful previews — fast, free, and private.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          {!user ? (
            <>
              <Link
                href="/auth/signup"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium text-sm shadow-md transition"
              >
                🚀 Get Started
              </Link>
              <Link
                href="/auth/login"
                className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-lg text-zinc-200 font-medium text-sm shadow-md border border-zinc-600 transition"
              >
                🔐 Log In
              </Link>
            </>
          ) : (
            <Link
              href="/dashboard"
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-medium text-sm shadow-md transition"
            >
              🧠 Go to Dashboard
            </Link>
          )}
        </motion.div>

        {/* Floating Icons */}
        <div className="absolute bottom-10 left-10 hidden sm:block">
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="text-4xl"
          >
            🧠
          </motion.div>
        </div>

        <div className="absolute top-12 right-12 hidden sm:block">
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="text-4xl"
          >
            🌐
          </motion.div>
        </div>
      </div>
    </div>
  );
}
