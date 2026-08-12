"use client";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import {
  LuBell,
  LuChartArea,
  LuCircleHelp,
  LuEllipsis,
  LuHistory,
  LuLayoutDashboard,
  LuLogOut,
  LuSettings,
} from "react-icons/lu";
import { CiCreditCard1 } from "react-icons/ci";
import Link from "next/link";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { RiHistoryFill } from "react-icons/ri";
import { IoWalletOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { FaRegPaperPlane, FaRegTrashCan, FaRegUser } from "react-icons/fa6";

const DesktopNav = () => {
  const pathname = usePathname();
  const activeLinkStyle =
    "bg-white/10 after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:-left-0.5 after:w-1 after:h-[70%] after:bg-primary after:rounded-full";
  return (
    <div className="h-screen w-65 border-r border-r-white/10 fixed top-0 left-0 bg-[rgba(21,20,31,0.5)] py-5 px-3 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-x-3">
          <img src={"/images/logo.png"} className="w-8" />
          <p className="text-lg font-semibold">Walletly</p>
        </div>

        <div className="mt-7">
          <ul className="flex flex-col gap-y-2 mt-1">
            <li>
              <Link
                href={"/dashboard"}
                className={`flex items-center gap-x-2 text-white/90 overflow-clip p-2 relative rounded-lg transition-colors duration-100 ${pathname.includes("dashboard") && activeLinkStyle}`}
              >
                <LuLayoutDashboard className="text-lg" />
                <p className="">Dashboard</p>
              </Link>
            </li>

            <li>
              <Link
                href={"/transfer"}
                className={`flex items-center gap-x-2 text-white/90 overflow-clip p-2 relative rounded-lg transition-colors duration-100 ${pathname.includes("transfer") && activeLinkStyle}`}
              >
                <FaRegPaperPlane className="" />
                <span>Send Money</span>
              </Link>
            </li>

            <li>
              <div className="flex items-center gap-x-2 text-white/90 overflow-clip p-2">
                <LuHistory className="text-lg" />
                <p className="">Transactions</p>
              </div>
            </li>

            <li>
              <div className="flex items-center gap-x-2 text-white/90 overflow-clip p-2">
                <CiCreditCard1 className="text-xl" />
                <p className="">Payment methods</p>
              </div>
            </li>

            <li>
              <div className="flex items-center gap-x-2 text-white/90 overflow-clip p-2">
                <LuBell className="text-lg" />
                <p className="">Notifications</p>
              </div>
            </li>

            <li>
              <div className="flex items-center gap-x-2 text-white/90 overflow-clip p-2">
                <LuChartArea className="text-lg" />
                <p className="">Analytics</p>
              </div>
            </li>

            <li>
              <div className="flex items-center gap-x-2 text-white/90 overflow-clip p-2">
                <LuSettings className="text-lg" />
                <p className="">Settings</p>
              </div>
            </li>

            <li>
              <div className="flex items-center gap-x-2 text-white/90 overflow-clip p-2">
                <LuCircleHelp className="text-lg" />
                <p className="">Help desk</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-x-3 border-b border-white/10 pb-3 -mx-3 px-2">
          <div className="p-2.5 bg-gray-700 size-fit rounded-full">
            <FaRegUser />
          </div>

          <div>
            <p className="font-light">Udeh Chisom</p>
            <p className="text-xs font-light text-white/60">
              leonwokedichisom@gmail.com
            </p>
          </div>
        </div>

        <div className="pl-1 -mb-3 space-y-4">
          <div className="flex items-center gap-x-2 overflow-clip text-white/60">
            <LuLogOut className="text-lg" />
            <p className="">Logout</p>
          </div>

          <div className="flex items-center gap-x-2 overflow-clip text-red-500">
            <FaRegTrashCan className="text-lg" />
            <p className="">Delete Account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 w-full px-5 py-3 bg-[#161224] z-50">
      <div className="flex items-center justify-between relative after:content-[''] after:absolute after:left-[51%] after:-top-9 after:bg-[#161224] after:-z-10 after:-translate-x-1/2 after:size-18 after:rounded-full">
        <ul className="contents">
          <li>
            <Link
              href={"/dashboard"}
              className={`flex flex-col items-center w-fit text-[0.65rem] font-semibold transition-colors ${pathname.includes("dashboard") ? "text-primary" : "text-white/80"}`}
            >
              <span className="rounded-xl">
                <LuLayoutDashboard className="text-[1.35rem]" />
              </span>
              <span>Home</span>
            </Link>
          </li>

          <li>
            <div className="flex flex-col items-center text-white/80 w-fit text-[0.65rem] font-semibold">
              <IoWalletOutline className="text-[1.35rem]" />
              <p>Payments</p>
            </div>
          </li>

          <li>
            <div className="relative px-3">
              <div className="flex flex-col items-center text-primary w-fit text-[0.65rem] font-semibold absolute -top-11 left-1/2 -translate-x-1/2">
                <div
                  className="rounded-full p-3 text-white w-fit text-xs font-semibold bg-primary"
                  style={{
                    border: "1px solid transparent",
                    backgroundClip: "padding-box, border-box",
                    backgroundOrigin: "border-box",
                    backgroundImage:
                      "linear-gradient(var(--primary-color)), linear-gradient(to top, var(--primary-color), rgba(255,255,255,0.6))",
                    // boxShadow: "0 -3px 10px rgba(255,255,255,0.2)",
                  }}
                >
                  <MdOutlineQrCodeScanner className="text-2xl" />
                </div>

                <p>Scan</p>
              </div>
            </div>
          </li>

          <li>
            <div className="flex flex-col items-center text-white/80 w-fit text-[0.65rem] font-semibold">
              <RiHistoryFill className="text-[1.35rem]" />
              <p>Activities</p>
            </div>
          </li>

          <li>
            <div className="flex flex-col items-center text-white/80 w-fit text-[0.65rem] font-semibold">
              <LuEllipsis className="text-[1.35rem]" />
              <p>More</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const Nav = () => {
  return (
    <nav>
      <div className="min-[768px]:block hidden">
        <DesktopNav />
      </div>

      <div className="min-[768px]:hidden">
        <MobileNav />
      </div>
    </nav>
  );
};
