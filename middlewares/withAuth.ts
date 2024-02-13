import { getToken } from "next-auth/jwt";

import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const onlyAdmin = ["admin"];
const onlyMember = ["member"];
const onlyMarketing = ["marketing"];
const onlyLogistic = ["logistic"];
const onlyTeknisi = ["teknisi"];
const onlyKeuangan = ["keuangan"];
const authPage = ["auth"];
const home = ["/"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    // const pathname = req.nextUrl.pathname;
    const pathname = req.nextUrl.pathname.split("/")[1];
    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: true,
      });
      if (!token && !authPage.includes(pathname)) {
        const url = new URL("/auth/sign-in", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }
      if (token) {
        if (token.role === "admin" && authPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/admin/home", req.url));
        }
        if (token.role === "member" && authPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/member/account", req.url));
        }
        if (token.role === "marketing" && authPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/marketing/home", req.url));
        }
        if (token.role === "logistic" && authPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/logistic/home", req.url));
        }
        if (token.role === "teknisi" && authPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/teknisi/home", req.url));
        }
        if (token.role === "keuangan" && authPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/keuangan/home", req.url));
        }

        if (token.role !== "admin" && onlyAdmin.includes(pathname)) {
          return NextResponse.redirect(new URL("/member/account", req.url));
        }
        if (token.role !== "member" && onlyMember.includes(pathname)) {
          return NextResponse.redirect(new URL("/auth/sign-in", req.url));
        }
        if (token.role !== "marketing" && onlyMarketing.includes(pathname)) {
          return NextResponse.redirect(new URL("/member/account", req.url));
        }
        if (token.role !== "logistic" && onlyLogistic.includes(pathname)) {
          return NextResponse.redirect(new URL("/member/account", req.url));
        }
        if (token.role !== "teknisi" && onlyTeknisi.includes(pathname)) {
          return NextResponse.redirect(new URL("/member/account", req.url));
        }
        if (token.role !== "keuangan" && onlyKeuangan.includes(pathname)) {
          return NextResponse.redirect(new URL("/member/account", req.url));
        }
      }
    }
    return middleware(req, next);
  };
}
