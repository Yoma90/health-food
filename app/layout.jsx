import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Healthdonals",
  description: "Start eating healthy burger.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "antialiased",
          geistMono.variable,
          geistSans.variable,
          "h-full"
        )}
      >
        <Toaster />
        <div className="m-auto flex h-screen max-w-md flex-col border-x">
          <Header />
          <main className="max-h-[calc(100%_-_100px)] flex-1 p-4">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
