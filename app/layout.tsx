import { Inter } from "next/font/google";
import { Metadata } from "next";
import NavBar from "@/components/NavBar";
import "./globals.css";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/Theme";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/context/Query";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Asset Tracking",
  icons: {
    icon: "./favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useEffect(() => {
  //     setPath(router.pathname);
  // }, [router.pathname]);

  return (
    <>
      <html lang="en">
        <body className={`${inter.className} bg-white dark:bg-black`}>
          <ThemeProvider>
            <ReactQueryProvider>
              <AuthProvider>
                <NavBar />
                {children}
                <Footer />
                <Toaster richColors position="top-right" />
              </AuthProvider>
            </ReactQueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
