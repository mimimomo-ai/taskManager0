import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Required `config` export to apply the middleware
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // Ensures middleware runs for all routes except Next.js internals
};