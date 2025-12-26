import Navbar from "@/components/navbar";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "1fi",
  description: "NBFC Loan Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
            <head>
        <link rel="icon" href="/1fi.svg" type="image/svg+xml" />
      </head>
      <body className="bg-surface text-ink">
        
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

