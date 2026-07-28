import { Container } from "@/shared/ui/container";

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-1 py-32">
      <Container size="prose">{children}</Container>
    </main>
  );
}
