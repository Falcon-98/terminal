import type { Metadata } from "next";
import "./globals.css";

const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/terminal" : "";

export const metadata: Metadata = {
  title: "Falcon 98 Terminal",
  description:
    "Falcon 98 provides cutting-edge technology services to enhance your business. Explore our terminal for innovative solutions.",
  keywords: [
    "technology services",
    "Falcon 98",
    "terminal",
    "innovation",
    "business solutions",
    "cybersecurity",
    "Ashen Wijesingha",
  ],
  authors: [{ name: "Ashen Wijesingha" }],
  robots: "index, follow",
  openGraph: {
    title: "Falcon98 | Terminal",
    description:
      "Explore Falcon 98's terminal for innovative technology solutions.",
    url: "https://terminal.falcon98.com/",
    siteName: "Falcon 98 Terminal",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Falcon 98 Logo",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Falcon98 | Terminal",
    description:
      "Explore Falcon 98's terminal for innovative technology solutions.",
    images: ["/logo.png"],
  },
  icons: {
    icon: `${basePath}/logo.png`,
    shortcut: `${basePath}/logo.png`,
    apple: `${basePath}/logo.png`,
  },
  metadataBase: new URL("https://terminal.falcon98.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
