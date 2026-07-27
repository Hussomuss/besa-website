"use client";

export default function Error({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32">
      <h1 className="font-display text-h2 font-light">Something went wrong.</h1>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="font-sans text-label uppercase underline"
      >
        Try again
      </button>
    </main>
  );
}
