import { MyAreaChart } from "@/components/dashboard/area_chart";
import { FaChevronDown } from "react-icons/fa";

export const SpendingOverview = () => {
  return (
    <div className="border-2 border-white/10 rounded-2xl h-fit grid grid-rows-[auto_1fr] **:outline-0 ">
      <div className="p-4 sm:p-5">
        <h3 className="text-xl font-semibold mb-1">Spending Overview</h3>
        <div className="text-white/70 flex items-center text-sm gap-1">
          <FaChevronDown className="text-xs" />
          This week
        </div>
      </div>
      <div className="w-full text-xs h-fit pr-2">
        <MyAreaChart />
      </div>
    </div>
  );
};
