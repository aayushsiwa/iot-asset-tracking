"use client";
import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-slate-950/90 backdrop-blur-md border-t border-slate-800 p-6 text-sm text-gray-400">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-3">
            Asset Tracker
          </h2>
          <p className="text-gray-300 text-sm">
            Smart asset tracking to manage inventory, maintenance, and
            availability efficiently.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/inventory" className="hover:text-white transition">
                Inventory
              </Link>
            </li>
            <li>
              <Link href="/archive" className="hover:text-white transition">
                Archive
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white transition">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2 text-gray-300">
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <a href="mailto:support@aayushsiwa.is-a.dev">
            support@aayushsiwa.is-a.dev
          </a>
          <a href="https://github.com/aayushsiwa/iot-asset-tracking">
            Star on GitHub
          </a>
        </div>
      </div>
      <div className="text-gray-400 flex justify-center border-t border-slate-800 mt-6 pt-4">
        © {new Date().getFullYear()} Asset Tracker. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
