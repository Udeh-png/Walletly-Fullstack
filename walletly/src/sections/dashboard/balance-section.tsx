import { FaEye, FaRegCopy } from "react-icons/fa6";
import { LuCirclePlus, LuSquareArrowOutUpRight } from "react-icons/lu";

export const BalanceSection = () => {
  return (
    <section className="bg-[linear-gradient(to_bottom,var(--primary-color),#0d0d1a)] rounded-2xl p-4 sm:p-5 md:p-6 md:mt-5 mt-3">
      <p className="text-sm sm:text-base">
        <span>Available Balance</span>
        <FaEye className="inline ml-2 cursor-pointer" />
      </p>

      <p className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-2 wrap-break-word">
        ₦394,434.00
      </p>

      <div className="mt-4 sm:mt-3">
        <p className="text-sm text-white/65">Account Number</p>
        <p className="font-semibold text-sm sm:text-base">
          <span className="align-middle">1234 567 890</span>
          <FaRegCopy className="inline ml-2 cursor-pointer" />
        </p>
      </div>

      <div className="mt-6 sm:mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
        <button className="bg-primary text-white px-4 sm:px-6 py-2.5 rounded-lg flex items-center justify-center w-full sm:w-auto">
          <LuCirclePlus className="text-xl mr-3 align-middle" />
          <span>Fund Wallet</span>
        </button>

        <button className="bg-primary text-white px-4 sm:px-6 py-2.5 rounded-lg flex items-center justify-center w-full sm:w-auto">
          <LuSquareArrowOutUpRight className="text-xl mr-3 align-middle" />
          <span>Withdraw</span>
        </button>
      </div>
    </section>
  );
};
