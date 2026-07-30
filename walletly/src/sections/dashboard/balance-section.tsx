/* eslint-disable @next/next/no-img-element */
"use client";

import { useContext, useEffect, useState } from "react";
import {
  FaCheck,
  FaEye,
  FaEyeSlash,
  FaPaperPlane,
  FaRegCopy,
} from "react-icons/fa6";
import { LuCirclePlus } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { FundWalletModal } from "@/components/dashboard/FundWalletModal";
import { FundWalletModalContext } from "@/contexts/DepositContext";

export const BalanceSection = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading] = useState(false);
  const { modalOpen, setModalOpen } = useContext(FundWalletModalContext);

  const copyAccNumber = async () => {
    const board = navigator.clipboard;
    if (!board) {
      setCopied(true);
      return;
    }
    await board.writeText("1234567890");
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);
  return (
    <section
      className={`bg-[linear-gradient(to_bottom,var(--primary-color),#0d0d1a)] rounded-2xl p-4 sm:p-5 md:p-6 mt-5 relative lg:overflow-visible overflow-clip ${modalOpen && "bg-red-500!"}`}
    >
      <LoadingSpinner isLoading={loading} />
      <AnimatePresence>
        {modalOpen && (
          <FundWalletModal
            openModal={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
      <img
        src="/images/logo.png"
        alt=""
        className="lg:max-w-80 sm:max-w-70 min-[500]:max-w-60 max-w-50 absolute lg:right-10 lg:-top-20 min-[500]:top-0 top-10 -right-10 lg:opacity-100 opacity-20"
      />
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{
              translateY: -50,
            }}
            animate={{
              translateY: 0,
            }}
            exit={{
              translateY: -100,
            }}
            className="bg-background rounded-lg border border-white/10 w-fit p-3 fixed top-5 left-[50vw] md:translate-x-0 -translate-x-1/2 flex gap-2 text-sm"
          >
            <div className="bg-green-500/10 text-green-500 w-fit rounded-full p-1">
              <FaCheck />
            </div>
            Copied
          </motion.div>
        )}
      </AnimatePresence>
      <p className="text-sm sm:text-base">
        <span>Available Balance</span>
        <button onClick={() => setHideBalance((bal) => !bal)}>
          {hideBalance ? (
            <FaEyeSlash className="inline ml-2 cursor-pointer" />
          ) : (
            <FaEye className="inline ml-2 cursor-pointer" />
          )}
        </button>
      </p>

      <p className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-2 wrap-break-word relative">
        {hideBalance ? "****" : "₦394,434.00"}
      </p>

      <div className="mt-4 sm:mt-3 relative">
        <p className="text-sm text-white/65">Account Number</p>
        <p className="font-semibold text-sm sm:text-base">
          <span className="align-middle">1234 567 890</span>
          <button onClick={() => copyAccNumber()}>
            <FaRegCopy className="inline ml-2 cursor-pointer" />
          </button>
        </p>
      </div>

      <div className="mt-6 sm:mt-15 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 relative">
        <button
          className="bg-primary text-white px-4 sm:px-6 py-2.5 rounded-lg flex items-center justify-center w-full sm:w-auto cursor-pointer"
          onClick={async () => {
            setModalOpen(true);
          }}
        >
          <LuCirclePlus className="text-xl mr-3 align-middle" />
          <span>Fund Wallet</span>
        </button>

        <button className="bg-primary text-white px-4 sm:px-6 py-2.5 rounded-lg flex items-center justify-center w-full sm:w-auto">
          <FaPaperPlane className="mr-3 align-middle" />
          <span>Send Money</span>
        </button>
      </div>
    </section>
  );
};
