/* eslint-disable @next/next/no-img-element */
"use client";
import { motion } from "framer-motion";

export const AuthLeftSide = () => {
  return (
    <div className="lg:flex hidden items-start flex-col gap-6">
      <motion.div
        initial={{ translateY: 100, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: "tween" }}
      >
        <img src="/images/logo.png" alt="" className="md:max-w-80 max-w-40" />
      </motion.div>
      <div className="">
        <motion.p
          className="text-5xl font-bold"
          initial={{ translateY: 100, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: "tween", delay: 0.2 }}
        >
          Take <span className="text-primary">Control</span> Of Your Finance
        </motion.p>
        <motion.p
          className="text-xl text-gray-500 mt-4"
          initial={{ translateY: 100, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: "tween", delay: 0.4 }}
        >
          The modern way to tract, manage, and grow your wealth with confidence.
          Join thousands today.
        </motion.p>
      </div>

      <div className="flex items-center gap-5">
        <motion.div
          className="flex"
          initial={{ translateX: -100, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{ type: "tween", delay: 0.5 }}
        >
          <div className="size-10 border-3 border-border-color rounded-full -mr-3 bg-red-500" />
          <div className="size-10 border-3 border-border-color rounded-full -mr-3 bg-green-500" />
          <div className="size-10 border-3 border-border-color rounded-full -mr-3 bg-blue-500" />
        </motion.div>

        <motion.p
          className="text-sm font-semibold text-gray-500"
          initial={{ translateX: 100, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{ type: "tween", delay: 0.5 }}
        >
          Trusted by 10k+ users
        </motion.p>
      </div>
    </div>
  );
};
