import {
  AirtimeIcon,
  DepositIcon,
  BillsIcon,
  ReceiveIcon,
  TransferIcon,
  WithdrawIcon,
} from "@/components/shared/transaction_icons";
import { FaArrowRight } from "react-icons/fa6";

const quickActions = [
  {
    Icon: DepositIcon,
    name: "Add Money",
    subTitle: "Top up wallet",
  },
  {
    Icon: TransferIcon,
    name: "Transfer",
    subTitle: "To wallet",
  },

  {
    Icon: WithdrawIcon,
    name: "Withdraw",
    subTitle: "To any bank",
  },

  {
    Icon: ReceiveIcon,
    name: "Receive",
    subTitle: "Share acc info",
  },

  {
    Icon: BillsIcon,
    name: "Pay Bills",
    subTitle: "Pay utility bills",
  },

  {
    Icon: AirtimeIcon,
    name: "Buy Airtime",
    subTitle: "Top up mobile",
  },
];

export const QuickActionsSection = () => {
  return (
    <section className="border-2 border-white/10 rounded-2xl p-4 sm:p-5 mt-5">
      <h3 className="text-xl font-semibold">Quick Actions</h3>

      <div className="mt-4 sm:mt-5 grid grid-cols-3 max-[1285px]:grid-cols-3 gap-3 sm:gap-x-3 sm:gap-y-4">
        {quickActions.map((action, i) => (
          <div
            className="max-[580]:border-2 border-2 border-white/10 rounded-lg p-3 flex max-[580]:flex-col items-center justify-start gap-3 cursor-pointer hover:bg-[rgba(21,20,31,0.7)] transition-all max-[580]:px-0 max-[580]:py-2"
            key={i}
          >
            <action.Icon />
            <div className="flex flex-col items-start max-[580]:items-center">
              <p className="text-sm">{action.name}</p>
              <p className="max-[580]:hidden text-xs text-white/65 mt-1">
                {action.subTitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 text-sm text-primary mt-7 cursor-pointer">
        <p>View all actions</p>
        <FaArrowRight />
      </div>
    </section>
  );
};
