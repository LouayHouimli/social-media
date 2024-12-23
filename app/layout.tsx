// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { HomeNav } from "@/components/home-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/theme-toggle";
import { GrTwitter } from "react-icons/gr";
const fontHeading = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {session ? (
            <>
              <main className="w-[1012px] flex flex-col items-center mx-auto min-h-screen border-l-2 border-r-2">
                <div className="flex items-center justify-between w-full py-1 px-5">
                  <div className="flex items-center gap-x-2">
                    <GrTwitter className="w-8 h-8 text-primary" />
                  </div>

                  <HomeNav />

                  <ModeToggle />
                </div>

                {children}
              </main>
            </>
          ) : (
            children
          )}

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
