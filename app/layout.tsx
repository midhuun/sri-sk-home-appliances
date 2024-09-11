import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Theme from "./context/ThemeContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sri SK Home Appliances",
  description: "Shop premium home appliances for kitchen, laundry, and more. Enjoy great deals, fast shipping, and exceptional customer service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
     
      <body className={`${inter.className} bg-[#FFFFFF] dark:text-[#E0E0E0] dark:bg-[#121212] text-[#333333]`}      >
      <Theme>
        {children}
        </Theme>
        </body>
   
    </html>
  );
}
