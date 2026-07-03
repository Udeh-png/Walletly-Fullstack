/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import {
  FaChevronRight,
  FaEllipsisVertical,
  FaEye,
  FaPlus,
} from "react-icons/fa6";
import {
  LuBell,
  LuHistory,
  LuSquareArrowOutDownLeft,
  LuSquareArrowOutUpRight,
} from "react-icons/lu";

export default function Page() {
  return (
    <div>
      <div className="grid min-[1170px]:grid-cols-[1.3fr_1fr] md:gap-4 gap-4">
        <div className="bg-[linear-gradient(to_bottom,var(--primary-color),#0d0d1a)] w-[full] rounded-3xl md:p-7 p-3 relative min-h-fit flex flex-col justify-between gap-y-7">
          <div className="flex justify-between items-center">
            <div className="flex items-center md:gap-x-4 gap-x-2">
              <div className="border-2 border-[rgba(155,75,194,0.7)] rounded-full size-10" />

              <div className="flex flex-col">
                <h1 className="md:text-3xl text-xl font-bold">Hey, John</h1>
                <p className="text-[rgba(255,255,255,0.5)] text-sm">
                  johndoe@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center md:gap-x-4 gap-x-2">
              <div className="bg-[#0d0d16] rounded-full p-2">
                <div className="relative after:content-[''] after:absolute after:top-0 after:right-0 after:size-2 after:bg-red-500 after:rounded-full">
                  <LuBell className="text-xl" />
                </div>
              </div>

              <div className="bg-[#0d0d16] rounded-full p-2">
                <LuHistory className="text-xl" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <div className="">
              <div className="flex items-center gap-x-2 text-white/90 font-semibold mb-2 relative">
                <p>Current Balance</p>
                <FaEye className="" />
              </div>
              <div className="relative w-fit">
                <p className="md:text-5xl text-3xl font-semibold">
                  ₦394,434.00
                </p>
                <span className="absolute bottom-0 left-[105%] font-semibold md:text-base text-sm">
                  NGN
                </span>
              </div>
            </div>

            <div className="flex md:flex-col md:items-start items-center w-fit text-sm text-[rgba(255,255,255,0.8)]">
              <p className="md:block hidden">Account Number:</p>
              <p className="md:hidden block mr-1">Acc No:</p>
              <span className="text-white md:text-lg text-base font-semibold">
                1234-567-890
              </span>
            </div>
          </div>

          <div className="flex gap-x-4">
            <button className="md:px-10 px-8 py-2 bg-primary rounded-full flex items-center gap-x-2">
              <LuSquareArrowOutDownLeft />
              Deposit
            </button>

            <button className="md:px-10 px-8 py-2 bg-primary rounded-full flex items-center gap-x-2">
              <LuSquareArrowOutUpRight />
              Transfer
            </button>
          </div>
        </div>

        <div className="bg-[#15141f] w-[full] rounded-3xl md:p-7 p-3 h-fit border-[rgba(155,75,194,0.7)]">
          <div className="flex justify-between items-center">
            <h3 className="md:text-2xl text-xl font-semibold">
              Payment Methods
            </h3>

            <div className="bg-[#0d0d16] border border-[rgba(155,75,194,0.7)] rounded-full p-1.5">
              <FaPlus className="text-xl" />
            </div>
          </div>

          <div className="md:mt-8 mt-4 flex flex-col md:gap-y-8 gap-y-8">
            <div className="flex gap-x-4 relative items-start">
              <FaEllipsisVertical className="absolute top-1 right-0" />
              <img src={"/images/visa.svg"} className="size-11" />
              <div className="">
                <div className="flex items-center gap-x-2">
                  <p className="text-[rgba(255,255,255,0.8)]">Visa</p>
                  <p className="text-primary font-semibold text-xs">Default</p>
                </div>
                <p className="font-semibold text-white/90 text-lg">
                  **** **** **** 1234
                </p>
                <p>
                  <span className="text-sm text-[rgba(255,255,255,0.5)]">
                    Expiry:
                  </span>{" "}
                  <span className="text-white/90 font-semibold">12/24</span>
                </p>
              </div>
            </div>

            <div className="flex gap-x-4 relative items-start">
              <FaEllipsisVertical className="absolute top-1 right-0" />
              <img src={"/images/mastercard.svg"} className="size-11" />
              <div className="">
                <p className="text-[rgba(255,255,255,0.8)]">Mastercard</p>
                <p className="font-semibold text-white/90 text-lg">
                  **** **** **** 5678
                </p>
                <p>
                  <span className="text-sm text-[rgba(255,255,255,0.5)]">
                    Expiry:
                  </span>{" "}
                  <span className="text-white/90 font-semibold">11/25</span>
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm text-primary flex items-center gap-x-2 md:mt-7 mt-5 cursor-pointer justify-self-end">
            <p className="">View All</p>
            <FaChevronRight className="text-xs" />
          </div>
        </div>
      </div>
    </div>
  );
}
