"use client";

import { useEffect, useRef, useState } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa6";
import { LuX } from "react-icons/lu";
import { GoPlusCircle } from "react-icons/go";
import { motion } from "framer-motion";

export const FundWalletModal = ({ onClose }: { onClose: () => void }) => {
  const [val, setVal] = useState("");
  const [cardSelected, setCardSelected] = useState("1");
  const [rememberCard, setRememberCard] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fee = 0;
  const amountSettled = Number(val.replaceAll(",", "")) - fee;

  useEffect(() => {
    const inputEl = inputRef.current;
    inputEl?.focus();
  }, []);

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
        className="h-dvh w-100 justify-self-end border-r-white/10 bg-[#080811] py-3 px-3 relative"
      >
        <div className="h-full flex flex-col">
          <button
            onClick={() => onClose()}
            className="text-2xl p-2 flex-0 bg-[rgba(21,20,31,0.5)] rounded-full w-fit text-primary cursor-pointer"
          >
            <LuX />
          </button>

          <div className="flex flex-col h- mt-5 flex-1 relative">
            <div className="text-3xl px-3 mt-5 rounded-xl font-semibold caret-transparent flex gap-x-2">
              <span className={!val ? "text-white/50" : ""}>₦</span>
              <input
                ref={inputRef}
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
                maxLength={8}
                className="outline-0 caret-foreground w-full"
              />
            </div>

            <div className="mt-5 rounded-lg bg-[rgba(21,20,31,0.5)] py-3 px-4 flex flex-col gap-y-3">
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
              <p className="text-white/75">Cards</p>

              <button
                className="text-start w-full p-3 border rounded-lg border-primary/40 cursor-pointer"
                onClick={() => {
                  setCardSelected((prev) => {
                    return prev == "1" ? "" : "1";
                  });
                }}
              >
                <div className="flex gap-x-5">
                  <svg
                    width="44"
                    height="44"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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

              <div className="justify-self-center text-primary mt-3 flex items-center gap-x-1 text-xs font-semibold">
                View All
                <FaChevronDown />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full flex flex-col items-start justify-end gap-y-5">
              <button
                className={`text-start text-sm text-white/75 flex gap-x-3 cursor-pointer mt-3 font-semibold ${cardSelected && "text-white/20! cursor-not-allowed!"}`}
                onClick={() => setRememberCard((prev) => !prev)}
              >
                <div
                  className={`text-[0.65rem] rounded-sm self-center flex items-center justify-center border border-white/30 size-5 ${rememberCard && !cardSelected && "bg-primary border-transparent!"} transition-colors`}
                >
                  {rememberCard && !cardSelected && <FaCheck />}
                </div>

                <p className="transition-colors">Remember this card</p>
              </button>

              <button className="bg-primary text-white px-4 sm:px-6 py-3 rounded-lg flex items-center justify-center w-full cursor-pointer">
                <GoPlusCircle className="text-xl mr-2" />
                <p>Fund Wallet</p>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
