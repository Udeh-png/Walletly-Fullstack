import { FaPaperPlane, FaWifi } from "react-icons/fa6";
import { GoPlusCircle } from "react-icons/go";
import { HiArrowDownTray } from "react-icons/hi2";
import { LuReceiptText, LuSquareArrowOutUpRight } from "react-icons/lu";

export const TransferIcon = () => {
  return (
    <div className="bg-green-500/10 w-fit rounded-lg p-3 max-[580]:p-2 flex items-center justify-center text-green-500">
      <FaPaperPlane className="text-xl" />
    </div>
  );
};

export const DepositIcon = () => {
  return (
    <div className="bg-primary/10 w-fit rounded-lg p-3 max-[580]:p-2 flex items-center justify-center text-primary">
      <GoPlusCircle className="text-xl" />
    </div>
  );
};

export const WithdrawIcon = () => {
  return (
    <div className="bg-pink-500/10 w-fit rounded-lg p-3 max-[580]:p-2 flex items-center justify-center text-pink-500">
      <LuSquareArrowOutUpRight className="text-xl" />
    </div>
  );
};

export const ReceiveIcon = () => {
  return (
    <div className="bg-blue-500/10 w-fit rounded-lg p-3 max-[580]:p-2 flex items-center justify-center text-blue-500">
      <HiArrowDownTray className="text-xl" />
    </div>
  );
};

export const BillsIcon = () => {
  return (
    <div className="bg-yellow-500/10 w-fit rounded-lg p-3 max-[580]:p-2 flex items-center justify-center text-yellow-500">
      <LuReceiptText className="text-xl" />
    </div>
  );
};

export const AirtimeIcon = () => {
  return (
    <div className="bg-blue-500/10 w-fit rounded-lg p-3 max-[580]:p-2 flex items-center justify-center text-blue-500">
      <FaWifi className="text-xl" />
    </div>
  );
};
