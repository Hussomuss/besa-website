import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32">
      <p className="font-sans text-label uppercase">404</p>
      <h1 className="font-display text-h2 font-light">
        This page does not exist.
      </h1>
      <Link href="/" className="font-sans text-label uppercase underline">
        Return home
      </Link>
    </main>
  );
}
