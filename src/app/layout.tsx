import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies, headers } from "next/headers";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Script from "next/script";
import ChatWidget from "@/components/ChatWidget";
import HeaderAu from "@/components/Header/HeaderAu";
import HeaderUs from "@/components/Header/HeaderUs";
import FooterAu from "@/components/Footer/FooterAu";
import FooterUs from "@/components/Footer/FooterUs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickSquad | 24/7 Online Tech Support & Troubleshooting Services",
  description:
    "QuickSquad offers 24/7 online tech support for computers, Wi-Fi, software, and devices. Get instant remote assistance from certified experts anytime, anywhere.",
  keywords: [
    "tech support",
    "online tech support",
    "remote assistance",
    "computer troubleshooting",
    "software help",
    "Wi-Fi repair",
    "printer setup",
    "device optimization",
    "IT help",
    "QuickSquad",
  ],
  authors: [{ name: "QuickSquad", url: "https://quicksquad.live" }],
  openGraph: {
    title: "QuickSquad | 24/7 Online Tech Support & Troubleshooting Experts",
    description:
      "Connect instantly with certified specialists for quick fixes to your computer, software, and internet issues — available 24/7.",
    url: "https://quicksquad.live/",
    siteName: "QuickSquad",
    images: [
      {
        url: "https://quicksquad.live/images/quicksquad_og.png",
        width: 1200,
        height: 630,
        alt: "QuickSquad Tech Support",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickSquad | 24/7 Tech Support & Troubleshooting Experts",
    description:
      "Instant help from certified specialists for all your tech issues — computers, Wi-Fi, and more.",
    images: ["https://quicksquad.live/images/quicksquad_og.png"],
    creator: "@QuickSquad",
  },
  alternates: {
    canonical: "https://quicksquad.live/",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const cookieStore = await cookies();
const headerStore = await headers();

const countryHeader = headerStore.get("x-country");
const country = countryHeader || cookieStore.get("country")?.value;


  // Select proper header
  const HeaderComponent =
    country === "AU"
      ? HeaderAu
      : country === "US"
      ? HeaderUs
      : Navbar; // default

  // Select proper footer
  const FooterComponent =
    country === "AU"
      ? FooterAu
      : country === "US"
      ? FooterUs
      : Footer; // default

  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <HeaderComponent />
        {children}
        <ChatWidget />
        <FooterComponent />
      </body>
    </html>
  );
}
