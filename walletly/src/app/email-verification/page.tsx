import { IoIosMailUnread } from "react-icons/io";

export default function EmailVerificationPage() {
  return (
    <div className="max-w-3xl mx-auto min-h-screen flex flex-col items-center gap-6 px-4">
      <div className="p-2 bg-primary rounded-[0.6rem] w-fit text-3xl shadow-[0_5px_20px_color-mix(in_srgb,var(--primary-color)_40%,transparent)]">
        <IoIosMailUnread />
      </div>

      <div>
        <p className="text-3xl font-bold">Verify your email</p>
        <div>
          <p>We emailed you the six digit code to</p>
          <span className="font-medium">chineduikechukwu@gmail.com</span>
        </div>
      </div>
    </div>
  );
}
