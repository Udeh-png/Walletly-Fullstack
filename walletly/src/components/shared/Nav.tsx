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
import { SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Drawer } from "vaul";
import { useMediaQuery } from "@/hooks/UseMediaQuery";

const LogoutModal = ({ onClose }: { onClose: () => void }) => {
  const handleLogout = async () => {
    await fetch("http://localhost:8080/api/account/logout", {
      method: "POST",
      credentials: "include",
    });
  };
  return (
    <div className="space-y-5">
      <div className="text-2xl p-3 bg-red-500/10 rounded-full text-red-500 size-fit">
        <LuLogOut />
      </div>

      <div>
        <p className="text-2xl font-semibold mb-1">Log out?</p>
        <p className="text-sm text-white/60">
          You&apos;ll need to sign in again to access your account.
        </p>
      </div>

      <div className="flex md:flex-row flex-col-reverse justify-between gap-3">
        <button
          className="flex-1 md:py-2 py-3 border border-white/10 rounded-xl cursor-pointer"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="flex-1 md:py-2 py-3 bg-red-800 rounded-xl cursor-pointer"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

const DesktopNav = ({
  openLogoutModal,
  setOpenLogoutModal,
}: {
  openLogoutModal: boolean;
  setOpenLogoutModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const activeLinkStyle =
    "bg-white/10 after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:-left-0.5 after:w-1 after:h-[70%] after:bg-primary after:rounded-full";
  return (
    <div className="h-screen w-65 border-r border-r-white/10 fixed top-0 left-0 bg-[rgba(21,20,31,0.5)] py-5 px-3 flex flex-col justify-between">
      <AnimatePresence>
        {openLogoutModal && (
          <div className="fixed inset-0 z-10 flex items-center justify-center">
            <motion.div
              className="absolute inset-0 bg-black/40"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => setOpenLogoutModal(false)}
            />
            <motion.div
              className="p-6 bg-[#161224] rounded-2xl space-y-5 border border-primary/20 relative"
              style={{
                boxShadow: "0 0 15px 10px rgba(0,0,0,0.08)",
              }}
              initial={{
                scale: 0.5,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.5,
                opacity: 0,
              }}
            >
              <LogoutModal onClose={() => setOpenLogoutModal(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div>
        <div className="flex items-center gap-x-3">
          <img src={"/images/logo.png"} className="w-8" />
          <p className="text-lg font-semibold">Walletly</p>
        </div>

        <div className="mt-7">
          <ul className="flex flex-col gap-y-2 mt-1">
            <li>
              <Link
                href={"/home"}
                className={`flex items-center gap-x-2 text-white/90 overflow-clip p-2 relative rounded-lg transition-colors duration-100 ${pathname.includes("home") && activeLinkStyle}`}
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
          <button
            className="flex items-center gap-x-2 overflow-clip text-white/60 w-full text-left cursor-pointer"
            onClick={() => setOpenLogoutModal(true)}
          >
            <LuLogOut className="text-lg" />
            <p className="">Logout</p>
          </button>

          <div className="flex items-center gap-x-2 overflow-clip text-red-500">
            <FaRegTrashCan className="text-lg" />
            <p className="">Delete Account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileNav = ({
  openLogoutModal,
  setOpenLogoutModal,
}: {
  openLogoutModal: boolean;
  setOpenLogoutModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <div className="fixed bottom-0 left-0 w-full px-5 py-3 bg-[#161224] z-50">
      <div className="flex items-center justify-between relative after:content-[''] after:absolute after:left-[51%] after:-top-9 after:bg-[#161224] after:-z-10 after:-translate-x-1/2 after:size-18 after:rounded-full">
        {!isDesktop && (
          <Drawer.Root
            open={openLogoutModal}
            onClose={() => setOpenLogoutModal(false)}
          >
            <Drawer.Portal>
              <Drawer.Content className="fixed z-100 rounded-t-3xl h-fit bottom-0! mb-0! left-0 w-full bg-[#161224] py-3 px-3 overflow-hidden">
                <Drawer.Handle />
                <div className="py-3 px-2 rounded-2xl">
                  <LogoutModal onClose={() => setOpenLogoutModal(false)} />
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        )}
        <AnimatePresence mode="wait">
          {showMore && (
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
              className="absolute -right-3 bottom-[160%] flex flex-col items-end gap-y-3"
            >
              <div
                className="fixed -inset-15 bg-black/40 z-10"
                onClick={() => setShowMore(false)}
              />

              <motion.button
                initial={{
                  translateX: "100%",
                }}
                animate={{
                  translateX: "0",

                  transition: { delay: 0.1 },
                }}
                exit={{
                  translateX: "100%",

                  transition: { delay: 0 },
                }}
                className="flex rounded-full bg-[#161224] py-2 px-4 items-center gap-x-2 text-sm relative z-50 font-semibold w-fit text-white/80"
                onClick={() => setOpenLogoutModal(true)}
              >
                <LuLogOut className="text-[1.35rem]" />

                <p>Logout</p>
              </motion.button>

              <motion.div
                initial={{
                  translateX: "100%",
                }}
                animate={{
                  translateX: "0",

                  transition: { delay: 0 },
                }}
                exit={{
                  translateX: "100%",

                  transition: { delay: 0.1 },
                }}
                className="flex rounded-full bg-[#161224] py-2 px-4 items-center gap-x-2 text-sm relative z-50 font-semibold text-red-800 w-fit"
              >
                <FaRegTrashCan className="text-[1.35rem]" />

                <p>Delete account</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <ul className="contents">
          <li>
            <Link
              href={"/home"}
              className={`flex flex-col items-center w-fit text-[0.65rem] font-semibold transition-colors ${pathname.includes("home") ? "text-primary" : "text-white/80"}`}
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
            <button
              className="flex flex-col items-center text-white/80 w-fit text-[0.65rem] font-semibold relative z-10"
              onClick={() => setShowMore((prev) => !prev)}
            >
              <LuEllipsis className="text-[1.35rem]" />
              <p>More</p>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const Nav = () => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  return (
    <nav>
      <div className="min-[768px]:block hidden">
        <DesktopNav
          openLogoutModal={openLogoutModal}
          setOpenLogoutModal={setOpenLogoutModal}
        />
      </div>

      <div className="min-[768px]:hidden">
        <MobileNav
          openLogoutModal={openLogoutModal}
          setOpenLogoutModal={setOpenLogoutModal}
        />
      </div>
    </nav>
  );
};
