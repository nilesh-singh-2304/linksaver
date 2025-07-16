import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full px-4 sm:px-6 md:px-10 py-4 bg-zinc-900/70 backdrop-blur-md border-b border-zinc-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0"
    >
      <Link
        href="/"
        className="text-2xl font-bold text-white hover:text-blue-400 transition"
      >
        🔖 Link Saver
      </Link>

      <div className="flex gap-4 sm:gap-6 items-center">
        <Link
          href="/dashboard"
          className="text-white hover:text-blue-400 text-sm transition"
        >
          Dashboard
        </Link>
        {/* Future: DarkModeToggle, Login/Logout, Profile */}
      </div>
    </motion.nav>
  );
}
