
"use client";

import { useEffect, useState } from "react";
import { AuthenticatedLayout } from "@/components/authenticated-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { getAllDonations } from "@/lib/donation-data";
import type { Donation } from "@/lib/types";
import { ArrowLeft, Users, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const DONATIONS_PER_PAGE = 20;

export default function AdminDonationsPage() {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchDonations = async () => {
            const allDonations = await getAllDonations();
            setDonations(allDonations);
            setLoading(false);
        };

        fetchDonations();
    }, []);

    const totalPages = Math.ceil(donations.length / DONATIONS_PER_PAGE);
    const startIndex = (currentPage - 1) * DONATIONS_PER_PAGE;
    const paginatedDonations = donations.slice(startIndex, startIndex + DONATIONS_PER_PAGE);

    const renderSkeletons = () => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Donor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Cause</TableHead>
                    <TableHead className="text-right">Amount (INR)</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                        <TableCell>
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-3 w-40 mt-1" />
                        </TableCell>
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
            <div className="container mx-auto max-w-6xl px-4 py-12">
                 <div className="mb-4">
                    <Button asChild variant="outline">
                        <Link href="/admin">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Admin Panel
                        </Link>
                    </Button>
                </div>
                
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline text-3xl flex items-center gap-3">
                            <Users className="h-8 w-8 text-primary" />
                            All Donations
                        </CardTitle>
                        <CardDescription>
                            This is a complete record of all donations made by users.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            renderSkeletons()
                        ) : donations.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="font-semibold">No donations found.</p>
                            </div>
                        ) : (
                            <Table>
                                <TableCaption>A complete list of all donations.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Donor</TableHead>
                                        <TableHead className="w-[150px]">Date</TableHead>
                                        <TableHead>Cause/Fund</TableHead>
                                        <TableHead className="text-right">Amount (INR)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedDonations.map((donation) => (
                                        <TableRow key={donation.id}>
                                            <TableCell>
                                                <div className="font-medium">{donation.userName}</div>
                                                <div className="text-sm text-muted-foreground">{donation.userEmail}</div>
                                            </TableCell>
                                            <TableCell className="font-medium">{format(new Date(donation.date), 'PPP')}</TableCell>
                                            <TableCell>{donation.cause}</TableCell>
                                            <TableCell className="text-right font-mono">{donation.amount.toLocaleString('en-IN')}.00</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                    {totalPages > 1 && (
                        <CardFooter className="flex items-center justify-between border-t pt-6">
                            <span className="text-sm text-muted-foreground">
                                Page {currentPage} of {totalPages}
                            </span>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4 mr-1" />
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </div>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    )
}
