import { Button } from "@/shared/ui/button";
import { Heading } from "@/shared/ui/heading";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-32 text-center">
      <Heading as="h1" size="h2" className="text-balance">
        This page does not exist.
      </Heading>
      <Button href="/">Return home</Button>
    </main>
  );
}
