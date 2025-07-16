import { useState } from "react";
import { useRouter } from "next/router";
import { loginUser } from "@/lib/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen px-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-800 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Log In</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Log In</button>
      </form>
    </div>
  );
}
