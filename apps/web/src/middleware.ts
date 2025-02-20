import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
    const session = await auth(); // get user session
    const { pathname } = request.nextUrl;
    if (
        (pathname.startsWith("/login") || pathname.startsWith("/register")) &&
        session?.user
    ) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (session?.user) {
        if (pathname.startsWith("/profile") && session?.user.role === "ORGANIZER") {
            return NextResponse.redirect(new URL("/admin", request.nextUrl));
        }
        if (pathname.startsWith("/admin") && session?.user.role === "CUSTOMER") {
            return NextResponse.redirect(new URL("/profile", request.nextUrl));
        }
        if (pathname === "/admin" && session?.user.role === "ORGANIZER") {
            return NextResponse.redirect(new URL("/admin/dashboard", request.nextUrl));
        }

    }
    else {
        if (pathname.startsWith("/admin") || pathname.startsWith("/profile") &&
            !session?.user) {
            return NextResponse.redirect(new URL("/", request.nextUrl))
        }
    }


}

export const config = {
    matcher: ["/login", "/register", "/profile", "/profile/:path+", "/admin", "/admin/:path+"],
};
