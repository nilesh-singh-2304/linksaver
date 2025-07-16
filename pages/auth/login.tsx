import { useState } from "react";
import { useRouter } from "next/router";
import { loginUser } from "@/lib/auth";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-950 text-white px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-zinc-900/60 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md border border-zinc-700"
      >
        <h1 className="text-3xl font-semibold mb-6 text-center text-white">🔐 Login</h1>

        {error && (
          <p className="text-red-400 mb-4 text-sm text-center">{error}</p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-medium"
        >
          Log In
        </button>

        <p className="text-sm text-center mt-6 text-zinc-300">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-blue-400 hover:underline transition"
          >
            Sign Up
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
