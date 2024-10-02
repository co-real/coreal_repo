import type { Metadata } from "next";
import "./global.css";
import Navbar from "./components/Navbar";

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
      <body className="bg-gray-100 h-screen">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
