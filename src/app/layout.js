import "./globals.css";

// Next.js App Router වලට ගැලපෙන විදිහට හරියටම SEO ටික හැදුවා
export const metadata = {
  title: "Honeyland Tours | Sri Lanka Personal Drivers & Private Chauffeur",
  description: "Book your reliable Sri Lanka personal drivers for custom island tours. Safe, professional private chauffeur services from Naula to Sigiriya, Ella & Kandy. Trusted by UK & European travelers.",
  keywords: "Sri Lanka personal drivers, private driver Sri Lanka, Sri Lanka chauffeur tours, hire driver in Sri Lanka, tourist driver Sri Lanka, Honeyland Tours Naula",
  authors: [{ name: "Honeyland Tours" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}