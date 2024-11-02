
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Theme from "./context/ThemeContext";
import Header from "./components/Header";
import { SessionWrapper } from "./components/SessionWrapper";
import ReduxProvider from "./store/provider";
const inter = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sri SK Home Appliances",
  description: "Shop premium home appliances for kitchen, laundry, and more. Enjoy great deals, fast shipping, and exceptional customer service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{  
  
  return (
    <html lang="en" suppressHydrationWarning>
     
      <body className={`${inter.className} bg-[#FFFFFF] dark:text-[#E0E0E0] dark:bg-gray-900 text-[#333333]`}      >
      <SessionWrapper>
      <Theme>
        <ReduxProvider>
        <Header />
        {children}
        </ReduxProvider>
        </Theme>
        </SessionWrapper>
        </body>
   
    </html>
  );
}
