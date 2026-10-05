"use client";

import { LuPhone, LuSearch } from "react-icons/lu";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import {
  FaCheck,
  FaChevronDown,
  FaRegCreditCard,
  FaRegEnvelope,
} from "react-icons/fa6";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TransferType } from "@/types";
import { IconType } from "react-icons";

type IdentifierId = "ACCOUNT_NUMBER" | "PHONE_NUMBER" | "EMAIL_aDDRESS";

export const InternalTransferFormFields = ({
  register,
  errors,
  clearErrors,
}: {
  register: UseFormRegister<TransferType>;
  errors: FieldErrors<TransferType>;
  clearErrors: (name?: keyof TransferType | undefined) => void;
}) => {
  const dropDownData: Array<{
    id: IdentifierId;
    name: string;
    Icon: IconType;
    title: string;
    subTitle: string;
  }> = [
    {
      id: "ACCOUNT_NUMBER",
      name: "Walletly account number",
      Icon: FaRegCreditCard,
      title: "Walletly Account Number",
      subTitle: "Send money using a Walletly account number",
    },
    {
      id: "PHONE_NUMBER",
      name: "phone number",
      Icon: LuPhone,
      title: "Phone Number",
      subTitle: "Send money using a phone number",
    },
    {
      id: "EMAIL_aDDRESS",
      name: "email address",
      Icon: FaRegEnvelope,
      title: "Email Address",
      subTitle: "Send money using an Email address",
    },
  ];

  const [dropDownSummoned, setDropDownSummoned] = useState(false);
  const [identifierId, setIdentifierId] =
    useState<IdentifierId>("ACCOUNT_NUMBER");
  const selectedIdentifier =
    dropDownData.find(({ id }) => id == identifierId) || dropDownData[0];
  return (
    <div className="border-2 border-white/10 rounded-2xl px-3 py-4 sm:p-5 h-fit sm:space-y-7 space-y-7 bg-slate-500/5">
      <div className="input-container relative cursor-pointer">
        <label htmlFor="accountNumber" className="input-label mb-1 ml-1">
          Select Identifier
        </label>

        <button
          className="form-input-wrapper sm:p-3.5! px-3! py-4! cursor-pointer"
          onClick={() => setDropDownSummoned((prev) => !prev)}
          type="button"
        >
          <span className="text-primary bg-primary/20 rounded-lg p-2">
            <LuSearch />
          </span>
          <input
            placeholder="Walletly Account No. / phone No. / Email"
            value={selectedIdentifier.title}
            type="text"
            readOnly
            className="w-full outline-none"
          />
          <FaChevronDown className="text-sm" />
        </button>

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
              <ul className="p-2 flex flex-col gap-y-2">
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
                        <span className="p-1 bg-primary/80 rounded-full size-fit text-xs absolute sm:right-5 right-0 top-1/2 -translate-y-1/2">
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
        <label htmlFor="accountNumber" className="input-label mb-1 ml-1">
          User Identifier
        </label>

        <label className="form-input-wrapper sm:p-3.5! px-3! py-4!">
          <div className="text-primary bg-primary/20 rounded-lg p-2">
            <selectedIdentifier.Icon />
          </div>

          <input
            className="w-full outline-none"
            placeholder={`Enter user's ${selectedIdentifier.name}`}
            {...register("identifier")}
          />

          <MdOutlineQrCodeScanner className="text-2xl cursor-pointer" />

          {/*<div
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
            </div> 
          */}
        </label>
        {errors.identifier?.message?.includes("EMAIL_ADDRESS") && (
          <p className="ml-2 text-sm text-red-500 mt-0.5">{""}</p>
        )}

        {errors.identifier?.message?.includes("ACCOUNT_NUMBER") && (
          <p className="ml-2 text-sm text-red-500 mt-0.5">
            {errors.identifier?.message?.replace(
              "ACCOUNT_NUMBER",
              "Account number",
            )}
          </p>
        )}

        {errors.identifier?.message?.includes("PHONE") && (
          <p className="ml-2 text-sm text-red-500 mt-0.5">
            {"Phone number is required"}

            {errors.identifier?.message?.replace(
              "ACCOUNT_NUMBER",
              "Account number",
            )}
          </p>
        )}
      </div>
    </div>
  );
};
