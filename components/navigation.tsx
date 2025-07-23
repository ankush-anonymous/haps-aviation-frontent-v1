"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Plane } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menteeData, setMenteeData] = useState<any>(null);
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const mentee = localStorage.getItem("menteeData");

    if (loggedIn && mentee) {
      setIsLoggedIn(true);
      setMenteeData(JSON.parse(mentee));
    }
  }, []);

  // Don't show general navigation for admin or mentee routes
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/mentee") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/mentor")
  ) {
    return null;
  }

  return (
    <nav className="bg-blue-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-blue-300" />
              <span className="text-white text-xl font-bold">SkyMentor</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-blue-300 border-b-2 border-blue-300"
                    : "text-white hover:text-blue-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <Link href="/mentee/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <div className="flex space-x-2">
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-blue-300 text-white hover:bg-blue-800 bg-transparent"
                  >
                    Mentee Login
                  </Button>
                </Link>
                <Link href="/mentor/login">
                  <Button
                    variant="outline"
                    className="border-blue-300 text-white hover:bg-blue-800 bg-transparent"
                  >
                    Mentor Login
                  </Button>
                </Link>
                <Link href="/admin/login">
                  <Button
                    variant="outline"
                    className="border-blue-300 text-white hover:bg-blue-800 bg-transparent"
                  >
                    Admin Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Book Consultation
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-300 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-800">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    pathname === item.href
                      ? "text-blue-300 bg-blue-700"
                      : "text-white hover:text-blue-300 hover:bg-blue-700"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                {isLoggedIn ? (
                  <Link href="/mentee/dashboard" className="block">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login" className="block">
                      <Button
                        variant="outline"
                        className="w-full border-blue-300 text-white hover:bg-blue-800 bg-transparent"
                      >
                        Mentee Login
                      </Button>
                    </Link>
                    <Link href="/mentor/login" className="block">
                      <Button
                        variant="outline"
                        className="w-full border-blue-300 text-white hover:bg-blue-800 bg-transparent"
                      >
                        Mentor Login
                      </Button>
                    </Link>
                    <Link href="/admin/login" className="block">
                      <Button
                        variant="outline"
                        className="w-full border-blue-300 text-white hover:bg-blue-800 bg-transparent"
                      >
                        Admin Login
                      </Button>
                    </Link>
                    <Link href="/register" className="block">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Book Consultation
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              <div className="px-3 py-2 border-t border-blue-700">
                <Link href="/admin/login" className="block">
                  <Button
                    variant="ghost"
                    className="w-full text-left text-white hover:bg-blue-700 justify-start"
                  >
                    Admin Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
