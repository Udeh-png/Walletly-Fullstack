/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { FaChevronRight, FaEllipsisVertical, FaPlus } from "react-icons/fa6";

export const PaymentMethodsSection = () => {
  return (
    <section className="border-2 border-white/10 rounded-2xl p-4 sm:p-5 mt-5">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">Cards</h3>

        <div className="flex justify-center items-center gap-2 text-sm text-primary">
          <p>View all</p>
          <FaChevronRight />
        </div>
      </div>

      <div className="mt-5 space-y-7">
        <div className="flex gap-x-5">
          <img src={"/images/visa.svg"} className="size-11 flex-0" />

          <div className="flex-1">
            <p className="text-sm text-white/80">
              Visa <span className="text-xs text-primary ml-2">Default</span>
            </p>
            <p className="text-sm text-white/60">**** **** **** 1234</p>
            <p className="mt-1 text-xs text-white/65">Debit Card</p>
          </div>

          <div className="flex-0">
            <FaEllipsisVertical />
          </div>
        </div>

        <div className="flex gap-x-5">
          <img src={"/images/mastercard.svg"} className="size-11 flex-0" />

          <div className="flex-1">
            <p className="text-sm text-white/80">Mastercard </p>
            <p className="text-sm text-white/60">**** **** **** 5678</p>
            <p className="mt-1 text-xs text-white/65">Debit Card</p>
          </div>

          <div className="flex-0">
            <FaEllipsisVertical />
          </div>
        </div>

        <div className="border border-dashed border-primary w-full flex items-center justify-center gap-x-3 py-2 rounded-lg text-sm text-primary -mt-2 cursor-pointer">
          <FaPlus />

          <p>Add Payment Method</p>
        </div>
      </div>
    </section>
  );
};
