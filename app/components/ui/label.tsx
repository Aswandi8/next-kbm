type labelParams = {
  title: string;
  className?: string;
};
const MyLabel = ({ title, className }: labelParams) => {
  return (
    <div>
      <div
        className={`${className} text-sm font-semibold tracking-wider text-gray-400`}
      >
        {title}
      </div>
    </div>
  );
};
export default MyLabel;
