"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    day: "Sun",
    amt: 2400,
  },
  {
    day: "Mon",
    amt: 1398,
  },
  {
    day: "Tue",
    amt: 9800,
  },
  {
    day: "Wed",
    amt: 3908,
  },
  {
    day: "Thu",
    amt: 4800,
  },
  {
    day: "Fri",
    amt: 3800,
  },
  {
    day: "Sat",
    amt: 4300,
  },
];

export const MyAreaChart = () => {
  const [isInView, setIsInView] = useState(false);
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const maxPoint = data.reduce(
    (max, val) => (val.amt > max.amt ? val : max),
    data[0],
  );
  const maxAmt = maxPoint.amt;
  return (
    <motion.div onViewportEnter={() => setIsInView(true)}>
      <AreaChart
        key={String(isInView)}
        style={{
          width: "100%",
          maxWidth: "700px",
        }}
        responsive
        data={data}
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        className="min-[955]:aspect-[2/1.08] aspect-[1/0.7]"
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--primary-color)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--primary-color)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" stroke="rgba(255,255,255,0.65)" />
        <YAxis
          width="auto"
          stroke="rgba(255,255,255,0.65)"
          tickFormatter={(val) => formatter.format(val)}
        />

        <Tooltip
          formatter={(val) => formatter.format(val as number)}
          wrapperStyle={{
            color: "var(--primary-color)",
          }}
        />
        <CartesianGrid opacity={0.2} stroke={"rgb(155, 75, 194)"} />
        <ReferenceDot
          x={maxPoint.day}
          y={maxPoint.amt}
          r={0}
          label={{
            value: `₦${formatter.format(maxAmt)}`,
            position: "right",
            fill: "rgba(255,255,255,0.7)",
            fontSize: 12,
          }}
        />
        <Area
          type="monotone"
          dataKey="amt"
          stroke="var(--primary-color)"
          dot={{ r: 4, fill: "#9b4bc2" }}
          color="red"
          fillOpacity={1}
          fill="url(#colorPv)"
          className={isInView ? "opacity-100" : "opacity-0"} // could have used hide prop or conditional rendering but that caused overflowing glitch
        />
      </AreaChart>
    </motion.div>
  );
};
