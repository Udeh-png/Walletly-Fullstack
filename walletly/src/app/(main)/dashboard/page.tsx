"use client";

import { BalanceSection } from "@/sections/dashboard/balance-section";
import { MoneyFlowCard } from "@/sections/dashboard/money_flow-section";
import { PaymentMethodsSection } from "@/sections/dashboard/payment_methods-section";
import { QuickActionsSection } from "@/sections/dashboard/quick_actions-section";
import { RecentTransactions } from "@/sections/dashboard/recent_transactions-section";
import { Pie, PieChart } from "recharts";

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

      <RecentTransactions />

      <div className="grid grid-cols-[1fr_1.5fr] gap-x-5 mt-5">
        <div className="flex flex-col gap-y-5">
          <MoneyFlowCard
            change={12.8}
            figure={120_000}
            state="good"
            type="In"
          />

          <MoneyFlowCard change={5.3} figure={70_000} state="bad" type="Out" />
        </div>

        <div className="grid grid-cols-[auto_1fr] items-center border-2 border-white/10 rounded-2xl p-4 sm:p-5">
          <div className="size-70">
            <PieChart
              style={{
                width: "100%",
                maxWidth: "500px",
                maxHeight: "80vh",
                aspectRatio: 1,
              }}
            >
              <Pie
                data={[{ value: 100 }, { value: 200 }, { value: 300 }]}
                labelLine={false}
                fill="var(--primary-color)"
                dataKey="value"
                innerRadius={"65%"}
                outerRadius={"100%"}
                isAnimationActive={true}
                className="outline-0"
                // shape={MyCustomPie}
              />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}
