
import Link from "next/link";
import { Ticket, LogOut, User, Shield, Heart, Briefcase, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/actions/auth";

export function Header() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
      <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 w-full">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Ticket className="h-6 w-6" />
          <span className="font-headline text-xl">SeatWise Stays</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
            <Link href="/my-bookings">
                <Button variant="outline" size="sm">
                    <Briefcase className="mr-2 h-4 w-4" />
                    My Bookings
                </Button>
            </Link>
            <Link href="/donation">
                <Button variant="outline" size="sm">
                    <Heart className="mr-2 h-4 w-4" />
                    Donate
                </Button>
            </Link>
           <Link href="/admin">
              <Button variant="outline" size="sm">
                <Shield className="mr-2 h-4 w-4" />
                Admin
              </Button>
            </Link>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/my-bookings">
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span>My Bookings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/support">
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    Support
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
               <form action={logout} className="w-full">
                  <button type="submit" className="w-full">
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </button>
                </form>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
