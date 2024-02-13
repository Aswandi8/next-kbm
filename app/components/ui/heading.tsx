"use client";
import { useStateContext } from "@/context/ContextProvider";

type headingParams = {
  title: string;
  color?: boolean;
  className?: string;
};
const MyHeading = ({ title, className, color }: headingParams) => {
  const { currentColor, currentColorText } = useStateContext();
  return (
    <div>
      <div
        className={`${className} text-md font-semibold tracking-wider`}
        style={color ? { color: currentColor } : { color: currentColorText }}
      >
        {title}
      </div>
    </div>
  );
};
export default MyHeading;
