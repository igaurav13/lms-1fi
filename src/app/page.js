'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Sparkles, User } from "lucide-react";
import { motion } from "framer-motion";


export default function MutualFundsLandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 via-white to-white">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#6c28d9] text-xs font-medium"
        >
          <Sparkles className="w-3 h-3" /> New — No‑cost EMIs backed by mutual funds
        </motion.div>

        <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
          Shop today <span className="italic font-light text-gray-500">Pay later</span> using
          <span className="block text-[#6c28d9]">mutual funds.</span>
        </h1>

        <p className="mt-4 text-gray-600">
          No <span className="font-semibold">credit</span> score required. No <span className="font-semibold">interest</span>.<br />
          Fully backed by your <span className="font-semibold">investments</span>.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="rounded-xl px-4 py-2 cursor-pointer text-white bg-[#6c28d9] hover:bg-[#6c28d9]">
            Check Eligibility
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>

          <Button variant="outline" className="rounded-xl cursor-pointer border-[#6c28d9] text-[#6c28d9]">
            <Search className="w-4 h-4 mr-1" /> Start Shopping
          </Button>
        </div>
      </section>


      {/* Footer */}
      <footer className=" py-10 bg-white/70 ">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm text-gray-600">
          <div>
            <img src="/1fi.svg" width={40} height={40} className="rounded-md"/>
            <p>Shop smarter with investment‑backed pay‑later EMIs.</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-gray-900">Company</p>
            <ul className="space-y-1">
              <li><a href="#about" className="hover:text-[#6c28d9]">About</a></li>
              <li><a href="#how" className="hover:text-[#6c28d9]">How it Works</a></li>
              <li><a href="#faqs" className="hover:text-[#6c28d9]">FAQs</a></li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-gray-900">Support</p>
            <ul className="space-y-1">
              <li><a href="#contact" className="hover:text-[#6c28d9]">Contact</a></li>
              <li><a href="#" className="hover:text-[#6c28d9]">Terms</a></li>
              <li><a href="#" className="hover:text-[#6c28d9]">Privacy</a></li>
            </ul>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
