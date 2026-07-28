import { Main } from "@/shared/layout/main";
import { Container } from "@/shared/ui/container";

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Main ground="bone" className="py-32">
      <Container size="prose">{children}</Container>
    </Main>
  );
}
