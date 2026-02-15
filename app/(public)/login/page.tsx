"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/utils/supabaseClient";
import { useState } from "react";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("demo@gmail.com");
  const [password, setPassword] = useState("Test@123");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    router.push("/");
  };

  const handleSignUp = async () => {
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    router.push("/");
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-20 text-black dark:text-white bg-white dark:bg-black px-6">
      <div className="w-96 flex flex-col justify-center items-center mx-auto flex-1">
        {/* <Link
          href="/"
          className="absolute left-4 top-20 py-2 px-4 rounded-md bg-slate-800 hover:bg-slate-700 text-sm"
        >
          ← Back
        </Link> */}

        <div className="flex flex-col w-full gap-2">
          <label>Email</label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            onClick={handleSignIn}
            disabled={loading}
            className="bg-green-700 rounded-md px-4 py-2 mb-2"
          >
            {loading ? "Processing..." : "Sign In"}
          </button>

          {/* <button
            onClick={handleSignUp}
            disabled={loading}
            className="border rounded-md px-4 py-2"
          >
            Sign Up
          </button> */}

          {errorMsg && (
            <p className="mt-4 p-4 bg-red-600 text-white text-center rounded">
              {errorMsg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
