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
  title: "QuickSquad | Consultation Services for Everyday Decisions",
  description:
    "QuickSquad connects you with specialists across financial, travel, legal, digital, healthcare, shopping, and career consultations whenever you need reliable guidance.",
  keywords: [
    "consultation services",
    "online consultation",
    "expert guidance",
    "financial assistance",
    "travel assistance",
    "legal guidance",
    "digital services",
    "career guidance",
    "consumer assistance",
    "QuickSquad",
  ],
  authors: [{ name: "QuickSquad", url: "https://quicksquad.live" }],
  openGraph: {
    title: "QuickSquad | 24/7 Consultation Services Across Everyday Needs",
    description:
      "Connect instantly with specialists for everyday guidance across finance, travel, digital accounts, legal forms, shopping, healthcare, and career decisions.",
    url: "https://quicksquad.live/",
    siteName: "QuickSquad",
    images: [
      {
        url: "https://quicksquad.live/images/quicksquad_og.png",
        width: 1200,
        height: 630,
        alt: "QuickSquad Consultation Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickSquad | 24/7 Consultation Services",
    description:
      "Instant help from specialists for financial, travel, digital, legal, shopping, healthcare, and career questions.",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18376694937"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18376694937');
          `}
        </Script>
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
