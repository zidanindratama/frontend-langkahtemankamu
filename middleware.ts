import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  const cookieStore = cookies();

  const authRoutes = ["/sign-in", "/sign-up"];

  const baseRoutes = ["/dashboard", "/dashboard/profile"];

  const adminRoutes = ["/dashboard/users", "/dashboard/categories"];

  const bloggerRoutes = ["/test/bloggerRoutes"];

  const memberRoutes = ["/test/memberRoutes"];

  const commonAdminAndBloggerRoutes = ["/dashboard/blogs"];

  const accessToken = cookieStore.get("accessToken");

  //  Kalo user udah punya accessToken, terus mau buka authRoutes. Redirect ke dashboard
  if (accessToken && authRoutes.includes(pathname)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  //  Kalo user belom punya accessToken dan pengen buka dashboard, redirect ke signup
  if (
    !accessToken &&
    (baseRoutes.includes(pathname) || pathname.startsWith("/dashboard"))
  ) {
    url.pathname = "/sign-up";
    return NextResponse.redirect(url);
  }

  if (accessToken) {
    const user: any = jwtDecode(accessToken?.value as string);
    url.pathname = "/access-denied";

    // Kalo MEMBER mau akses commonAdminAndBloggerRoutes, redirect to access-denied
    if (
      user.role === "MEMBER" &&
      commonAdminAndBloggerRoutes.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(url);
    }

    // Kalo MEMBER dan BLOGGER mau akses adminRoutes, redirect to access-denied
    if (
      (user.role === "MEMBER" || user.role == "BLOGGER") &&
      adminRoutes.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(url);
    }

    // Kalo ADMINISTARTOR dan MEMBER mau akses bloggerRoutes, redirect to access-denied
    if (
      (user.role === "ADMINISTARTOR" || user.role == "MEMBER") &&
      bloggerRoutes.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(url);
    }

    // Kalo ADMINISTARTOR dan BLOGGER mau akses memberRoutes, redirect to access-denied
    if (
      (user.role === "ADMINISTARTOR" || user.role == "BLOGGER") &&
      memberRoutes.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(url);
    }
  }
}
