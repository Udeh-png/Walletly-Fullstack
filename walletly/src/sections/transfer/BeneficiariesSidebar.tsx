import { LuSearch } from "react-icons/lu";
import { FaEllipsisVertical, FaRegUser } from "react-icons/fa6";

export const BeneficiariesSidebar = () => {
  return (
    <div>
      <div className="border-2 border-white/10 rounded-2xl p-4 sm:p-3 items-center mb-5 gap-x-2 sm:flex hidden">
        <LuSearch />

        <input
          type="text"
          className="outline-none w-full"
          placeholder="Search beneficiaries"
        />
      </div>
      <div className="sm:grid grid-rows-2 gap-y-5 h-fit hidden">
        <div className="border-2 border-white/10 rounded-2xl px-3 py-4 sm:p-5 h-fit bg-slate-500/5">
          <h3 className="text-lg font-semibold">Saved Beneficiaries</h3>
          <div className="sm:mt-5 mt-3 grid gap-y-3 h-full">
            <div className="grid grid-cols-[auto_1fr] gap-x-3 p-1 rounded-xl">
              <div className="p-3 bg-gray-700 size-fit rounded-full">
                <FaRegUser />
              </div>

              <div className="relative w-full flex justify-between">
                <div>
                  <p className="uppercase">ole gona solche</p>
                  <p className="text-xs text-white/70">154 487 7866</p>
                  <p className="text-xs text-white/70">
                    olegonasolche@gmail.com
                  </p>
                </div>

                <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
              </div>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-x-3 p-1 rounded-xl">
              <div className="p-3 bg-gray-700 size-fit rounded-full">
                <FaRegUser />
              </div>

              <div className="relative w-full flex justify-between">
                <div>
                  <p className="uppercase">maryam japheth</p>
                  <p className="text-xs text-white/70">343 676 8390</p>
                  <p className="text-xs text-white/70">
                    maryamjapheth@gmail.com
                  </p>
                </div>

                <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
              </div>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-x-3 p-1 rounded-xl">
              <div className="p-3 bg-gray-700 size-fit rounded-full">
                <FaRegUser />
              </div>

              <div className="relative w-full flex justify-between">
                <div>
                  <p className="uppercase">kennedy anayor</p>
                  <p className="text-xs text-white/70">143 416 7450</p>
                  <p className="text-xs text-white/70">
                    kennedyanayor@gmail.com
                  </p>
                </div>

                <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
              </div>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-x-3 p-1 rounded-xl">
              <div className="p-3 bg-gray-700 size-fit rounded-full">
                <FaRegUser />
              </div>

              <div className="relative w-full flex justify-between">
                <div>
                  <p className="uppercase">comfort amadi</p>
                  <p className="text-xs text-white/70">123 456 7890</p>
                  <p className="text-xs text-white/70">
                    comfortamadi@gmail.com
                  </p>
                </div>

                <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-2 border-white/10 rounded-2xl px-3 py-4 sm:p-5 h-fit bg-slate-500/5">
          <h3 className="text-lg font-semibold">Recent Transfers</h3>
          <div className="sm:mt-5 mt-3 grid gap-y-3 h-full">
            <div className="grid grid-cols-[auto_1fr] gap-x-3 p-1 rounded-xl">
              <div className="p-3 bg-gray-700 size-fit rounded-full">
                <FaRegUser />
              </div>

              <div className="relative w-full flex justify-between">
                <div>
                  <p className="uppercase">ole gona solche</p>
                  <p className="text-xs text-white/70">154 487 7866</p>
                  <p className="text-xs text-white/70">
                    olegonasolche@gmail.com
                  </p>
                </div>

                <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
              </div>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-x-3 p-1 rounded-xl">
              <div className="p-3 bg-gray-700 size-fit rounded-full">
                <FaRegUser />
              </div>

              <div className="relative w-full flex justify-between">
                <div>
                  <p className="uppercase">maryam japheth</p>
                  <p className="text-xs text-white/70">343 676 8390</p>
                  <p className="text-xs text-white/70">
                    maryamjapheth@gmail.com
                  </p>
                </div>

                <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
              </div>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-x-3 p-1 rounded-xl">
              <div className="p-3 bg-gray-700 size-fit rounded-full">
                <FaRegUser />
              </div>

              <div className="relative w-full flex justify-between">
                <div>
                  <p className="uppercase">kennedy anayor</p>
                  <p className="text-xs text-white/70">143 416 7450</p>
                  <p className="text-xs text-white/70">
                    kennedyanayor@gmail.com
                  </p>
                </div>

                <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
              </div>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-x-3 p-1 rounded-xl">
              <div className="p-3 bg-gray-700 size-fit rounded-full">
                <FaRegUser />
              </div>

              <div className="relative w-full flex justify-between">
                <div>
                  <p className="uppercase">comfort amadi</p>
                  <p className="text-xs text-white/70">123 456 7890</p>
                  <p className="text-xs text-white/70">
                    comfortamadi@gmail.com
                  </p>
                </div>

                <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-2 border-white/10 rounded-2xl px-3 py-4 sm:p-5 h-fit bg-slate-500/5 sm:hidden">
        <div className="flex justify-between items-center border-b border-white/10 pb-2 px-2">
          <div className="flex gap-x-7">
            <h3 className="relative after:absolute after:bottom-0 after:left text-primary">
              Saved
            </h3>

            <h3 className="">Recents</h3>
          </div>

          <LuSearch />
        </div>

        <div className="mt-3 grid gap-y-5 h-full">
          <div className="grid grid-cols-[auto_1fr] gap-x-3 rounded-xl">
            <div className="p-3 bg-gray-700 size-fit rounded-full">
              <FaRegUser />
            </div>

            <div className="relative w-full flex justify-between">
              <div>
                <p className="uppercase">ole gona solche</p>
                <p className="text-xs text-white/70">154 487 7866</p>
                <p className="text-xs text-white/70">olegonasolche@gmail.com</p>
              </div>

              <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-x-3 rounded-xl">
            <div className="p-3 bg-gray-700 size-fit rounded-full">
              <FaRegUser />
            </div>

            <div className="relative w-full flex justify-between">
              <div>
                <p className="uppercase">maryam japheth</p>
                <p className="text-xs text-white/70">343 676 8390</p>
                <p className="text-xs text-white/70">maryamjapheth@gmail.com</p>
              </div>

              <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-x-3 rounded-xl">
            <div className="p-3 bg-gray-700 size-fit rounded-full">
              <FaRegUser />
            </div>

            <div className="relative w-full flex justify-between">
              <div>
                <p className="uppercase">kennedy anayor</p>
                <p className="text-xs text-white/70">143 416 7450</p>
                <p className="text-xs text-white/70">kennedyanayor@gmail.com</p>
              </div>

              <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-x-3 rounded-xl">
            <div className="p-3 bg-gray-700 size-fit rounded-full">
              <FaRegUser />
            </div>

            <div className="relative w-full flex justify-between">
              <div>
                <p className="uppercase">comfort amadi</p>
                <p className="text-xs text-white/70">123 456 7890</p>
                <p className="text-xs text-white/70">comfortamadi@gmail.com</p>
              </div>

              <FaEllipsisVertical className="text-white/50 text-sm absolute right-3 top-0 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
