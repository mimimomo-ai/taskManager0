"use client"; // Ensure it's a Client Component

import Sidebar from "../Components/Sidebar/Sidebar";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up"; // Hide sidebar for auth pages

  return (
    <>
      {!isAuthPage && <Sidebar />}
      {children}
    </>
  );
}
