"use client";
import { useStateContext } from "@/context/ContextProvider";
import { Separator } from "@/components/ui/separator";

const MySeparator = ({
  label,
}: {
  label: "horizontal" | "vertical" | undefined;
}) => {
  const { currentColor } = useStateContext();
  return (
    <>
      <Separator
        orientation={label}
        className="my-2"
        style={
          label === "vertical"
            ? {
                backgroundColor: currentColor,
                marginLeft: "1rem",
                marginRight: "1rem",
              }
            : { backgroundColor: currentColor }
        }
      />
    </>
  );
};
export default MySeparator;
