import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";

export const MoneyFlowCard = ({
  type,
  figure,
  change,
  state,
}: {
  type: "In" | "Out";
  figure: number;
  change: number;
  state: "good" | "bad";
}) => {
  return (
    <section
      className={`border border-white/10 rounded-2xl p-4 sm:p-5 relative overflow-clip`}
      style={{
        background:
          "linear-gradient(155deg, rgba(155, 75, 194, 0.16), rgba(8, 8, 17, 0.55))",
        boxShadow:
          "0 8px 32px rgba(155, 75, 194, 0.10), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {type == "In" ? (
            <p className="bg-primary/10 text-primary/70 rounded-lg w-fit text-[0.6rem] p-2">
              <FaArrowDownLong />
            </p>
          ) : (
            <p className="bg-primary/10 text-primary/70 rounded-lg w-fit text-[0.6rem] p-2">
              <FaArrowUpLong />
            </p>
          )}
          <h4 className="font-semibold text-white/70 uppercase text-sm">
            Money {type}
          </h4>
        </div>

        <p className="text-xs text-white/45 font-light">This month</p>
      </div>

      <p className="text-4xl font-bold mt-4">
        ₦{figure.toLocaleString("en-US")}
      </p>

      <p className="text-sm text-white/60 mt-4">
        <span
          className={`${state == "good" ? "text-green-500" : "text-red-500"}`}
        >
          {type == "In" &&
            (state == "good" ? (
              <RxTriangleUp className="inline text-lg" />
            ) : (
              <RxTriangleDown className="inline text-lg" />
            ))}
          {type == "Out" &&
            (state == "good" ? (
              <RxTriangleDown className="inline text-lg" />
            ) : (
              <RxTriangleUp className="inline text-lg" />
            ))}
          {change}%
        </span>{" "}
        vs last month
      </p>
    </section>
  );
};
