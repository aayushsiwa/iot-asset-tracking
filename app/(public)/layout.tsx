import { Inter } from "next/font/google";
import { Metadata } from "next";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useEffect(() => {
  //     setPath(router.pathname);
  // }, [router.pathname]);

  return <>{children}</>;
}
