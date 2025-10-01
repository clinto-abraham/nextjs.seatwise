
"use client";

import { useEffect, useState } from "react";
import { AuthenticatedLayout } from "@/components/authenticated-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { getAllEvents, getAllHotelRooms, getMyBookings } from "@/lib/data";
import { Ticket, BedDouble, Utensils, Edit, Briefcase, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import type { Event, HotelRoom, UserBooking } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

type EnrichedBooking = UserBooking & {
    event: Event | undefined;
    stay: HotelRoom | undefined;
};

type GroupedBookings = {
    event: Event;
    bookings: EnrichedBooking[];
};

const Barcode = ({ text }: { text: string }) => {
    const bars = text.split('').map((char, i) => (
        <div
            key={i}
            className="h-10 bg-black"
            style={{ width: `${(char.charCodeAt(0) % 4) + 1}px` }}
        />
    ));
    return <div className="flex items-end gap-px">{bars}</div>;
};

export default function MyBookingsPage() {
    const [groupedBookings, setGroupedBookings] = useState<GroupedBookings[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            const [myBookings, allEvents, allStays] = await Promise.all([
                getMyBookings(),
                getAllEvents(),
                getAllHotelRooms(),
            ]);

            const eventMap = new Map(allEvents.map(e => [e.id, e]));
            const stayMap = new Map(allStays.map(s => [s.id, s]));

            const enrichedBookings = myBookings.map(booking => ({
                ...booking,
                event: eventMap.get(booking.eventId),
                stay: booking.stayId ? stayMap.get(booking.stayId) : undefined,
            }));
            
            const bookingsByEvent = enrichedBookings.reduce((acc, booking) => {
                if (booking.event) {
                    if (!acc[booking.eventId]) {
                        acc[booking.eventId] = {
                            event: booking.event,
                            bookings: []
                        };
                    }
                    acc[booking.eventId].bookings.push(booking);
                }
                return acc;
            }, {} as Record<string, GroupedBookings>);


            setGroupedBookings(Object.values(bookingsByEvent));
            setLoading(false);
        };

        fetchBookings();
    }, []);

    const renderSkeletons = () => (
        <div className="space-y-8">
            {[...Array(2)].map((_, i) => (
                 <Card key={i}>
                    <CardHeader>
                        <Skeleton className="h-7 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto max-w-3xl px-4 py-12">
                 <div className="flex items-center gap-4 mb-8">
                    <Briefcase className="h-8 w-8 sm:h-12 sm:w-12 text-primary" />
                    <div>
                        <h1 className="font-headline text-3xl sm:text-4xl font-bold">My Bookings</h1>
                        <p className="text-muted-foreground">View and manage your upcoming event bookings.</p>
                    </div>
                </div>

                {loading ? (
                   renderSkeletons()
                ) : groupedBookings.length === 0 ? (
                    <div className="text-center py-16 border rounded-lg">
                        <p className="text-lg font-semibold">No bookings yet!</p>
                        <p className="text-muted-foreground mb-4">It looks like you haven't booked any seats.</p>
                        <Button asChild variant="accent">
                            <Link href="/dashboard">Explore Events</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {groupedBookings.map(({ event, bookings }) => (
                            <Card key={event.id} className="shadow-lg overflow-hidden">
                                <CardHeader className="bg-muted/50 border-b">
                                    <CardTitle className="font-headline">{event.name}</CardTitle>
                                    <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs">
                                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3"/> {format(new Date(event.date), 'PPP')}</span>
                                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3"/> {event.location}</span>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 space-y-4">
                                     {bookings.map(booking => (
                                        <Card key={booking.bookingId} className="bg-background">
                                            <CardContent className="p-4">
                                                <div className="flex justify-between items-start gap-4">
                                                    <div>
                                                        <p className="font-semibold">{booking.attendeeName}</p>
                                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                                                            {booking.stay && (
                                                                <div className="flex items-center gap-1">
                                                                    <BedDouble className="h-4 w-4 text-primary/80"/>
                                                                    <span>{booking.stay.name}</span>
                                                                </div>
                                                            )}
                                                            {booking.foodDays > 0 && booking.event?.foodDetails && (
                                                                <div className="flex items-center gap-1">
                                                                    <Utensils className="h-4 w-4 text-primary/80"/>
                                                                    <span>{booking.foodDays} Day(s) Food</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-md font-bold text-primary shrink-0">
                                                        <Ticket className="h-5 w-5"/>
                                                        <span>Seat {booking.seat}</span>
                                                    </div>
                                                </div>
                                                 <Separator className="my-4"/>
                                                 <div className="bg-muted/30 p-4 rounded-lg flex flex-col items-center">
                                                    <Barcode text={booking.bookingId} />
                                                    <p className="font-mono text-xs tracking-widest mt-2">{booking.bookingId}</p>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="bg-muted/30 p-2 justify-end">
                                                 <Button asChild variant="ghost" size="sm">
                                                    <Link href={`/booking/attendees?eventId=${booking.eventId}&seats=${booking.seat}`}>
                                                        <Edit className="mr-2 h-4 w-4"/>
                                                        Update Details
                                                    </Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                     ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    )
}
