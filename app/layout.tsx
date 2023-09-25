import "./css/globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Navigation from "@/components/organisms/Navigation";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Epoxy Crafts",
  description: "A website for beautiful products made of wood and epoxy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}
