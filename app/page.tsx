import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  console.log(session?.user.isAdmin);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? (
        <>
          <p className="text-primary-foreground">{JSON.stringify(session)}</p>
          <LogoutButton />
        </>
      ) : (
        <Link href="/signin">Sign in</Link>
      )}
    </main>
  );
}
