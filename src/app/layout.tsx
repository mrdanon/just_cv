import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Piotr Dankowiakowski - Senior 3D Artist & AI Specialist | Professional CV",
  description: "Professional CV of Piotr Dankowiakowski - Senior 3D Artist & AI Specialist with 6+ years experience in Blender, ConvAI, Machine Learning, and Educational Technology. Download ATS-optimized PDF CV. Based in Warsaw, Poland.",
  keywords: "Piotr Dankowiakowski, 3D Artist, AI Specialist, Blender, ConvAI, Educational Technology, Machine Learning, Deep Learning, Python, JavaScript, React, TypeScript, Next.js, Architectural Visualization, Animation, Rendering, GPU Acceleration, YouTube Creator, Warsaw Poland, Senior 3D Artist, AI Developer, Game Development, VR, Virtual Reality, Interactive Media, Digital Arts, CV, Resume",
  authors: [{ name: "Piotr Dankowiakowski" }],
  creator: "Piotr Dankowiakowski",
  publisher: "Piotr Dankowiakowski",
  category: "technology",
  classification: "Professional CV",
  referrer: "origin-when-cross-origin",
  openGraph: {
    title: "Piotr Dankowiakowski - Senior 3D Artist & AI Specialist | Professional CV",
    description: "Professional CV of Piotr Dankowiakowski - Senior 3D Artist & AI Specialist with 6+ years experience in Blender, ConvAI, Machine Learning, and Educational Technology. Based in Warsaw, Poland.",
    url: "https://www.piotr.danon.site",
    siteName: "Piotr Dankowiakowski Professional CV",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/MyPhoto.jpg",
        width: 800,
        height: 600,
        alt: "Piotr Dankowiakowski - Professional Photo - Senior 3D Artist & AI Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Piotr Dankowiakowski - Senior 3D Artist & AI Specialist | Professional CV",
    description: "Professional CV of Piotr Dankowiakowski - Senior 3D Artist & AI Specialist with 6+ years experience in Blender, ConvAI, Machine Learning, and Educational Technology. Based in Warsaw, Poland.",
    images: ["/MyPhoto.jpg"],
    creator: "@doctor.blender",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://www.piotr.danon.site"),
  alternates: {
    canonical: "https://www.piotr.danon.site",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
