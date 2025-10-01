
import Link from 'next/link';
import { Ticket, Mail, Facebook, Twitter, Instagram, Heart, Handshake, BookOpen, LifeBuoy, Shield, FileText, Users, MessageSquare } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          <div className="flex flex-col lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Ticket className="h-6 w-6 text-primary" />
              <span className="font-headline text-xl">SeatWise Stays</span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm max-w-xs">Seamlessly book event seats and hotel stays. Your next experience is just a click away.</p>
             <div className="mt-6">
                <ThemeToggle />
            </div>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground">Quick Links</h3>
            <nav className="mt-4 flex flex-col space-y-2 text-sm">
              <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">Events</Link>
              <Link href="/support" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"><LifeBuoy className="h-4 w-4" /> Support</Link>
              <Link href="/my-bookings" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">My Bookings</Link>
            </nav>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground">Legal</h3>
            <nav className="mt-4 flex flex-col space-y-2 text-sm">
              <Link href="/privacy" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"><Shield className="h-4 w-4"/> Privacy Policy</Link>
              <Link href="/terms" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"><FileText className="h-4 w-4"/> Terms & Conditions</Link>
              <Link href="/grievances" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"><Users className="h-4 w-4"/> Grievances</Link>
            </nav>
          </div>
          
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground">Connect</h3>
            <div className="mt-4 space-y-2 text-sm">
                 <a href="mailto:support@seatwisestays.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-4 w-4"/>
                    <span>support@seatwisestays.com</span>
                </a>
                <Link href="/community" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <MessageSquare className="h-4 w-4"/>
                    <span>Community Forum</span>
                </Link>
                <div className="flex space-x-4 pt-2">
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><span className="sr-only">Twitter</span><Twitter/></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><span className="sr-only">Facebook</span><Facebook/></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><span className="sr-only">Instagram</span><Instagram/></Link>
                </div>
            </div>
          </div>

        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SeatWise Stays. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
