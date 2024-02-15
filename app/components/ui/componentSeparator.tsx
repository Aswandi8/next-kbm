import Link from "next/link";
import MyCard from "./card";
import MyHeading from "./heading";
import MyLabel from "./label";
import MyParagraph from "./paragraph";
import MySeparator from "./separator";
import MySpan from "./span";

type componentParams = {
  title: string;
  subTitle?: string;
  nav1?: string;
  link1?: string;
  nav2?: string;
  link2?: string;
  nav3?: string;
  link3?: string;
  active: string;
};
const ComponentSeparator = ({
  title,
  subTitle,
  nav1,
  link1,
  nav2,
  link2,
  nav3,
  link3,
  active,
}: componentParams) => {
  return (
    <>
      <MyCard>
        <MyHeading title={title} className="uppercase" />
        {subTitle && <MyLabel title={subTitle} />}
        <MySeparator label="horizontal" />
        <div className="flex h-5 items-center text-sm">
          {nav1 && (
            <MyParagraph>
              <Link href={link1 ?? "/admin/home"}>{nav1}</Link>
            </MyParagraph>
          )}
          {nav2 && (
            <>
              <MySeparator label="vertical" />
              <MyParagraph>
                <Link href={link2 ?? "/admin/home"}>{nav2}</Link>
              </MyParagraph>
            </>
          )}
          {nav3 && (
            <>
              <MySeparator label="vertical" />
              <MyParagraph>
                <Link href={link3 ?? "/admin/home"}>{nav3}</Link>
              </MyParagraph>
            </>
          )}
          <MySeparator label="vertical" />
          <MySpan>
            <p>{active}</p>
          </MySpan>
        </div>
      </MyCard>
    </>
  );
};
export default ComponentSeparator;
