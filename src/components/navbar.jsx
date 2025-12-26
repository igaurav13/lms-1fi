'use client'
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, User } from "lucide-react";
import { usePathname } from "next/navigation";

function Navbar() {
      const pathname = usePathname();
  const navItems = [
    { label: "Loan Applications", href: "/loan-applications" },
    { label: "Loan Products", href: "/loan-products" },
    { label: "Loans", href: "/loans" },
    { label: "Create Application", href: "/create-application" },
  ];


  const isActive = (href) => {
    // exact match OR sub-route match
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 pt-2">
        {/* floating glass navbar card */}
        <div className="rounded-xl  bg-white/90 backdrop-blur-xl shadow-[0_16px_40px_-10px_rgba(99,42,217,0.18)] ring-1 ring-purple-100">
          <div className="flex items-center justify-between px-5 py-4">

            {/* logo + navigation */}
            <div className="flex items-center gap-8">
                <a href="/">
                    <img
                    src="/1fi.svg"
                    className="w-10 h-10 rounded-md object-contain shadow-sm"
                />
                </a>
            </div>
            <div>
                <nav className="hidden md:flex items-center gap-7 text-[15px] font-normal">
                    {navItems.map(item => (
                        <a
                            key={item.href}
                            href={item.href}
                            className={
                            isActive(item.href)
                                ? "text-[#6c28d9]"
                                : "text-gray-700 hover:text-[#6c28d9] transition"
                            }
                            aria-current={isActive(item.href) ? "page" : undefined}
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
                className="rounded-xl px-4 py-2 border-[#6c28d9] text-[#6c28d9] hover:bg-purple-50"
              >
                <User className="w-4 h-4 mr-1" /> Login
              </Button>

              <Button className="rounded-xl px-4 py-2 text-white bg-[#6c28d9] hover:bg-[#6c28d9] shadow-md">
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
