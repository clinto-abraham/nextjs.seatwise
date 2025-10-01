
"use client";

import { AuthenticatedLayout } from "@/components/authenticated-layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LifeBuoy, Mail, Phone, Shield, User } from "lucide-react";

export default function SupportPage() {
    return (
        <AuthenticatedLayout>
            <div className="container mx-auto max-w-4xl px-4 py-12">
                <div className="flex items-center gap-4 mb-8">
                    <LifeBuoy className="h-8 w-8 sm:h-12 sm:w-12 text-primary" />
                    <div>
                        <h1 className="font-headline text-3xl sm:text-4xl font-bold">Support Center</h1>
                        <p className="text-muted-foreground">We're here to help. Find answers to common questions or get in touch with our team.</p>
                    </div>
                </div>

                <Card className="shadow-lg mb-8">
                    <CardHeader>
                        <CardTitle>Transaction & Booking Issues</CardTitle>
                        <CardDescription>Find solutions for payment and ticketing problems.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>My payment failed, what should I do?</AccordionTrigger>
                                <AccordionContent>
                                    If your payment failed, please first check with your bank to ensure there are no issues with your card or account. You can try the transaction again after a few minutes. If the problem persists, please contact our support team with the transaction details.
                                    <div className="mt-4">
                                        <Button asChild variant="outline">
                                            <a href="mailto:payment-support@seatwisestays.com">
                                                <Mail className="mr-2 h-4 w-4" /> Email Payment Support
                                            </a>
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>My money was deducted, but I didn't receive my tickets.</AccordionTrigger>
                                <AccordionContent>
                                    We're sorry for the inconvenience. Sometimes there's a delay between payment confirmation and ticket generation. Please check your "My Bookings" page and your email inbox (including the spam folder). If you don't see your tickets within 30 minutes, please contact us with your transaction ID and we'll resolve it immediately.
                                    <div className="mt-4">
                                        <Button asChild variant="outline">
                                            <a href="mailto:booking-support@seatwisestays.com">
                                                <Mail className="mr-2 h-4 w-4" /> Email Booking Support
                                            </a>
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>How do I get a refund?</AccordionTrigger>
                                <AccordionContent>
                                    Refund policies vary depending on the event and the time of cancellation. Please review the terms and conditions for your specific event on the event details page. To request a refund, please email our support team with your booking ID.
                                    <div className="mt-4">
                                        <Button asChild variant="outline">
                                            <a href="mailto:refunds@seatwisestays.com">
                                                <Mail className="mr-2 h-4 w-4" /> Email Refund Support
                                            </a>
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Contact Us</CardTitle>
                        <CardDescription>Reach out to the right team for your query.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                        <div className="flex flex-col items-center p-6 border rounded-lg text-center">
                            <User className="h-10 w-10 text-primary mb-4" />
                            <h3 className="font-bold text-lg">Event Coordinators</h3>
                            <p className="text-sm text-muted-foreground mt-1 mb-4">For questions about event schedules, venue details, or specific event policies.</p>
                            <div className="space-y-2">
                                <Button asChild variant="ghost" size="sm">
                                    <a href="mailto:events@seatwisestays.com">
                                        <Mail className="mr-2 h-4 w-4" /> events@seatwisestays.com
                                    </a>
                                </Button>
                                <Button asChild variant="ghost" size="sm">
                                    <a href="tel:+911234567890">
                                        <Phone className="mr-2 h-4 w-4" /> +91 12345 67890
                                    </a>
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center p-6 border rounded-lg text-center">
                            <Shield className="h-10 w-10 text-accent mb-4" />
                            <h3 className="font-bold text-lg">Technical Support</h3>
                            <p className="text-sm text-muted-foreground mt-1 mb-4">For application failures, bugs, or issues with your user account.</p>
                            <div className="space-y-2">
                                <Button asChild variant="ghost" size="sm">
                                     <a href="mailto:dev-support@seatwisestays.com">
                                        <Mail className="mr-2 h-4 w-4" /> dev-support@seatwisestays.com
                                    </a>
                                </Button>
                                <Button asChild variant="ghost" size="sm">
                                    <a href="tel:+910987654321">
                                        <Phone className="mr-2 h-4 w-4" /> +91 09876 54321
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    )
}
