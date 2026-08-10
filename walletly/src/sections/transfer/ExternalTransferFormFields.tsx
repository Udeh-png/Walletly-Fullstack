import { FaChevronDown, FaRegCreditCard } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";

export const ExternalTransferFormFields = () => {
  return (
    <div className="border-2 border-white/10 rounded-2xl px-3 py-4 sm:p-5 h-fit sm:space-y-7 space-y-7 bg-slate-500/5">
      <div className="input-container">
        <label htmlFor="accountNumber" className="input-label mb-1 ml-1">
          Account Number
        </label>

        <div className="flex items-center gap-x-3 border-2 rounded-xl border-white/10 p-3 relative">
          <div className="text-primary bg-primary/20 rounded-lg p-2">
            <FaRegCreditCard />
          </div>
          <input
            placeholder="Enter 10 Digit Account Number"
            className="w-full outline-none"
          />
        </div>
      </div>

      <div className="input-container relative cursor-pointer">
        <label htmlFor="accountNumber" className="input-label mb-1 ml-1">
          Bank Name
        </label>

        <div className="flex items-center gap-x-3 border-2 rounded-xl border-white/10 p-3 caret-transparent">
          <div className="text-primary bg-primary/20 rounded-lg p-2">
            <LuSearch />
          </div>
          <input
            placeholder="Select Bank"
            type="text"
            className="cursor-pointer w-full outline-none"
          />
        </div>

        <FaChevronDown className="text-sm absolute right-3 top-[53%] translate-y-1/2" />
      </div>
    </div>
  );
};
