
"use client";

import { useEffect, useState } from "react";
import { AuthenticatedLayout } from "@/components/authenticated-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption, TableFooter } from "@/components/ui/table";
import { getMyDonations } from "@/lib/donation-data";
import type { Donation } from "@/lib/types";
import { ArrowLeft, History } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export default function DonationHistoryPage() {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDonations = async () => {
            const myDonations = await getMyDonations();
            setDonations(myDonations);
            setLoading(false);
        };

        fetchDonations();
    }, []);

    const totalDonated = donations.reduce((acc, donation) => acc + donation.amount, 0);

    const renderSkeletons = () => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Cause/Fund</TableHead>
                    <TableHead className="text-right">Amount (INR)</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[...Array(3)].map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-5 w-20 ml-auto" /></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto max-w-4xl px-4 py-12">
                 <div className="mb-4">
                    <Button asChild variant="outline">
                        <Link href="/donation">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Donation
                        </Link>
                    </Button>
                </div>
                
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline text-3xl flex items-center gap-3">
                            <History className="h-8 w-8 text-primary" />
                            My Donation History
                        </CardTitle>
                        <CardDescription>
                            A heartfelt thank you for your generous contributions. Here is a record of your past donations.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            renderSkeletons()
                        ) : donations.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="font-semibold">No donations found.</p>
                                <p className="text-muted-foreground">Your donation history will appear here.</p>
                            </div>
                        ) : (
                            <Table>
                                <TableCaption>Thank you for your continued support!</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[150px]">Date</TableHead>
                                        <TableHead>Cause/Fund</TableHead>
                                        <TableHead className="text-right">Amount (INR)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {donations.map((donation) => (
                                        <TableRow key={donation.id}>
                                            <TableCell className="font-medium">{format(new Date(donation.date), 'PPP')}</TableCell>
                                            <TableCell>{donation.cause}</TableCell>
                                            <TableCell className="text-right font-mono">{donation.amount.toLocaleString('en-IN')}.00</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={2} className="font-bold text-lg">Total Donated</TableCell>
                                        <TableCell className="text-right font-bold text-lg font-mono">
                                            INR {totalDonated.toLocaleString('en-IN')}.00
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    )
}
