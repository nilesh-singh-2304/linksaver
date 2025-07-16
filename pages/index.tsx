"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem("link-saver-session");
    if (session) setUser(session);
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-bold text-center mb-6"
      >
        🔖 Link Saver + AI Summary
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-lg md:text-xl text-zinc-300 text-center mb-10 max-w-2xl"
      >
        Save your favorite links, auto-summarized with AI magic ✨. Organize,
        tag, and explore — all in one place.
      </motion.p>

      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        {!user && (
          <>
            <Link href="/auth/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                🚪 Login
              </motion.button>
            </Link>
            <Link href="/auth/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
              >
                📝 Sign Up
              </motion.button>
            </Link>
          </>
        )}

        {user && (
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition"
            >
              🚀 Go to Dashboard
            </motion.button>
          </Link>
        )}
      </motion.div>

      {/* Floating footer animation */}
      <motion.div
        className="mt-16 text-sm text-zinc-500"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Made with ❤️ using Next.js, Tailwind & Jina AI
      </motion.div>
    </main>
  );
}
