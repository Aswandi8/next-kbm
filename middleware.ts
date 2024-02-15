import withAuth from "./middlewares/withAuth";
import { NextResponse, NextRequest } from "next/server";

export function mainMiddleware(request: NextRequest) {
  const res = NextResponse.next();
  return res;
}
export default withAuth(mainMiddleware, [
  "admin",
  "member",
  "auth",
  "marketing",
  "logistic",
  "teknisi",
  "keuangan",
  "superadmin",
  "superuser",
]);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/admin/:path*",
    "/auth/:path*",
    "/member/:path*",
  ],
};
