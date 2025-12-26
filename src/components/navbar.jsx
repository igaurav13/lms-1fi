"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight, User, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Loan Applications", href: "/loan-applications" },
    { label: "Loan Products", href: "/loan-products" },
    { label: "Loans", href: "/loans" },
    { label: "Create Application", href: "/create-application" },
  ];

  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + "/");

  // ------------------------
  // Scroll based navbar state
  // ------------------------
  const [isTop, setIsTop] = useState(true);
  const [showFloating, setShowFloating] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      // At very top — full width hero navbar
      setIsTop(current <= 10);

      // When user scrolls UP → show floating navbar
      if (current < lastScrollY) {
        setShowFloating(true);
      } 
      // When scrolling DOWN → hide floating navbar feel
      else if (current > 80) {
        setShowFloating(true);
      }

      setLastScrollY(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ------------------------
  // Mobile menu toggle
  // ------------------------
// Mobile Menu Toggle
const [open, setOpen] = useState(false);

// Disable background scroll when menu is open
useEffect(() => {
  if (open) document.body.style.overflow = "hidden";
  else document.body.style.overflow = "";
}, [open]);

  return (
    <header className="sticky top-0 z-50">

      {/* Animated wrapper */}
      <motion.div
        animate={{
          paddingTop: isTop ? 0 : 8,
          paddingBottom: isTop ? 0 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="mx-auto"
      >
        <div className="max-w-7xl mx-auto px-3">

          {/* Floating Glass Navbar Card */}
          <motion.div
            animate={{
              borderRadius: isTop ? 0 : 16,
              marginTop: isTop ? 0 : 8,
              scale: isTop ? 1 : 0.99,
            }}
            transition={{ duration: 0.25 }}
            className={
              isTop
                ? "bg-white/80 backdrop-blur-xl shadow-none"
                : "bg-white/90 backdrop-blur-xl shadow-[0_16px_40px_-10px_rgba(99,42,217,0.18)] ring-1 ring-purple-100"
            }
          >
            <div className="flex items-center justify-between px-5 py-4">

              {/* logo */}
              <div className="flex items-center gap-3">
                <a href="/">
                  <img
                    src="/1fi.svg"
                    className="w-10 h-10 rounded-md object-contain shadow-sm"
                  />
                </a>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-7 text-[15px] font-normal">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={
                      isActive(item.href)
                        ? "text-[#6c28d9] font-medium"
                        : "text-gray-700 hover:text-[#6c28d9] transition"
                    }
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Actions */}
              <div className="hidden md:flex items-center gap-3">
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

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg border border-purple-200"
                onClick={() => setOpen(!open)}
              >
                {open ? <X /> : <Menu />}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>


      {/* Mobile Drawer Menu */}
       <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-60 bg-white/95 backdrop-blur-xl"
          >
            {/* Close */}
            <div className="flex justify-between px-5 py-4">
              <div className="flex items-left">
                  <img src="/1fi.svg" alt="logo" width={40} height={40} className="rounded-md" />
              </div>

              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-xl border border-purple-200"
              >
                <X />
              </button>
            </div>

            {/* Menu Content */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-left justify-center gap-6 px-6 pt-4"
            >

              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className={ 
                    isActive(item.href)
                      ? "text-[#6c28d9] text-lg font-semibold"
                      : "text-gray-700 text-lg"
                  }
                >
                  {item.label}
                </motion.a>
              ))}

              <div className="h-px w-32 bg-purple-200 my-2" />

              <Button
                variant="outline"
                className="w-48 rounded-xl border-[#6c28d9] text-[#6c28d9]"
              >
                <User className="w-4 h-4 mr-1" /> Login
              </Button>

              <Button className="w-48 rounded-xl bg-[#6c28d9] text-white shadow-lg">
                Check Eligibility
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
