import { TabChangeContextProvider } from "@/contexts/TransferTabChangeContext";
import { BalanceSection } from "@/sections/transfer/BalanceSection";
import { BeneficiariesSidebar } from "@/sections/transfer/BeneficiariesSidebar";
import { TransferTabButtons } from "@/sections/transfer/TransferTabButtons";

export default function TransferPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TabChangeContextProvider>
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-5">
          <BalanceSection />

          <TransferTabButtons />

          {children}
        </div>

        <BeneficiariesSidebar />
      </div>
    </TabChangeContextProvider>
  );
}
