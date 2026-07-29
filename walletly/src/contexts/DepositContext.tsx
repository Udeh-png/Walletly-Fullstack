"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface FundWalletModalContextType {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const FundWalletModalContext = createContext<FundWalletModalContextType>(
  {
    modalOpen: false,
    setModalOpen: () => false,
  },
);

export default function DepositModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [depositModalOpen, setDepositModalOpen] = useState(false);

  return (
    <FundWalletModalContext.Provider
      value={{ modalOpen: depositModalOpen, setModalOpen: setDepositModalOpen }}
    >
      {children}
    </FundWalletModalContext.Provider>
  );
}
