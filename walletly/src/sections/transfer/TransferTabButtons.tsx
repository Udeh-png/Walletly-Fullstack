"use client";

import { TabChangeContext } from "@/contexts/TransferTabChangeContext";
import { useContext } from "react";

export const TransferTabButtons = () => {
  const { transferType, setTransferType } = useContext(TabChangeContext);
  return (
    <div className="border-2 border-white/10 rounded-2xl p-2 h-fit bg-slate-500/5 flex">
      <div className={`relative flex justify-between w-full`}>
        <div
          className="absolute top-0 w-1/2 h-full rounded-lg bg-primary -z-10"
          style={{
            transition: "left 0.5s",
            left: transferType == "internal" ? "50%" : "0",
          }}
        />
        <button
          className={`rounded-lg py-3 w-full text-center transition-colors flex-1 cursor-pointer`}
          onClick={() => setTransferType("external")}
        >
          Bank Account
        </button>

        <button
          className={`rounded-lg py-3 w-full text-center transition-colors flex-1 cursor-pointer`}
          onClick={() => setTransferType("internal")}
        >
          Walletly User
        </button>
      </div>
    </div>
  );
};
