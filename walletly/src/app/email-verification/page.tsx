import { FaStopwatch } from "react-icons/fa6";
import { IoIosMailUnread } from "react-icons/io";

export default function EmailVerificationPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="form-wrapper2 md:p-10 md:w-fit w-full">
        <form action="" className="space-y-7">
          <div className="flex flex-col items-center gap-5">
            <div className="p-2 bg-primary rounded-[0.6rem] w-fit text-3xl shadow-[0_5px_20px_color-mix(in_srgb,var(--primary-color)_40%,transparent)]">
              <IoIosMailUnread />
            </div>

            <p className="text-3xl font-bold">Verify Account</p>
            <div className="text-center">
              <p className="text-white/70 md:font-light font-normal">
                We&apos;ve sent a 6-digit verification code to
              </p>
              <span className="font-medium">chineduikechukwu@gmail.com</span>
            </div>
          </div>

          <div className="flex md:gap-5 justify-between w-full">
            <input
              type="text"
              maxLength={1}
              placeholder="•"
              className="border-2 border-border rounded-lg md:size-13 size-12 text-center text-xl font-bold focus:border-primary outline-0 transition-colors duration-500 caret-transparent"
            />
            <input
              type="text"
              maxLength={1}
              placeholder="•"
              className="border-2 border-border rounded-lg md:size-13 size-12 text-center text-xl font-bold focus:border-primary outline-0 transition-colors duration-500 caret-transparent"
            />
            <input
              type="text"
              maxLength={1}
              placeholder="•"
              className="border-2 border-border rounded-lg md:size-13 size-12 text-center text-xl font-bold focus:border-primary outline-0 transition-colors duration-500 caret-transparent"
            />
            <input
              type="text"
              maxLength={1}
              placeholder="•"
              className="border-2 border-border rounded-lg md:size-13 size-12 text-center text-xl font-bold focus:border-primary outline-0 transition-colors duration-500 caret-transparent"
            />
            <input
              type="text"
              maxLength={1}
              placeholder="•"
              className="border-2 border-border rounded-lg md:size-13 size-12 text-center text-xl font-bold focus:border-primary outline-0 transition-colors duration-500 caret-transparent"
            />
            <input
              type="text"
              maxLength={1}
              placeholder="•"
              className="border-2 border-border rounded-lg md:size-13 size-12 text-center text-xl font-bold focus:border-primary outline-0 transition-colors duration-500 caret-transparent"
            />
          </div>

          <div className="flex items-center gap-1 justify-center text-white/70 text-sm -mt-5">
            <FaStopwatch />
            <p>01:59</p>
          </div>

          <div className="">
            <button type="submit" className="button-primary">
              Verify
            </button>
          </div>

          <p className="text-center text-white/70 md:font-light font-normal">
            Didn&apos;t recieve the code?{" "}
            <button
              className="text-primary font-semibold cursor-not-allowed disabled:line-through disabled:text-gray-600"
              disabled
            >
              Resend Code
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
