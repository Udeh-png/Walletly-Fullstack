"use client";

import { useState } from "react";
import { FaCheck, FaChevronRight } from "react-icons/fa6";
import { LuX } from "react-icons/lu";
import { GoPlusCircle } from "react-icons/go";
import { motion } from "framer-motion";
import { Drawer } from "vaul";
import { useMediaQuery } from "@/hooks/UseMediaQuery";

const FundWalletFormContent = ({
  onClose,
  isMobile,
}: {
  onClose: () => void;
  isMobile?: boolean;
}) => {
  const [val, setVal] = useState("");
  const [cardSelected, setCardSelected] = useState("1");
  const [rememberCard, setRememberCard] = useState(false);

  const fee = 0;
  const amountSettled = Number(val.replaceAll(",", "")) - fee;
  return (
    <div className="md:h-full h-fit flex flex-col">
      {!isMobile && (
        <button
          onClick={() => onClose()}
          className="text-2xl p-2 flex-0 bg-[rgba(21,20,31,0.5)] rounded-full w-fit text-primary cursor-pointer"
        >
          <LuX />
        </button>
      )}
      <div className="flex flex-col flex-1 relative">
        <div className="text-3xl mt-5 rounded-xl font-semibold caret-transparent flex gap-x-2">
          <span className={!val ? "text-white/50" : ""}>₦</span>
          <input
            value={val}
            placeholder="0.00"
            onChange={(e) => {
              const value = e.target.value;

              const valueToNum = Number(value.replace(/[^0-9.]/g, ""));
              const formatter = Intl.NumberFormat("en-US");
              console.log(valueToNum);
              setVal(() =>
                valueToNum == 0 ? "" : formatter.format(valueToNum),
              );
            }}
            type="text"
            inputMode="numeric"
            maxLength={8}
            className="outline-0 caret-foreground w-full"
          />
        </div>

        <div className="mt-5 rounded-lg bg-[rgba(168,85,247,.08)] py-3 px-4 flex flex-col gap-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-white/60">Amount</p>
            <p className="font-semibold">₦{val || 0}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-white/60">Fee</p>
            <p className="font-semibold">₦{fee}</p>
          </div>

          <div className="flex justify-between items-center border-t pt-3 border-white/10 mt-5">
            <p className="text-sm text-white/60">You&apos;ll receive</p>
            <p className="font-semibold text-lg">
              ₦{amountSettled.toLocaleString("en-US")}
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-white/75">Cards</p>
            <div className="text-primary flex items-center gap-x-1 text-xs font-semibold">
              View All
              <FaChevronRight />
            </div>
          </div>

          <button
            className="text-start w-full p-3 border rounded-lg border-primary/40 cursor-pointer"
            onClick={() => {
              setCardSelected((prev) => {
                return prev == "1" ? "" : "1";
              });
            }}
          >
            <div className="flex gap-x-5">
              <svg width="44" height="44" xmlns="http://www.w3.org/2000/svg">
                <image
                  href="/images/visa.svg"
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                />
              </svg>

              <div className="flex-1">
                <p className="text-sm text-white/80">Visa</p>
                <p className="text-sm text-white/60">**** **** **** 1234</p>
                <p className="mt-1 text-xs text-white/65">Expires 09/32</p>
              </div>

              <div
                className={`flex items-center justify-center text-[0.65rem] rounded-full self-center border border-white/10 size-5 ${cardSelected == "1" && "bg-primary"} transition-colors`}
              >
                {cardSelected == "1" && <FaCheck />}
              </div>
            </div>
          </button>
        </div>

        <button
          className={`text-start text-sm text-white/75 flex gap-x-3 cursor-pointer font-semibold disabled:text-white/20! disabled:cursor-not-allowed! mt-5`}
          disabled={cardSelected !== ""}
          onClick={() => setRememberCard((prev) => !prev)}
        >
          <div
            className={`text-[0.65rem] rounded-sm self-center flex items-center justify-center border border-white/40 size-5 ${rememberCard && !cardSelected && "bg-primary border-transparent!"} transition-colors`}
          >
            {rememberCard && !cardSelected && <FaCheck />}
          </div>

          <p className="transition-colors">Remember Card</p>
        </button>

        <div className="md:absolute bottom-0 left-0 w-full flex flex-col mt-5 items-start justify-end gap-y-5">
          <button className="bg-primary text-white px-4 sm:px-6 py-3 rounded-lg flex items-center justify-center w-full cursor-pointer">
            <GoPlusCircle className="text-xl mr-2" />
            <p>Fund Wallet</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export const DesktopFundWalletModal = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  return (
    <div className="inset-0 fixed z-100">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="inset-0 absolute bg-black/40"
        onClick={() => onClose()}
      />
      <motion.div
        initial={{
          translateX: "100%",
        }}
        animate={{
          translateX: 0,
        }}
        exit={{
          translateX: "100%",
        }}
        transition={{
          type: "tween",
        }}
        className="md:h-dvh max-w-100 justify-self-end border-r-white/10 bg-[#161224] py-3 px-3 relative"
      >
        <FundWalletFormContent onClose={onClose} />
      </motion.div>
    </div>
  );
};

export const MobileFundWalletModal = ({
  openModal,
  onClose,
}: {
  openModal: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer.Root open={openModal} onClose={onClose} repositionInputs={false}>
      <Drawer.Portal>
        <Drawer.Content className="fixed z-100 rounded-t-3xl h-fit bottom-0! mb-0! left-0 w-full bg-[#161224] py-3 px-3 overflow-hidden">
          <Drawer.Handle />
          <FundWalletFormContent onClose={onClose} isMobile />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export const FundWalletModal = ({
  onClose,
  openModal,
}: {
  onClose: () => void;
  openModal: boolean;
}) => {
  const isDesktop = useMediaQuery("(min-width: 650px)");
  if (isDesktop) return <DesktopFundWalletModal onClose={onClose} />;

  return <MobileFundWalletModal onClose={onClose} openModal={openModal} />;
};

// TODO: Remove Nav at width 768px
