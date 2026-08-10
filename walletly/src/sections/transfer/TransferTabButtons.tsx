"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const TransferTabButtons = () => {
  const pathname = usePathname();
  return (
    <div className="border-2 border-white/10 rounded-2xl p-2 h-fit bg-slate-500/5 flex">
      <div className={`relative flex justify-between w-full`}>
        <div
          className="absolute top-0 w-1/2 h-full rounded-lg bg-primary -z-10"
          style={{
            // transition: "left 0.5s",
            left: pathname.includes("internal") ? "50%" : "0",
          }}
        />
        <Link
          href={"/transfer/external"}
          className={`rounded-lg py-3 w-full text-center transition-colors flex-1`}
        >
          Bank Account
        </Link>

        <Link
          href={"/transfer/internal"}
          className={`rounded-lg py-3 w-full text-center transition-colors flex-1`}
        >
          Walletly User
        </Link>
      </div>
    </div>
  );
};
