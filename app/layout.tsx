"use client";
// import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const router = useRouter();
    const [path, setPath] = useState("");

    useEffect(() => {
        setPath(router.asPath);
    }, [router.asPath]);

    return (
        <>
            <html lang="en">
                <body className={inter.className}>
                    {/* Your navigation bar */}
                    <nav>
                        <ul>
                            <Link
                                className={`link ${
                                    pathname === "/" ? "active" : ""
                                }`}
                                href="/"
                            >
                                Home
                            </Link>
                            <Link
                                className={`link ${
                                    pathname === "/archive" ? "active" : ""
                                }`}
                                href="/archive"
                            >
                                Archive
                            </Link>
                            {/* Add more navigation items as needed */}
                        </ul>
                    </nav>
                    {/* Render the page content */}
                    {children}
                </body>
            </html>
        </>
    );
}
