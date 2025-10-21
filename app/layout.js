import { Raleway } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "./_components/ToastProvide";
const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["400", "500", "600", "700"], // you can adjust if you want
});

export const metadata = {
  title: "Favourite Songs App",
  description: "User Auth system using NextAuth & Prisma",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable}  font-sans antialiased bg-gray-50 text-gray-900`}
      >
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
