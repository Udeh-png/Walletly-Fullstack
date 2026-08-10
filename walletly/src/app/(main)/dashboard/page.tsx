import DepositModalProvider from "@/contexts/DepositContext";
import { BalanceSection } from "@/sections/dashboard/balance-section";
import { MoneyFlowCard } from "@/sections/dashboard/money_flow-section";
import { PaymentMethodsSection } from "@/sections/dashboard/payment_methods-section";
import { QuickActionsSection } from "@/sections/dashboard/quick_actions-section";
import { RecentTransactions } from "@/sections/dashboard/recent_transactions-section";
import { SpendingOverview } from "@/sections/dashboard/spending_overview-section";

export default function Page() {
  return (
    <DepositModalProvider>
      <p className="md:text-3xl text-2xl md:font-semibold font-bold">
        Hello, Chisom! 👋
      </p>
      <p className="text-white/65 text-sm md:mt-2">
        Broke ahh nigg no be your mate get 7 figures
      </p>

      <BalanceSection />

      <div className="grid max-[1145px]:grid-cols-1 grid-cols-[1.5fr_1fr] gap-x-5">
        <QuickActionsSection />

        <PaymentMethodsSection />
      </div>

      <RecentTransactions />

      <div className="grid min-[955]:grid-cols-[1fr_1.5fr] gap-5 mt-5">
        <div className="flex flex-col justify-end gap-y-3">
          <h3 className="text-xl font-semibold mb-1">
            Capital Flow & Liquidity
          </h3>
          <div className="flex flex-col gap-y-5">
            <MoneyFlowCard
              change={12.8}
              figure={120_000}
              state="good"
              type="In"
            />

            <MoneyFlowCard
              change={5.3}
              figure={70_000}
              state="bad"
              type="Out"
            />
          </div>
        </div>

        <SpendingOverview />
      </div>
    </DepositModalProvider>
  );
}
