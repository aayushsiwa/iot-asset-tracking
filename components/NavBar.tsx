"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import logo from "../app/favicon.ico";
import Image from "next/image";

function NavBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [path, setPath] = useState("");

    return (
        <nav className="flex justify-start gap-4 shadow-sm shadow-zinc-400 w-full items-center text-xl h-16 px-4">
            <Link
                className={`link ${
                    pathname === "/" ? "active" : ""
                }  flex gap-2`}
                href="/"
            >
                <Image
                    src={logo}
                    width={30}
                    height={30}
                    alt="Logo"
                    className="hover:scale-110"
                />
                <h2 className="hover:text-zinc-400">Home</h2>
            </Link>
            <Link
                className={`link ${
                    pathname === "/archive" ? "active" : ""
                } hover:text-zinc-400`}
                href="/inventory"
            >
                Inventory
            </Link>
            <Link
                className={`link ${
                    pathname === "/archive" ? "active" : ""
                } hover:text-zinc-400`}
                href="/archive"
            >
                Archive
            </Link>
            <Link
                className={`link ${
                    pathname === "/login" ? "active" : ""
                } hover:text-zinc-400`}
                href="/login"
            >
                Login
            </Link>
            <Link
                className={`link ${
                    pathname === "/try" ? "active" : ""
                } hover:text-zinc-400 fixed end-4`}
                href="/try"
            >
                Try
            </Link>
            {/* Add more navigation items as needed */}
        </nav>
    );
}

export default NavBar;
