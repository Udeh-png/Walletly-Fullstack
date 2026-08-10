import { ExternalTransferFormFields } from "@/sections/transfer/ExternalTransferFormFields";
import { InternalTransferFormFields } from "@/sections/transfer/InternalTransferFormFields";
import { FaArrowRight } from "react-icons/fa6";
import { notFound } from "next/navigation";

export default async function TransferForm({
  params,
}: {
  params: Promise<{ type: "internal" | "external" }>;
}) {
  const type = (await params).type;

  if (type !== "external" && type !== "internal") {
    notFound();
  }

  // import z from "zod";

  // const zodSchema = z.object({
  //   email_add: z.email(),
  //   acc_no: z.string().min(10),
  //   phone_no: z.string().min(11),
  // });

  // type IdentifierType = z.infer<typeof zodSchema>;

  return (
    <>
      {type === "internal" && <InternalTransferFormFields />}

      {type === "external" && <ExternalTransferFormFields />}

      <div className="border-2 border-white/10 rounded-2xl px-3 py-4 sm:p-5 h-fit sm:space-y-7 space-y-7 bg-slate-500/5">
        <div className="input-container">
          <label htmlFor="accountNumber" className="input-label mb-1 ml-1">
            Amount
          </label>

          <div className="flex items-center gap-x-3 border-2 rounded-xl border-white/10 p-3 relative">
            <span className="text-primary">₦</span>
            <input placeholder="0.00" className="w-full outline-none" />
          </div>
          <div className="w-full flex justify-between px-2 mt-1">
            <p className="text-white/60 text-sm">Fee: ₦0.00</p>
            <p className="text-white/60 text-sm">Total: ₦0.00</p>
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="accountNumber" className="input-label mb-1 ml-1">
            Narration <span className="text-white/50">(optional)</span>
          </label>

          <div className="flex items-center gap-x-3 border-2 rounded-xl border-white/10 p-3 relative">
            <textarea
              className="w-full outline-none"
              placeholder="What is this transfer for?"
            />
          </div>
        </div>

        <div>
          <button className="button-primary w-full flex items-center justify-center gap-x-3 shadow-none!">
            <span>Complete Transfer</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}
