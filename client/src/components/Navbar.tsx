"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleAuthChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("authChanged", handleAuthChange);
    document.addEventListener("mousedown", handleClickOutside);

    handleAuthChange();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("authChanged", handleAuthChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleAvatarClick = () => {
    if (user?.role === "creator") {
      router.push("/creator/profile");
    } else {
      router.push("/profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.dispatchEvent(new Event("authChanged"));

    setDropdownOpen(false);
    router.push("/");
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md"
            : "bg-gradient-to-r from-[#0f172a] to-[#1e293b]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu
                className={scrolled ? "text-black" : "text-white"}
              />
            </button>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="bg-orange-500 text-white w-10 h-10 flex items-center justify-center rounded-lg font-bold">
              FM
            </div>
            <span
              className={`font-semibold text-lg ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              FileMarket
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.path);

              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`transition duration-200 ${
                    isActive
                      ? "text-orange-500"
                      : scrolled
                      ? "text-black hover:text-orange-500"
                      : "text-white hover:text-orange-500"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className={`transition ${
                    scrolled
                      ? "text-black hover:text-orange-500"
                      : "text-white hover:text-orange-500"
                  }`}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                {/* Avatar */}
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center rounded-full cursor-pointer hover:scale-105 transition"
                >
                  {user.fullName?.charAt(0).toUpperCase()}
                </div>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg border animate-fadeIn overflow-hidden">
                    <button
                      onClick={() => {
                        handleAvatarClick();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                    >
                      My Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-white p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <X />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className="hover:text-orange-500"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div
            className="flex-1 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}
    </>
  );
}