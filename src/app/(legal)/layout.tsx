export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-32 md:px-10">
      {children}
    </main>
  );
}
