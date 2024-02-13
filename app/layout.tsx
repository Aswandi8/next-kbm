import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import AuthProvider from "@/context/authProvider";
import { ContextProvider } from "@/context/ContextProvider";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "KBM",
  description: "PT KHALIFAH BORNEO MANDIRI",
  icons: {
    icon: "/assets/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Toaster position="top-right" reverseOrder={false} />
            <ContextProvider>{children}</ContextProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
