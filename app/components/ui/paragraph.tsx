type paragraphParams = {
  children: React.ReactNode;
  className?: string;
};
const MyParagraph = ({ children, className }: paragraphParams) => {
  return (
    <>
      <div className={`${className} text-sm font-normal tracking-wider`}>
        {children}
      </div>
    </>
  );
};
export default MyParagraph;
