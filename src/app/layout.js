import "./globals.css";

export const metadata = {
  title: "LAMF LMS",
  description: "NBFC Loan Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-surface text-ink">
        {children}
      </body>
    </html>
  );
}
