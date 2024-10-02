import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ReactQueryClientProvider } from "./components/ReactQueryClientProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryClientProvider>
          <main>
            <Navbar />
            {children}
          </main>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
