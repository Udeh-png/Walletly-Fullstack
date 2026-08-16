import { TransferType } from "@/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FaChevronDown, FaRegCreditCard } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";

export const ExternalTransferFormFields = ({
  register,
  errors,
}: {
  register: UseFormRegister<TransferType>;
  errors: FieldErrors<TransferType>;
}) => {
  return (
    <div className="border-2 border-white/10 rounded-2xl px-3 py-4 sm:p-5 h-fit sm:space-y-7 space-y-7 bg-slate-500/5">
      <div className="input-container">
        <label htmlFor="accountNumber" className="input-label mb-1 ml-1">
          Account Number
        </label>

        <label className="form-input-wrapper sm:p-3.5! px-3! py-4!">
          <div className="text-primary bg-primary/20 rounded-lg p-2">
            <FaRegCreditCard />
          </div>
          <input
            {...register("accountNumber")}
            placeholder="Enter 10 Digit Account Number"
            className="w-full outline-none"
          />
        </label>

        {errors.accountNumber && (
          <p className="ml-2 text-sm text-red-500 mt-0.5">
            {errors.accountNumber?.message}
          </p>
        )}
      </div>

      <div className="input-container relative cursor-pointer">
        <label htmlFor="accountNumber" className="input-label mb-1 ml-1">
          Bank Name
        </label>

        <label className="form-input-wrapper sm:p-3.5! px-3! py-4!">
          <div className="text-primary bg-primary/20 rounded-lg p-2">
            <LuSearch />
          </div>
          <input
            {...register("bankName")}
            placeholder="Select Bank"
            type="text"
            className="cursor-pointer w-full outline-none"
          />
          <FaChevronDown className="text-sm" />
        </label>

        {errors.bankName && (
          <p className="ml-2 text-sm text-red-500 mt-0.5">
            {errors.bankName?.message}
          </p>
        )}
      </div>
    </div>
  );
};
