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
  title: "Piotr Dankowiakowski - Senior 3D Artist & AI Specialist | CV",
  description: "Professional CV of Piotr Dankowiakowski - Senior 3D Artist, AI Specialist, and Educational Technology Expert based in Warsaw, Poland. 6+ years experience in 3D animation, Blender, AI development, and education.",
  keywords: "Piotr Dankowiakowski, 3D Artist, AI Specialist, Blender, Educational Technology, Warsaw, Poland, CV, Resume",
  authors: [{ name: "Piotr Dankowiakowski" }],
  creator: "Piotr Dankowiakowski",
  openGraph: {
    title: "Piotr Dankowiakowski - Senior 3D Artist & AI Specialist",
    description: "Professional CV showcasing 6+ years of experience in 3D animation, AI development, and educational technology.",
    url: "https://www.piotr.danon.site",
    siteName: "Piotr Dankowiakowski CV",
    locale: "en_US",
    type: "website",
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
