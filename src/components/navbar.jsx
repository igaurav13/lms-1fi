import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, User } from "lucide-react";

function Navbar() {
  const navItems = [
    { label: "Loan Applications", href: "/loan-applications" },
    { label: "Loan Products", href: "/loan-products" },
    { label: "Loans", href: "/loans" },
    { label: "Create Application", href: "/create-application" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 pt-2">
        {/* floating glass navbar card */}
        <div className="rounded-3xl border bg-white/90 backdrop-blur-xl shadow-[0_16px_40px_-10px_rgba(99,42,217,0.18)] ring-1 ring-purple-100">
          <div className="flex items-center justify-between px-5 py-3">

            {/* logo + navigation */}
            <div className="flex items-center gap-8">
              <img
                src="/1fi.svg"
                className="w-10 h-10 rounded-2xl object-contain shadow-sm"
              />

              <nav className="hidden md:flex items-center gap-7 text-[15px] font-semibold">
                {navItems.map(item => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-purple-700 transition"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="rounded-2xl px-4 border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                <User className="w-4 h-4 mr-1" /> Login
              </Button>

              <Button className="rounded-2xl px-5 bg-purple-600 hover:bg-purple-700 shadow-md">
                Check Eligibility
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
