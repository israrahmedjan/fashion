import { Poppins,Montserrat,Cookie } from "next/font/google";
import "./globals.css";


import { ProvidersCustomization } from "@/redux/Providers";
import Header from "./_components/header/header";
import MainFooter from "./_components/footer/footer";



const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100','200','400', '500', '600', '700'], // optional weights
  variable: '--font-montserrat', // optional if you want to use CSS variable
  display: 'swap',
});

export const cookie = Cookie({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});


export const metadata = {
  title: "Fashion",
  description: "Fashion management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={`${montserrat.variable}`}>
  <ProvidersCustomization>
       <Header />
        {children}
      <MainFooter />
      </ProvidersCustomization>
      </body>
    </html>
  );
}
