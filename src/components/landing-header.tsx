
"use client";

import Link from "next/link";
import { Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LandingHeaderProps = {
    scrolled: boolean;
};

export function LandingHeader({ scrolled }: LandingHeaderProps) {
    return (
        <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "bg-background/80 backdrop-blur-sm border-b" : "bg-transparent")}>
            <div className="container mx-auto px-4">
                <div className={cn("flex items-center justify-between transition-all duration-300", scrolled ? "h-16" : "h-24")}>
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                        <Ticket className="h-6 w-6" />
                        <span className="font-headline text-xl">SeatWise Stays</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm">
                        <Link href="#features" className="text-muted-foreground hover:text-foreground">Features</Link>
                        <Link href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link>
                        <Link href="#contact" className="text-muted-foreground hover:text-foreground">Contact</Link>
                    </nav>
                    <div className="flex items-center gap-2">
                        <Button asChild variant="ghost">
                            <Link href="/login">Log In</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
