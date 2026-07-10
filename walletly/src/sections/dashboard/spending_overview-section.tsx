import { MyAreaChart } from "@/components/dashboard/area_chart";
import { FaChevronDown } from "react-icons/fa";

export const SpendingOverview = () => {
  return (
    <div className="border-2 border-white/10 rounded-2xl p-4 sm:p-5 space-y-5 min-[955]:max-h-85 h-fit grid grid-rows-[auto_1fr] overflow-auto scrollable-section">
      <div className="">
        <h3 className="text-xl font-semibold mb-1">Spending Overview</h3>
        <div className="text-white/70 flex items-center text-sm gap-1">
          <FaChevronDown className="text-xs" />
          This week
        </div>
      </div>
      <div className="h-fit min-[955]:flex min-[955]:flex-col grid grid-rows-[2fr_1fr] -ml-3 gap-5">
        <div className="w-full text-xs">
          <MyAreaChart />
        </div>
        <ul className="flex items-center justify-between px-5 gap-2 flex-wrap">
          <li>
            <div>
              <p className="text-sm text-white/65">Avg daily spending</p>
              <p className="min-[500]:text-lg font-semibold text-primary">
                ₦85,000
              </p>
            </div>
          </li>

          <li>
            <div>
              <p className="text-sm text-white/65">Most active day</p>
              <p className="min-[500]:text-lg font-semibold text-primary">
                Wed, 25th jun
              </p>
            </div>
          </li>

          <li>
            <div>
              <p className="text-sm text-white/65">Highest transaction</p>
              <p className="min-[500]:text-lg font-semibold text-primary">
                ₦35,000
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
