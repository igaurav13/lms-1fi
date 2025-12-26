'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Sparkles, User } from "lucide-react";
import { motion } from "framer-motion";

// Production‑grade, responsive landing page inspired by the provided design.
// Tailwind + shadcn/ui + motion + clean grid layout.

export default function MutualFundsLandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 via-white to-white">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium"
        >
          <Sparkles className="w-3 h-3" /> New — No‑cost EMIs backed by mutual funds
        </motion.div>

        <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
          Shop today <span className="italic font-light text-gray-500">Pay later</span> using
          <span className="block text-purple-700">mutual funds.</span>
        </h1>

        <p className="mt-4 text-gray-600">
          No <span className="font-semibold">credit</span> score required. No <span className="font-semibold">interest</span>.<br />
          Fully backed by your <span className="font-semibold">investments</span>.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="rounded-xl bg-purple-600 hover:bg-purple-700">
            Check Eligibility
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>

          <Button variant="outline" className="rounded-xl">
            <Search className="w-4 h-4 mr-1" /> Start Shopping
          </Button>
        </div>
      </section>

      {/* Product Sections */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          <CategoryColumn title="Featured Products" items={featured} />
          <CategoryColumn title="Best Sellers" items={bestsellers} />
          <CategoryColumn title="Best Deals" items={bestdeals} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 bg-white/70">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm text-gray-600">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white grid place-content-center font-bold mb-2">1Fi</div>
            <p>Shop smarter with investment‑backed pay‑later EMIs.</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-gray-900">Company</p>
            <ul className="space-y-1">
              <li><a href="#about" className="hover:text-purple-700">About</a></li>
              <li><a href="#how" className="hover:text-purple-700">How it Works</a></li>
              <li><a href="#faqs" className="hover:text-purple-700">FAQs</a></li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-gray-900">Support</p>
            <ul className="space-y-1">
              <li><a href="#contact" className="hover:text-purple-700">Contact</a></li>
              <li><a href="#" className="hover:text-purple-700">Terms</a></li>
              <li><a href="#" className="hover:text-purple-700">Privacy</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CategoryColumn({ title, items }) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3 text-center md:text-left">{title}</h3>
      <div className="space-y-4">
        {items.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-20 h-16 rounded-xl bg-gray-100 overflow-hidden">
                  <img src={p.image} alt={p.title} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{p.title}</p>
                  <p className="text-xs text-gray-500">0% interest • Instant approval</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Replace with your real product images/URLs in production
const featured = [
  { title: "Google Pixel 10", image: "/images/pixel.png" },
  { title: "iPhone 17", image: "/images/iphone17.png" },
];

const bestsellers = [
  { title: "iPhone 17 Pro Max", image: "/images/iphone17pro.png" },
  { title: "Galaxy S25 Ultra", image: "/images/s25.png" },
];

const bestdeals = [
  { title: "MacBook Pro", image: "/images/macbook.png" },
  { title: "OnePlus 15", image: "/images/oneplus.png" },
];
