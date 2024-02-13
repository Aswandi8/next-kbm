type cardParams = {
  children: React.ReactNode;
  className?: string;
};
const MyCard = ({ children, className }: cardParams) => {
  return (
    <div
      className={`${className} bg-gray-300 dark:bg-slate-800 rounded-[10px] p-6 shadow-lg`}
    >
      {children}
    </div>
  );
};
export default MyCard;
