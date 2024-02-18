import Image from "next/image";
type imageParams = {
  alt: string;
  src: string;
  className?: string;
  onClick?: () => void;
};

const MyImage = ({ alt, src, className, onClick }: imageParams) => {
  return (
    <>
      <Image
        src={src}
        width={500}
        height={500}
        alt={alt}
        priority={true}
        // priority={true}
        className={className}
        onClick={onClick}
      />
    </>
  );
};
export default MyImage;
