"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type TabChangeContextType = {
  transferType: "internal" | "external";
  setTransferType: Dispatch<SetStateAction<"internal" | "external">>;
};

export const TabChangeContext = createContext<TabChangeContextType>({
  transferType: "external",
  setTransferType: () => "",
});

export const TabChangeContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [transferType, setTransferType] = useState<"internal" | "external">(
    "internal",
  );
  return (
    <TabChangeContext.Provider
      value={{ setTransferType: setTransferType, transferType: transferType }}
    >
      {children}
    </TabChangeContext.Provider>
  );
};
