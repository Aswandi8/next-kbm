"use client";
import { Button } from "@/components/ui/button";
import { useStateContext } from "@/context/ContextProvider";

type buttonParams = {
  type?: "button" | "submit" | "reset";
  text: string;
  customFunc?: () => void;
  className?: string;
};

const MyButton = ({
  type = "button",
  text,
  customFunc,
  className,
}: buttonParams) => {
  const { currentColor, currentColorText } = useStateContext();
  return (
    <>
      <Button
        type={type}
        onClick={customFunc}
        style={{ background: currentColor, color: currentColorText }}
        className={`${className} text-sm h-8 px-4 py-2 rounded-[20px] hover:drop-shadow-xl opacity-0.9 tracking-wider`}
      >
        {text}
      </Button>
    </>
  );
};
export default MyButton;
