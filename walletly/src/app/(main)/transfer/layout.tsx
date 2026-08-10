import { BalanceSection } from "@/sections/transfer/BalanceSection";
import { BeneficiariesSidebar } from "@/sections/transfer/BeneficiariesSidebar";
import { TransferTabButtons } from "@/sections/transfer/TransferTabButtons";

export default function TransferPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
      <form>
        <div className="grid gap-5">
          <BalanceSection />

          <TransferTabButtons />

          {children}
        </div>
      </form>

      <BeneficiariesSidebar />
    </div>
  );
}
