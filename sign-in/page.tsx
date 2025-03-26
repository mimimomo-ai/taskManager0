"use client"
import { SignIn, useUser } from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const {isSignedIn} = useUser();
  const router = useRouter();

  useEffect(() => {
  if (isSignedIn) {
    router.push("http://localhost:3000/");
  }
}, [isSignedIn, router]);

return <SignIn/>
}
