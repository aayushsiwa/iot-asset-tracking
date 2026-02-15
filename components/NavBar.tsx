"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTheme } from "@/context/Theme";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/utils/supabaseClient";
import { useRouter } from "next/navigation";

function NavBar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const navLink = (path: string) =>
    `px-3 py-2 rounded-md transition-all duration-200 ${
      pathname === path
        ? "bg-indigo-600 text-white backdrop-blur-sm"
        : "text-white hover:text-indigo-100 hover:bg-indigo-500/30 backdrop-blur-sm"
    }`;

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <nav className="backdrop-blur-xl border-b border-slate-800 bg-slate-900/80 shadow-lg">
        <div className="flex justify-between items-center h-16 px-6">
          {/* Left Side */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/favicon.ico"
                width={30}
                height={30}
                alt="Logo"
                className="hover:scale-110 transition-transform"
              />
              <span className="font-semibold text-lg text-white">
                AssetTracker
              </span>
            </Link>
            <Link href="/locations" className={navLink("/locations")}>
              Locations
            </Link>
          </div>
          {/* <Link href="/inventory" className={navLink("/inventory")}>
              Inventory
              </Link>
              <Link href="/archive" className={navLink("/archive")}>
              Archive
              </Link> */}

          {user && (
            <div className="flex justify-center items-center gap-6">
              <span className="text-sm text-gray-300 hidden md:block">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-white bg-red-500/30 hover:bg-red-600/30 transition"
              >
                Logout
              </button>

              {/* <Link
              href="/try"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md backdrop-blur-sm hover:bg-indigo-500 transition"
              >
              Try
              </Link> */}
            </div>
          )}

          {/* Right Side */}
          <div className="flex justify-center items-center gap-4">
            {!user && (
              <Link href="/login" className={navLink("/login")}>
                Login
              </Link>
            )}
            <button
              onClick={toggleTheme}
              className="relative px-3 py-2 rounded-full 
               text-black dark:text-white
               transition-all duration-500 ease-in-out
               hover:scale-110 active:scale-95"
            >
              <span
                className={`inline-block transition-transform duration-700 ${
                  theme === "dark"
                    ? "rotate-180 scale-110"
                    : "rotate-0 scale-100"
                }`}
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {!user && (
        <div className="w-full bg-yellow-600/20 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-300 text-center text-sm py-1 border-b border-yellow-500/30">
          Read-Only Mode — Login to manage assets
        </div>
      )}
    </div>
  );
}

export default NavBar;
