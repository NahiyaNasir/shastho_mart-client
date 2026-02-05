import { Roles } from "@/constanst/role";
import { userService } from "@/service/userServise";
import { NextRequest, NextResponse } from "next/server";




export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let isAdmin = false;

  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.ADMIN;
  }

  //* User in not authenticated at all
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //* User is authenticated and role = ADMIN
  //* User can not visit user dashboard
  if (isAdmin && pathname.startsWith("/seller/dashboard")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  //* User is authenticated and role = USER
  //* User can not visit admin-dashboard
  if (!isAdmin && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/seller/dashboard", request.url));
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: [
//     ,
//   ],
// };