import { Noto_Sans, Noto_Sans_Telugu } from "next/font/google";
import "../globals.css";

const notoSans = Noto_Sans({ variable: "--font-noto-sans", subsets: ["latin"] });
const notoTelugu = Noto_Sans_Telugu({ variable: "--font-noto-telugu", subsets: ["telugu"] });

export const metadata = {
  title: "Admin Panel",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminRootLayout({ children }) {
  return (
    <html lang="en" className={`${notoSans.variable} ${notoTelugu.variable} antialiased`}>
      <body className="min-h-screen bg-canvas font-sans">{children}</body>
    </html>
  );
}
