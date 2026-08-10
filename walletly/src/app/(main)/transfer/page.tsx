import { TabChangeContextProvider } from "@/contexts/TransferTabChangeContext";
import { BalanceSection } from "@/sections/transfer/BalanceSection";
import { BeneficiariesSidebar } from "@/sections/transfer/BeneficiariesSidebar";
import { TransferForm } from "@/sections/transfer/TransferForm";
import { TransferTabButtons } from "@/sections/transfer/TransferTabButtons";

export default function TransferPage() {
  return (
    <TabChangeContextProvider>
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-5">
          <BalanceSection />

          <TransferTabButtons />

          <TransferForm />
        </div>

        <BeneficiariesSidebar />
      </div>
    </TabChangeContextProvider>
  );
}
