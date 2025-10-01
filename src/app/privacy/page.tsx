
import { AuthenticatedLayout } from "@/components/authenticated-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPage() {
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
            <CardTitle className="font-headline text-3xl">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none dark:prose-invert text-muted-foreground space-y-4">
             <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>Your privacy is important to us. It is SeatWise Stays' policy to respect your privacy regarding any information we may collect from you across our website.</p>

            <h3 className="font-bold text-lg text-foreground pt-4">1. Information We Collect</h3>
            <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We collect information such as your name, email, and payment details for booking purposes.</p>

            <h3 className="font-bold text-lg text-foreground pt-4">2. How We Use Your Information</h3>
            <p>We use the information we collect to operate, maintain, and provide to you the features and functionality of the service, as well as to communicate directly with you, such as to send you email messages and push notifications.</p>

            <h3 className="font-bold text-lg text-foreground pt-4">3. Data Security</h3>
            <p>We take the security of your data seriously. We use a variety of security measures to maintain the safety of your personal information, but remember that no method of transmission over the Internet is 100% secure.</p>

            <h3 className="font-bold text-lg text-foreground pt-4">4. Cookies</h3>
            <p>We use cookies to store information, including your preferences, and the pages on the website that you accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

            <h3 className="font-bold text-lg text-foreground pt-4">5. Your Consent</h3>
            <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
