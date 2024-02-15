"use client";

import { useStateContext } from "@/context/ContextProvider";

type spanParams = {
  children: React.ReactNode;
  className?: string;
};
const MySpan = ({ children, className }: spanParams) => {
  const { currentColorText } = useStateContext();
  return (
    <>
      <div
        className={`${className} text-sm font-semibold tracking-wider`}
        style={{ color: currentColorText }}
      >
        {children}
      </div>
    </>
  );
};
export default MySpan;
