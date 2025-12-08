import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CardNav, { CardNavItem } from "../Components/CardNav/CardNav";
import ScrollbarTracker from "../Components/ScrollbarTracker/ScrollbarTracker";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edosh",
  description: "An educational shell for linux",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items: CardNavItem[] = [
    {
      label: "home.",
      bgColor: "#39171033",
      textColor: "#fff",
      links: [
        { label: "home", href: "/", ariaLabel: "Home" },
        { label: "showcase", href: "/#showcase", ariaLabel: "Showcase" },
        { label: "about", href: "/#about", ariaLabel: "About" },
        { label: "features", href: "/#features", ariaLabel: "Features" },
      ],
    },
    {
      label: "documentation.",
      bgColor: "#78342633",
      textColor: "#fff",
      links: [
        { label: "installation", href: "/install", ariaLabel: "Installation Guide" },
        { label: "requirements", href: "/install#requirements", ariaLabel: "System Requirements" },
        { label: "methods", href: "/install#methods", ariaLabel: "Installation Methods" },
        { label: "troubleshooting", href: "/install#troubleshooting", ariaLabel: "Troubleshooting" },
      ],
    },
    {
      label: "contact.",
      bgColor: "#FF654633",
      textColor: "#fff",
      links: [
        { label: "sagnik.singha@outlook.com", href: "mailto:sagnik.singha@outlook.com", ariaLabel: "Email us" },
        { label: "portfolio", href: "https://sagniksingha.vercel.app", ariaLabel: "Portfolio" },
        { label: "linkedIn", href: "https://linkedin.com/in/sagnik-singha-vit", ariaLabel: "LinkedIn" },
      ],
    },
  ];

  // Using an SVG from the public folder as the logo path
  // Render text logo instead of an image
  const logoText = "edosh";

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ScrollbarTracker />
        <CardNav
          logoText={logoText}
          logoAlt="Company Logo"
          items={items}
          baseColor="#fff"
          menuColor="#000"
          buttonBgColor="#FF6546"
          buttonTextColor="#fff"
          ease="power3.out"
          className="fixed"
        />

        {children}
        <Analytics />
      </body>
    </html>
  );
}
