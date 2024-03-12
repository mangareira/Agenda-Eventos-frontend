import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SideBar } from "./components/SideBar";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agendamento Eventos",
  description: "A agenda dos eventos da Unicentroma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <ToastContainer/>
        <SideBar/>
        <NavBar/>
        <div className="mb-8 mt-16 mr-14">
          {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
