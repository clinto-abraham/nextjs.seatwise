
import { AuthenticatedLayout } from "@/components/authenticated-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TermsPage() {
  return (
    <AuthenticatedLayout>
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="mb-4">
          <Button asChild variant="outline">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Terms and Conditions</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none dark:prose-invert text-muted-foreground space-y-4">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>Welcome to SeatWise Stays. These terms and conditions outline the rules and regulations for the use of our website and services.</p>
            
            <h3 className="font-bold text-lg text-foreground pt-4">1. Introduction</h3>
            <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use SeatWise Stays if you do not agree to all of the terms and conditions stated on this page.</p>

            <h3 className="font-bold text-lg text-foreground pt-4">2. Bookings and Payments</h3>
            <p>All bookings for events and hotel stays made through our platform are subject to the terms set by the respective event organizers and hotel providers. Payments are processed securely, but we are not liable for issues arising from third-party payment gateways.</p>

            <h3 className="font-bold text-lg text-foreground pt-4">3. Cancellations and Refunds</h3>
            <p>Refund policies are determined by the event organizers and hotel providers. Please review the specific cancellation policy at the time of booking. SeatWise Stays is not responsible for issuing refunds unless explicitly stated.</p>
            
            <h3 className="font-bold text-lg text-foreground pt-4">4. User Accounts</h3>
            <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.</p>

            <h3 className="font-bold text-lg text-foreground pt-4">5. Limitation of Liability</h3>
            <p>In no event shall SeatWise Stays, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website.</p>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
