"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Search,
  Sparkles,
  Zap,
  TrendingUp,
  RefreshCcw,
  ShieldCheck,
  Tag,
  Clock,
  Instagram,
  Github,
  Linkedin,
  Twitter,
  X,
} from "lucide-react";
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
          <Sparkles className="w-3 h-3" />
          New — No-cost EMIs backed by mutual funds
        </motion.div>

        <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
          Shop today{" "}
          <span className="italic font-light text-gray-500">Pay later</span> using
          <span className="block text-[#6c28d9]">mutual funds.</span>
        </h1>

        <p className="mt-4 text-gray-600">
          No <span className="font-semibold">credit</span> score required. No{" "}
          <span className="font-semibold">interest</span>.
          <br />
          Fully backed by your <span className="font-semibold">investments</span>.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="rounded-xl px-4 py-2 cursor-pointer text-white bg-[#6c28d9] hover:bg-[#6c28d9]">
            Check Eligibility
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>

          <Button
            variant="outline"
            className="rounded-xl cursor-pointer border-[#6c28d9] text-[#6c28d9]"
          >
            <Search className="w-4 h-4 mr-1" /> Start Shopping
          </Button>
        </div>
      </section>

      {/* HOW IT WORKS (Benefits Grid) */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-semibold">
            The <span className="italic font-light text-gray-500">Smartest way</span> to{" "}
            <span className="text-[#6c28d9] font-bold">Spend & Keep Earning</span>
          </h2>

          <Button
            variant="outline"
            className="rounded-xl cursor-pointer border-[#6c28d9] text-[#6c28d9]"
          >
            Shop Now <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <Card icon={<Zap />} title="Instant approvals"
            desc="Get your eligible credit limit in minutes with a fully digital onboarding — no branch visits, no waiting." />

          <Card icon={<TrendingUp />} title="Continue getting returns on your investment"
            desc="Your mutual funds remain invested and continue compounding while you borrow." />

          <Card icon={<RefreshCcw />} title="Zero Downpayment"
            desc="No downpayment required for purchasing any of the products." />

          <Card icon={<ShieldCheck />} title="0% interest"
            desc="Get your favourite products on No-cost EMIs." />

          <Card icon={<Tag />} title="Zero Foreclosure charges"
            desc="Close your loan anytime by just paying the outstanding amount." />

          <Card icon={<Clock />} title="Long EMI tenures"
            desc="Select EMI tenures from 3 months to 10 years without any CIBIL check." />

        </div>
      </section>

      {/* ⭐ NEW SECTION — 4 Step Flow */}
      <section className="max-w-7xl mx-auto px-4 pb-24">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Shop using <span className="italic font-light text-gray-500">mutual funds</span><br />
            in <span className="text-[#6c28d9] font-bold">4 easy steps</span>
          </h2>

          <Button className="rounded-xl px-4 py-2 bg-[#6c28d9] hover:bg-[#6c28d9] text-white">
            Check Eligibility <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="rounded-3xl border border-purple-200 overflow-hidden">

          <div className="grid md:grid-cols-2">
            
            {/* STEP 01 */}
            <Step
              number="01."
              gradient
              title="Choose product & payment plan"
              desc="Select EMI tenures from 3 months to 10 years for your favourite devices"
            />

            {/* STEP 02 */}
            <Step
              number="02."
              title="Check your eligibility"
              desc="Get your eligibility checked within 10 seconds using your PAN and mobile number"
            />
          </div>

          <div className="border-t border-purple-200 grid md:grid-cols-2">

            {/* STEP 03 */}
            <Step
              number="03."
              title="Pledge mutual funds"
              desc="Pledge your mutual funds seamlessly and securely via CAMS, KFin, or MFCentral"
            />

            {/* STEP 04 */}
            <Step
              number="04."
              title="Complete your purchase"
              desc="Have your device delivered, repay the amount at your own terms"
            />
          </div>
        </div>
      </section>

{/* Footer */}
<footer className="py-20 bg-[#f7f8fa]">
  <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm text-gray-600">

    {/* Brand + Social */}
    <div>
      <img src="/1fi.svg" width={40} height={40} className="rounded-md mb-2" />
      <p>Shop smarter with investment-backed pay-later EMIs.</p>

      <div className="flex items-center gap-3 mt-4">
        <a href="#" className="p-2 rounded-lg border border-purple-200 hover:border-[#6c28d9] hover:text-[#6c28d9] transition">
          <X className="w-4 h-4" />
        </a>

        <a href="#" className="p-2 rounded-lg border border-purple-200 hover:border-[#6c28d9] hover:text-[#6c28d9] transition">
          <Linkedin className="w-4 h-4" />
        </a>

        <a href="#" className="p-2 rounded-lg border border-purple-200 hover:border-[#6c28d9] hover:text-[#6c28d9] transition">
          <Instagram className="w-4 h-4" />
        </a>

        <a href="#" className="p-2 rounded-lg border border-purple-200 hover:border-[#6c28d9] hover:text-[#6c28d9] transition">
          <Github className="w-4 h-4" />
        </a>
      </div>
    </div>

    {/* Company */}
    <div className="space-y-2">
      <p className="font-semibold text-gray-900">Company</p>
      <ul className="space-y-1">
        <li><a href="#about" className="hover:text-[#6c28d9]">About</a></li>
        <li><a href="#how" className="hover:text-[#6c28d9]">How it Works</a></li>
        <li><a href="#faqs" className="hover:text-[#6c28d9]">FAQs</a></li>
      </ul>
    </div>

    {/* Support */}
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

/* Feature Card */
function Card({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-3xl bg-white border border-purple-100 p-6 shadow-[0_10px_30px_-10px_rgba(108,40,217,0.15)]"
    >
      <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-[#6c28d9] mb-3">
        <span className="w-5 h-5">{icon}</span>
      </div>

      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* Step Row */
function Step({ number, title, desc, gradient = true }) {
  return (
    <div
      className={
        "p-8 md:p-10 " +
        (gradient
          ? "bg-linear-to-r from-purple-50 via-white to-white"
          : "bg-white")
      }
    >
      <p className="text-3xl font-semibold text-[#6c28d9] mb-2">{number}</p>

      <h4 className="font-semibold text-gray-900">{title}</h4>

      <p className="text-gray-600 text-sm mt-1">
        {desc}
      </p>
    </div>
  );
}
