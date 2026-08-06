"use client";

import { LuPhone, LuSearch } from "react-icons/lu";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import {
  FaArrowRight,
  FaCheck,
  FaChevronDown,
  FaEllipsisVertical,
  FaRegCreditCard,
  FaRegEnvelope,
  FaRegUser,
} from "react-icons/fa6";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import z from "zod";

const dropDownData = [
  {
    id: "acc_no",
    name: "Walletly account number",
    Icon: FaRegCreditCard,
    title: "Walletly Account Number",
    subTitle: "Send money using a Walletly account number",
  },
  {
    id: "phone_no",
    name: "phone number",
    Icon: LuPhone,
    title: "Phone Number",
    subTitle: "Send money using a phone number",
  },
  {
    id: "email_add",
    name: "email address",
    Icon: FaRegEnvelope,
    title: "Email Address",
    subTitle: "Send money using an Email address",
  },
];

const zodSchema = z.object({
  email_add: z.email(),
  acc_no: z.string().min(10),
  phone_no: z.string().min(11),
});

type IdentifierType = z.infer<typeof zodSchema>;

export default function InternalTransfer() {
  const [dropDownSummoned, setDropDownSummoned] = useState(false);
  const [identifierId, setIdentifierId] = useState<string | null>(null);
  const selectedIdentifier =
    dropDownData.find(({ id }) => id == identifierId) || dropDownData[0];
  return (
    <div className="grid grid-cols-[1.2fr_1fr] gap-5">
      <form>
        <div className="grid gap-5">
          <div className="border-2 border-white/10 rounded-2xl p-4 sm:p-5 h-fit bg-slate-500/5">
            <p>Available Balance</p>

            <p className="text-4xl font-semibold mt-2">₦394,434.00</p>

            <div className="mt-3">
              <div className="w-full text-white/60 text-sm flex justify-between items-center">
                <p>Daily transfer limit</p>

                <p>₦32,000 / ₦100,000</p>
              </div>

              <div
                className="w-full rounded-full h-1.5 mt-3"
                style={{
                  background:
                    "linear-gradient(to right, var(--primary-color) 40%, rgba(255,255,255,.1) 20%)",
                }}
              />
            </div>
          </div>
          <div className="border-2 border-white/10 rounded-2xl p-4 sm:p-5 h-fit space-y-7 bg-slate-500/5">
            <div className="input-container relative cursor-pointer">
              <label htmlFor="accountNumber" className="input-label mb-1">
                Select Identifier
              </label>

              <div
                className="flex items-center gap-x-3 border-2 rounded-xl border-white/10 p-3 caret-transparent"
                onClick={() => setDropDownSummoned((prev) => !prev)}
              >
                <div className="text-primary bg-primary/20 rounded-lg p-2">
                  <LuSearch />
                </div>
                <input
                  placeholder="Walletly Account No. / phone No. / Email"
                  value={selectedIdentifier.title}
                  type="text"
                  readOnly
                  className="cursor-pointer w-full outline-none"
                />
              </div>

              <FaChevronDown className="text-sm absolute right-3 top-[53%] translate-y-1/2 text-white/50" />

              <AnimatePresence>
                {dropDownSummoned && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      type: "tween",
                    }}
                    className="bg-[#161224] w-full absolute rounded-xl top-[105%] z-10 cursor-default overflow-clip"
                    style={{
                      boxShadow: "0 0 30px 5px rgba(0,0,0,0.35)",
                    }}
                  >
                    <ul className="py-2 px-2 flex flex-col gap-y-2">
                      {dropDownData.map(({ id, Icon, title, subTitle }) => (
                        <li key={id}>
                          <button
                            type="button"
                            className="w-full text-left py-2 px-2 hover:bg-background rounded-lg transition-colors flex gap-x-4 relative"
                            onClick={() => {
                              setIdentifierId(id);
                              setDropDownSummoned(false);
                            }}
                          >
                            <div className="text-primary bg-primary/20 rounded-lg p-2 size-fit">
                              <Icon />
                            </div>
                            <div>
                              <p>{title}</p>
                              <p className="text-xs text-white/70 font-light">
                                {subTitle}
                              </p>
                            </div>

                            {identifierId == id && (
                              <span className="p-1 bg-primary/80 rounded-full size-fit text-xs absolute right-5 top-1/2 -translate-y-1/2">
                                <FaCheck />
                              </span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="input-container">
              <label htmlFor="accountNumber" className="input-label mb-1">
                User Identifier
              </label>

              <div className="flex items-center gap-x-3 border-2 rounded-xl border-white/10 p-3 relative">
                <div className="text-primary bg-primary/20 rounded-lg p-2">
                  <selectedIdentifier.Icon />
                </div>

                <input
                  placeholder={`Enter user's ${selectedIdentifier.name}`}
                  className="w-full outline-none"
                />

                <MdOutlineQrCodeScanner className="text-2xl cursor-pointer" />

                {/* <div
                  className="rounded-xl w-full py-3 absolute top-[115%] left-0 bg-background"
                  style={{
                    boxShadow: "0 0 30px 5px rgba(0,0,0,0.35)",
                  }}
                >
                  <div className="grid grid-cols-[auto_1fr] gap-x-3 p-1 px-2 rounded-xl items-start">
                    <div className="bg-gray-700 animate-pulse size-10 rounded-full" />

                    <div className="space-y-2">
                      <div className="w-30 bg-gray-700 animate-pulse h-4" />
                      <div className="w-50 bg-gray-700 animate-pulse h-2" />
                      <div className="w-20 bg-gray-700 animate-pulse h-2" />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="border-2 border-white/10 rounded-2xl p-4 sm:p-5 h-fit space-y-7 bg-slate-500/5">
            <div className="input-container">
              <label htmlFor="accountNumber" className="input-label mb-1">
                Amount
              </label>

              <div className="flex items-center gap-x-3 border-2 rounded-xl border-white/10 p-3 relative">
                <span className="text-primary">₦</span>
                <input placeholder="0.00" className="w-full outline-none" />
              </div>
              <div className="w-full flex justify-between px-2 mt-1">
                <p className="text-white/60 text-sm">Fee: ₦0.00</p>
                <p className="text-white/60 text-sm">Total: ₦0.00</p>
              </div>
            </div>

            <div className="input-container">
              <label htmlFor="accountNumber" className="input-label mb-1">
                Narration <span className="text-white/50">(optional)</span>
              </label>

              <div className="flex items-center gap-x-3 border-2 rounded-xl border-white/10 p-3 relative">
                <textarea
                  className="w-full outline-none"
                  placeholder="What is this transfer for?"
                />
              </div>
            </div>

            <div>
              <button className="button-primary w-full flex items-center justify-center gap-x-3 shadow-none!">
                <span>Complete Transfer</span>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </form>

      <div>
        <div className="border-2 border-white/10 rounded-2xl p-4 sm:p-3 flex items-center mb-5 gap-x-2">
          <LuSearch />

          <input
            type="text"
            className="outline-none w-full"
            placeholder="Search beneficiaries"
          />
        </div>
        <div className="grid grid-rows-2 gap-y-5 h-fit">
          <div
            className={`border-2 border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col max-h-100 bg-slate-500/5`}
          >
            <h3 className="text-lg font-semibold text-white scrollable">
              Saved Beneficiaries
            </h3>
            <div className="mt-5 grid gap-y-3 h-full">
              <div className="grid grid-cols-[auto_1fr] gap-x-3 p-1 rounded-xl">
                <div className="p-3 bg-gray-700 size-fit rounded-full">
                  <FaRegUser />
                </div>

                <div className="relative w-full flex justify-between">
                  <div>
                    <p className="uppercase">ole gona solche</p>
                    <p className="text-xs text-white/70">154 487 7866</p>
                    <p className="text-xs text-white/70">
                      olegonasolche@gmail.com
                    </p>
                  </div>

                  <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-x-3 p-1 rounded-xl">
                <div className="p-3 bg-gray-700 size-fit rounded-full">
                  <FaRegUser />
                </div>

                <div className="relative w-full flex justify-between">
                  <div>
                    <p className="uppercase">maryam japheth</p>
                    <p className="text-xs text-white/70">343 676 8390</p>
                    <p className="text-xs text-white/70">
                      maryamjapheth@gmail.com
                    </p>
                  </div>

                  <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-x-3 p-1 rounded-xl">
                <div className="p-3 bg-gray-700 size-fit rounded-full">
                  <FaRegUser />
                </div>

                <div className="relative w-full flex justify-between">
                  <div>
                    <p className="uppercase">kennedy anayor</p>
                    <p className="text-xs text-white/70">143 416 7450</p>
                    <p className="text-xs text-white/70">
                      kennedyanayor@gmail.com
                    </p>
                  </div>

                  <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-x-3 p-1 rounded-xl">
                <div className="p-3 bg-gray-700 size-fit rounded-full">
                  <FaRegUser />
                </div>

                <div className="relative w-full flex justify-between">
                  <div>
                    <p className="uppercase">comfort amadi</p>
                    <p className="text-xs text-white/70">123 456 7890</p>
                    <p className="text-xs text-white/70">
                      comfortamadi@gmail.com
                    </p>
                  </div>

                  <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`border-2 border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col max-h-100 bg-slate-500/5`}
          >
            <h3 className="text-lg font-semibold text-white scrollable">
              Recent Transfers
            </h3>
            <div className="mt-5 grid gap-y-3 h-full">
              <div className="grid grid-cols-[auto_1fr] gap-x-3 p-1 rounded-xl">
                <div className="p-3 bg-gray-700 size-fit rounded-full">
                  <FaRegUser />
                </div>

                <div className="relative w-full flex justify-between">
                  <div>
                    <p className="uppercase">ole gona solche</p>
                    <p className="text-xs text-white/70">154 487 7866</p>
                    <p className="text-xs text-white/70">
                      olegonasolche@gmail.com
                    </p>
                  </div>

                  <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-x-3 p-1 rounded-xl">
                <div className="p-3 bg-gray-700 size-fit rounded-full">
                  <FaRegUser />
                </div>

                <div className="relative w-full flex justify-between">
                  <div>
                    <p className="uppercase">maryam japheth</p>
                    <p className="text-xs text-white/70">343 676 8390</p>
                    <p className="text-xs text-white/70">
                      maryamjapheth@gmail.com
                    </p>
                  </div>

                  <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-x-3 p-1 rounded-xl">
                <div className="p-3 bg-gray-700 size-fit rounded-full">
                  <FaRegUser />
                </div>

                <div className="relative w-full flex justify-between">
                  <div>
                    <p className="uppercase">kennedy anayor</p>
                    <p className="text-xs text-white/70">143 416 7450</p>
                    <p className="text-xs text-white/70">
                      kennedyanayor@gmail.com
                    </p>
                  </div>

                  <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-x-3 p-1 rounded-xl">
                <div className="p-3 bg-gray-700 size-fit rounded-full">
                  <FaRegUser />
                </div>

                <div className="relative w-full flex justify-between">
                  <div>
                    <p className="uppercase">comfort amadi</p>
                    <p className="text-xs text-white/70">123 456 7890</p>
                    <p className="text-xs text-white/70">
                      comfortamadi@gmail.com
                    </p>
                  </div>

                  <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
