import { BalanceSection } from "@/sections/dashboard/balance-section";
import { PaymentMethodsSection } from "@/sections/dashboard/payment_methods-section";
import { QuickActionsSection } from "@/sections/dashboard/quick_actions-section";

export default function Page() {
  return (
    <div>
      <p className="md:text-3xl text-2xl md:font-semibold font-bold">
        Hello, John! 👋
      </p>
      <p className="text-white/65 text-sm md:mt-2">
        Broke ahh nigg no be your mate get 7 figures
      </p>

      <BalanceSection />

      <div className="grid max-[1145px]:grid-cols-1 grid-cols-[1.5fr_1fr] gap-x-5">
        <QuickActionsSection />

        <PaymentMethodsSection />
      </div>
    </div>
  );
}
