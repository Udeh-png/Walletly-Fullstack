export const BalanceSection = () => {
  return (
    <div className="border-2 border-white/10 rounded-2xl p-4 sm:p-5 h-fit bg-slate-500/5">
      <p>Available Balance</p>

      <p className="text-3xl sm:text-4xl font-semibold mt-2">₦394,434.00</p>

      <div className="mt-3">
        <div className="w-full text-white/60 text-sm flex justify-between items-center">
          <p>Daily transfer limit</p>

          <p>₦32,000 / ₦100,000</p>
        </div>

        <div
          className="w-full rounded-full h-1.5 mt-3"
          style={{
            background:
              "linear-gradient(to right, var(--primary-color) 40%, rgba(255,255,255,.1) 20%)",
          }}
        />
      </div>
    </div>
  );
};
