'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Sparkles, User } from "lucide-react";
import { motion } from "framer-motion";

// Production‑grade, responsive landing page inspired by the provided design.
// Tailwind + shadcn/ui + motion + clean grid layout.

export default function MutualFundsLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMzQyIiBoZWlnaHQ9IjM0MiIgdmlld0JveD0iMCAwIDM0MiAzNDIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzNDIiIGhlaWdodD0iMzQyIiBmaWxsPSIjNkMyOEQ5Ii8+CjxwYXRoIGQ9Ik05OSAxMTAuMTQyTDExMy4xNDIgOTZMMTQ1LjgzMiAxMjguNjlDMTQ5LjczNyAxMzIuNTk1IDE0OS43MzcgMTM4LjkyNiAxNDUuODMyIDE0Mi44MzJDMTQxLjkyNiAxNDYuNzM3IDEzNS41OTUgMTQ2LjczNyAxMzEuNjkgMTQyLjgzMkw5OSAxMTAuMTQyWiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC41Ii8+CjxwYXRoIGQ9Ik0xMDYuOTE1IDk0QzExMi40MzggOTQgMTE2LjkxNSA5OC40NzcyIDExNi45MTUgMTA0VjI1MEg5Ni45MTVWMTI4LjA0NUw4MS4yMTE5IDE0My43NDhDNzcuMzA2NyAxNDcuNjUzIDcwLjk3NDYgMTQ3LjY1MyA2Ny4wNjkzIDE0My43NDhDNjMuMTY0MyAxMzkuODQzIDYzLjE2NDUgMTMzLjUxMiA2Ny4wNjkzIDEyOS42MDZMOTkuNzU4OCA5Ni45MTZMOTkuODA3NiA5Ni45NjQ4QzEwMS42MiA5NS4xMzM5IDEwNC4xMzUgOTQuMDAwMSAxMDYuOTE1IDk0Wk0yMzEuOTE1IDk0QzIzNy40MzggOTQgMjQxLjkxNSA5OC40NzcyIDI0MS45MTUgMTA0QzI0MS45MTUgMTA5LjUyMyAyMzcuNDM4IDExNCAyMzEuOTE1IDExNEgxNzQuOTE1VjE2MkgyMTkuOTE1QzIyNS40MzggMTYyIDIyOS45MTUgMTY2LjQ3NyAyMjkuOTE1IDE3MkMyMjkuOTE1IDE3Ny41MjMgMjI1LjQzOCAxODIgMjE5LjkxNSAxODJIMTc0LjkxNVYyNTBIMTU0LjkxNVY5NEgyMzEuOTE1Wk0yNzEuOTE1IDEzOS4wNTRDMjc3LjQzOCAxMzkuMDU0IDI4MS45MTUgMTQzLjUzMSAyODEuOTE1IDE0OS4wNTRWMjUwSDI2MS45MTVWMTQ5LjA1NEMyNjEuOTE1IDE0My41MzEgMjY2LjM5MiAxMzkuMDU0IDI3MS45MTUgMTM5LjA1NFpNMjgxLjk5NyAxMDRDMjgxLjk5NyAxMDkuNTIzIDI3Ny41MiAxMTQgMjcxLjk5NyAxMTRDMjY2LjQ3NCAxMTQgMjYxLjk5NyAxMDkuNTIzIDI2MS45OTcgMTA0QzI2MS45OTcgOTguNDc3MiAyNjYuNDc0IDk0LjAwMDEgMjcxLjk5NyA5NEgyODEuOTk3VjEwNFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="
              alt="Logo"
              className="w-9 h-9 rounded-2xl object-contain"
            />
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <a className="hover:text-purple-700" href="/loan-applications">Loan Applications</a>
              <a className="hover:text-purple-700" href="/loan-products">Loan Products</a>
              <a className="hover:text-purple-700" href="/loans">Loans</a>
              <a className="hover:text-purple-700" href="/create-application">Create Application</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl">
              <User className="w-4 h-4 mr-1" /> Login
            </Button>
            <Button className="rounded-xl bg-purple-600 hover:bg-purple-700">
              Check Eligibility
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </header>

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
