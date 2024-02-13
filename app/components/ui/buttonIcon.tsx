import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
type buttonIconParams = {
  title: string;
  customFunc?: () => void;
  color: string;
  dotColor?: string;
  icon: any;
};
const ButtonIcon = ({
  title,
  customFunc,
  color,
  dotColor,
  icon,
}: buttonIconParams) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => customFunc?.()}
              style={{ color: color }}
              className="relative text-xl rounded-full hover:text-white dark:hover:text-black"
            >
              <span
                className="absolute inline-flex rounded-full h-2.5 w-2.5 right-2 top-2"
                style={{ background: dotColor }}
              />
              {icon}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};
export default ButtonIcon;
