"use client";

import Link from "next/link";
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1e2a47] text-gray-300 ">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo + Description */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="bg-orange-500 text-white w-10 h-10 flex items-center justify-center rounded-lg font-bold">
              FM
            </div>
            <span className="text-white font-semibold text-lg">
              FileMarket
            </span>
          </Link>

          <p className="text-sm leading-relaxed">
            The modern marketplace for digital files. Buy, sell, and discover
            amazing content from creators worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/" className="hover:text-orange-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/marketplace"
                className="hover:text-orange-500 transition"
              >
                Marketplace
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-orange-500 transition">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-orange-500 transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-white font-semibold mb-4">Account</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/login" className="hover:text-orange-500 transition">
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="hover:text-orange-500 transition"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                href="/creator-dashboard"
                className="hover:text-orange-500 transition"
              >
                Creator Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin"
                className="hover:text-orange-500 transition"
              >
                Admin Panel
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect</h3>
          <div className="flex gap-4">
            <Link
              href="https://twitter.com"
              target="_blank"
              className="bg-[#2c3a5e] p-3 rounded-lg hover:bg-orange-500 transition"
            >
              <FaTwitter />
            </Link>

            <Link
              href="https://github.com"
              target="_blank"
              className="bg-[#2c3a5e] p-3 rounded-lg hover:bg-orange-500 transition"
            >
              <FaGithub />
            </Link>

            <Link
              href="https://linkedin.com"
              target="_blank"
              className="bg-[#2c3a5e] p-3 rounded-lg hover:bg-orange-500 transition"
            >
              <FaLinkedin />
            </Link>

            <Link
              href="mailto:support@filemarket.com"
              className="bg-[#2c3a5e] p-3 rounded-lg hover:bg-orange-500 transition"
            >
              <FaEnvelope />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2026 FileMarket. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-orange-500 transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-orange-500 transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}