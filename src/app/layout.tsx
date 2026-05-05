import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import { Cursor } from "@/components/Cursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackgroundController } from "@/components/BackgroundController";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shivam Verma — Full-stack developer",
  description:
    "CS grad based in Winnipeg shipping web apps and AI automation. Open to junior SWE roles.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${grotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <BackgroundController />
          <ScrollProgress />
          <Cursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
