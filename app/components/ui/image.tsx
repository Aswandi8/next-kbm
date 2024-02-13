import Image from "next/image";
type imageParams = {
  alt: string;
  src: string;
  className?: string;
};

const MyImage = ({ alt, src, className }: imageParams) => {
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
      />
    </>
  );
};
export default MyImage;
