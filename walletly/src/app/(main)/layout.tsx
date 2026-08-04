import { Nav } from "@/components/shared/Nav";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Nav />

      <div className="w-full md:ml-65 min-[768px]:pb-0 pb-19">{children}</div>
    </div>
  );
}
