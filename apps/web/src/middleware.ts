import { NextResponse, type NextRequest } from "next/server";

const TEMPORARY_PUBLIC_PATHS = ["/wedding"] as const;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicPath = TEMPORARY_PUBLIC_PATHS.some((publicPath) => pathname === publicPath || pathname.startsWith(`${publicPath}/`));

  if (isPublicPath) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/wedding";
  redirectUrl.search = "";

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|audio|fonts).*)"],
};
