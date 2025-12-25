import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "LAMF LMS",
  description: "NBFC Loan Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-surface text-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
