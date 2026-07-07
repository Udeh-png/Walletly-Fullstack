import { Navbar } from "@/components/shared/NavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Navbar />

      <div className="w-full md:ml-65">{children}</div>
    </div>
  );
}
