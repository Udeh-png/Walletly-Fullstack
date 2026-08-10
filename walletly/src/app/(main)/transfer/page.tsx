"use client";

import { ExternalTransferFormFields } from "@/sections/transfer/ExternalTransferFormFields";
import { InternalTransferFormFields } from "@/sections/transfer/InternalTransferFormFields";
import { FaArrowRight } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { transferSchema, TransferType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { TabChangeContext } from "@/contexts/TransferTabChangeContext";
import { useContext } from "react";

export default function TransferForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TransferType>({
    resolver: zodResolver(transferSchema),
  });

  const formatter = Intl.NumberFormat("en-US");

  const { transferType } = useContext(TabChangeContext);

  return (
    <form
      className="contents"
      onSubmit={handleSubmit(
        (data) => {
          console.log("data", data);
          console.log(errors);
        },
        (data) => {
          console.log("error", data);
        },
      )}
    >
      {transferType === "internal" && (
        <InternalTransferFormFields register={register} errors={errors} />
      )}

      {transferType === "external" && (
        <ExternalTransferFormFields register={register} errors={errors} />
      )}

      <div className="border-2 border-white/10 rounded-2xl px-3 py-4 sm:p-5 h-fit sm:space-y-7 space-y-7 bg-slate-500/5">
        <div className="input-container">
          <label htmlFor="accountNumber" className="input-label mb-1 ml-1">
            Amount
          </label>

          <div className="flex items-center gap-x-3 border-2 rounded-xl border-white/10 p-3 relative">
            <span className="text-primary">₦</span>
            <input
              {...register("amount", {
                onChange: () => {
                  const value = getValues("amount");

                  const valueToNum = Number(value.replace(/[^0-9.]/g, ""));

                  setValue(
                    "amount",
                    valueToNum == 0 ? "" : formatter.format(valueToNum),
                  );
                },
              })}
              placeholder="0.00"
              className="w-full outline-none"
              inputMode="numeric"
              maxLength={7}
            />
          </div>
          <div className="w-full flex justify-between px-2 mt-1">
            <p className="text-white/60 text-sm">Fee: ₦0.00</p>
            <p className="text-white/60 text-sm">Total: ₦0.00</p>
          </div>
          {errors.amount && (
            <p className="ml-2 text-sm text-red-500 mt-0.5">
              {errors.amount?.message}
            </p>
          )}
        </div>

        <div className="input-container">
          <label htmlFor="accountNumber" className="input-label mb-1 ml-1">
            Narration <span className="text-white/50">(optional)</span>
          </label>

          <div className="flex items-center gap-x-3 border-2 rounded-xl border-white/10 p-3 relative">
            <input
              {...register("narration")}
              className="w-full outline-none"
              placeholder="What is this transfer for?"
            />
          </div>

          {errors.narration && (
            <p className="ml-2 text-sm text-red-500 mt-0.5">
              {errors.narration?.message}
            </p>
          )}
        </div>

        <div>
          <button className="button-primary w-full flex items-center justify-center gap-x-3 shadow-none!">
            <span>Complete Transfer</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </form>
  );
}
