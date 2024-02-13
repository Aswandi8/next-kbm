"use client";
import { useStateContext } from "@/context/ContextProvider";

type buttoncircleParams = {
  children: React.ReactNode;
};

const MyButtonCircle = ({ children }: buttoncircleParams) => {
  const { currentColor, currentColorText } = useStateContext();
  return (
    <>
      <div
        className="p-2 rounded-full hover:shadow-md"
        style={{ background: currentColor, color: currentColorText }}
      >
        {children}
      </div>
    </>
  );
};
export default MyButtonCircle;
