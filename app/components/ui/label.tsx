type labelParams = {
  title: string;
  className?: string;
};
const MyLabel = ({ title, className }: labelParams) => {
  return (
    <>
      <div
        className={`${className} text-sm font-normal tracking-wider text-gray-400`}
      >
        {title}
      </div>
    </>
  );
};
export default MyLabel;
