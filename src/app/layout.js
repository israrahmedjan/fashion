import { Poppins } from "next/font/google";
import "./globals.css";
import Mainheader from "@/components/header/header";
import Mainfooter from "@/components/footer/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});



export const metadata = {
  title: "Online Affiliate",
  description: "Online Affiliate management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={`${poppins.variable} font-poppins`}>
  
        <Mainheader />
        {children}
      <Mainfooter />
      </body>
    </html>
  );
}
