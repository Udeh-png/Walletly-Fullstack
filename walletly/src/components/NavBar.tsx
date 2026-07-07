/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import {
  LuBell,
  LuChartArea,
  LuCircleHelp,
  LuHistory,
  LuLayoutDashboard,
  LuLogOut,
  LuSettings,
} from "react-icons/lu";
import { CiCreditCard1 } from "react-icons/ci";

export const Navbar = () => {
  return (
    <div className="md:block hidden h-screen w-65 border-r border-r-white/10 fixed top-0 left-0 bg-[rgba(21,20,31,0.5)] py-5 px-3">
      <div className="flex items-center gap-x-3">
        <img src={"/images/logo.png"} className="w-8" />
        <p className="text-lg font-semibold">Walletly</p>
      </div>

      <div className="mt-7">
        <ul className="flex flex-col gap-y-2 mt-1">
          <li>
            <div className="flex items-center gap-x-2 text-white/90 overflow-clip font-semibold bg-white/10 p-2 relative rounded-lg after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:-left-0.5 after:w-1 after:h-[70%] after:bg-primary after:rounded-full">
              <LuLayoutDashboard className="text-lg" />
              <p className="">Dashboard</p>
            </div>
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

          <li>
            <div className="flex items-center gap-x-2 overflow-clip p-2 text-red-500">
              <LuLogOut className="text-lg" />
              <p className="">Logout</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
