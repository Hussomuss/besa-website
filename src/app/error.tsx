"use client";

import { Button } from "@/shared/ui/button";
import { Heading } from "@/shared/ui/heading";

export default function Error({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-32 text-center">
      <Heading as="h1" size="h2" className="text-balance">
        Something went wrong.
      </Heading>
      <Button type="button" on="bone" onClick={() => unstable_retry()}>
        Try again
      </Button>
    </main>
  );
}
