import {
  BillsIcon,
  ReceiveIcon,
  TransferIcon,
} from "@/components/shared/transaction_icons";
import { FaChevronRight } from "react-icons/fa6";

export const RecentTransactions = () => {
  return (
    <section className="border-2 border-white/10 rounded-2xl p-4 sm:p-5 mt-5">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Recent Transactions</h3>

        <p className="text-primary text-sm">
          View all <FaChevronRight className="inline ml-1" />
        </p>
      </div>
      <div className="mt-4 sm:mt-5 flex flex-col min-[500]:gap-y-0 gap-y-5">
        <div className="flex gap-x-2 min-[500]:gap-x-5 hover:bg-[rgba(21,20,31,0.7)] transition-all min-[500]:py-2 min-[500]:px-2 rounded-lg">
          <div>
            <TransferIcon />
          </div>

          <div className="flex flex-col flex-1">
            <div className="flex justify-between w-full gap-x-1">
              <p className="min-[500]:text-base text-sm line-clamp-1">
                Transfer to SANDRA DANIELS
              </p>
              <p className="min-[500]:text-base shrink-0 text-sm">
                -₦20,000.00
              </p>
            </div>

            <div className="flex justify-between items-center w-full mt-0">
              <p className="text-sm text-white/60">Jun 31th, 19:32:57</p>
              <p className="text-xs px-3 py-1 bg-green-500/10 text-green-500 rounded w-fit mt-2">
                Successful
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-x-2 min-[500]:gap-x-5 hover:bg-[rgba(21,20,31,0.7)] transition-all min-[500]:py-2 min-[500]:px-2 rounded-lg">
          <div>
            <ReceiveIcon />
          </div>

          <div className="flex flex-col flex-1">
            <div className="flex justify-between w-full gap-x-1">
              <p className="min-[500]:text-base text-sm line-clamp-1">
                Transfer from BENEDICT CUMBERBATCH
              </p>
              <p className="min-[500]:text-base shrink-0 text-sm">
                +₦12,700.00
              </p>
            </div>

            <div className="flex justify-between items-center w-full mt-0">
              <p className="text-sm text-white/60">Jun 29th, 12:54:12</p>
              <p className="text-xs px-3 py-1 bg-green-500/10 text-green-500 rounded mt-2 w-fit">
                Successful
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-x-2 min-[500]:gap-x-5 hover:bg-[rgba(21,20,31,0.7)] transition-all min-[500]:py-2 min-[500]:px-2 rounded-lg">
          <div>
            <BillsIcon />
          </div>

          <div className="flex flex-col flex-1">
            <div className="flex justify-between w-full gap-x-1">
              <p className="min-[500]:text-base text-sm line-clamp-1">
                Electricity Bill
              </p>
              <p className="min-[500]:text-base shrink-0 text-sm">
                -₦50,000.00
              </p>
            </div>

            <div className="flex justify-between items-center w-full mt-0">
              <p className="text-sm text-white/60">Jun 18th, 16:31:59</p>
              <p className="text-xs px-3 py-1 bg-green-500/10 text-green-500 rounded mt-2 w-fit">
                Successful
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
