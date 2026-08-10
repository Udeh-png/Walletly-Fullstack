export const BalanceSection = () => {
  const dailyLimit = 100_000;
  const totalToday = 36_700;
  const percentage = (totalToday / dailyLimit) * 100;
  return (
    <div className="border-2 border-white/10 rounded-2xl p-4 sm:p-5 h-fit bg-slate-500/5">
      <p>Available Balance</p>

      <p className="text-3xl sm:text-4xl font-semibold mt-2">₦394,434.00</p>

      <div className="mt-3">
        <div className="w-full text-white/60 text-sm flex justify-between items-center">
          <p>Daily transfer dailyLimit</p>

          <p>
            ₦{totalToday.toLocaleString()} / ₦{dailyLimit.toLocaleString()}
          </p>
        </div>

        <div
          className="w-full rounded-full h-1.5 mt-3"
          style={{
            background: `linear-gradient(to right, var(--primary-color) ${percentage}%, rgba(255,255,255,.1) ${percentage}%)`,
          }}
        />
      </div>
    </div>
  );
};
