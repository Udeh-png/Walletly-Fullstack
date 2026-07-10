import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Sun",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Mon",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Tue",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Wed",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Thu",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Fri",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Sat",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const MyAreaChart = () => {
  return (
    <AreaChart
      style={{
        width: "100%",
        maxWidth: "700px",
      }}
      responsive
      data={data}
      margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
      className="min-[955]:aspect-2/1 aspect-[1/0.7]"
    >
      <defs>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="5%"
            stopColor="var(--primary-color)"
            stopOpacity={0.8}
          />
          <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" stroke="rgba(255,255,255,0.65)" />
      <YAxis
        width="auto"
        stroke="rgba(255,255,255,0.65)"
        tickFormatter={(val) =>
          Intl.NumberFormat("en", { notation: "compact" }).format(val)
        }
      />

      <Tooltip
        formatter={(val) =>
          Intl.NumberFormat("en", { notation: "compact" }).format(val as number)
        }
        wrapperStyle={{
          color: "var(--primary-color)",
        }}
      />
      <Area
        type="monotone"
        dataKey="pv"
        stroke="var(--primary-color)"
        color="red"
        fillOpacity={1}
        fill="url(#colorPv)"
        isAnimationActive={true}
      />
    </AreaChart>
  );
};
