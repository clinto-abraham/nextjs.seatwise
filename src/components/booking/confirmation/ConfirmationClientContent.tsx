"use client";

import { AuthenticatedLayout } from "@/components/authenticated-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { getAllHotelRooms, getEventById } from "@/lib/data";
import { Check, Home, User, Ticket, BedDouble, Utensils, Printer } from "lucide-react";
import Link from "next/link";
import { useSearchParams, notFound } from "next/navigation";
import type { Event, HotelRoom } from "@/lib/types";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

type BookingDetails = {
    seat: string;
    attendeeName: string;
    stay: HotelRoom | null;
    foodDays: number;
    foodCost: number;
    bookingId: string;
};

const Barcode = ({ text }: { text: string }) => {
    // This is a simple visual representation of a barcode.
    // For a real scannable barcode, a library like react-barcode would be needed.
    const bars = text.split('').map((char, i) => (
        <div
            key={i}
            className="h-10 bg-black"
            style={{ width: `${(char.charCodeAt(0) % 4) + 1}px` }}
        />
    ));
    return <div className="flex items-end gap-px">{bars}</div>;
};


export default function ConfirmationClientContent() {
    const searchParams = useSearchParams();
    const [event, setEvent] = useState<Event | null>(null);
    const [bookingDetails, setBookingDetails] = useState<BookingDetails[]>([]);
    const [loading, setLoading] = useState(true);

    const eventId = searchParams.get('eventId');
    const seatsParam = searchParams.get('seats');
    const staySelectionsParam = searchParams.get('staySelections');
    const foodSelectionsParam = searchParams.get('foodSelections');
    const attendeeDetailsParam = searchParams.get('attendeeDetails');

    useEffect(() => {
        async function loadBookingData() {
            if (!eventId || !seatsParam || !attendeeDetailsParam) {
                setLoading(false);
                return;
            }

            const eventData = await getEventById(eventId);
            if (!eventData) {
                setLoading(false);
                return;
            }
            setEvent(eventData);

            const allStays = await getAllHotelRooms();
            const stayMap = new Map(allStays.map(h => [h.id, h]));
            
            const seats = seatsParam.split(',');
            const staySelections = (staySelectionsParam || '').split(',').map(s => { const [seat, id] = s.split(':'); return {seat, id}; });
            const foodSelections = (foodSelectionsParam || '').split(',').map(s => { const [seat, days] = s.split(':'); return {seat, days: Number(days)}; });
            const attendeeDetails = JSON.parse(decodeURIComponent(attendeeDetailsParam));

            const details = seats.map((seat, index) => {
                const attendee = attendeeDetails.find((a: any) => a.seat === seat);
                const staySelection = staySelections.find(s => s.seat === seat);
                const foodSelection = foodSelections.find(f => f.seat === seat);

                const stay = staySelection?.id !== 'none' ? stayMap.get(staySelection!.id) : null;
                
                let foodDays = 0;
                let foodCost = 0;

                if (foodSelection && eventData.foodDetails) {
                    foodDays = eventData.duration > 1 && foodSelection.days > eventData.duration ? eventData.duration : foodSelection.days;
                    foodCost = foodDays * eventData.foodDetails.costPerDay;
                }
                
                // Generate a unique booking ID
                const bookingId = `SWS-${eventData.id.slice(4)}-${seat}-${Date.now().toString().slice(-6)}`;

                return {
                    seat,
                    attendeeName: attendee?.name || 'N/A',
                    stay: stay || null,
                    foodDays,
                    foodCost,
                    bookingId
                };
            });
            setBookingDetails(details);
            setLoading(false);
        }

        loadBookingData();
    }, [eventId, seatsParam, staySelectionsParam, foodSelectionsParam, attendeeDetailsParam]);
    
    if (loading) {
        return <AuthenticatedLayout><div className="container p-12 text-center">Loading booking details...</div></AuthenticatedLayout>   ;
    }

    if (!event || bookingDetails.length === 0) {
        return notFound();
    }
    
    const handlePrint = () => {
        window.print();
    };

    return (
        
        <AuthenticatedLayout>
            <div className="container mx-auto max-w-3xl px-4 py-12 print:py-0">
                <div className="flex flex-col items-center text-center print:hidden">
                    <div className="bg-green-100 rounded-full p-4 mb-4">
                        <Check className="h-12 w-12 text-green-600" />
                    </div>
                    <h1 className="font-headline text-4xl font-bold">Booking Confirmed!</h1>
                    <p className="text-muted-foreground mt-2 max-w-md">
                        Thank you! You have confirmed <span className="font-bold text-foreground">{bookingDetails.length} seat(s)</span> for <span className="font-bold text-foreground">{event.name}</span>.
                    </p>
                </div>

                <div className="mt-10 space-y-6">
                    {bookingDetails.map((details, index) => (
                        <Card key={index} className="shadow-lg print:shadow-none print:border-2 print:border-black">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>Booking for: {details.attendeeName}</CardTitle>
                                        <CardDescription>This is your ticket for {event.name}.</CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2 text-lg font-bold text-primary">
                                        <Ticket className="h-6 w-6"/>
                                        <span>Seat {details.seat}</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Separator className="mb-4" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    {details.stay && (
                                        <div className="flex items-center gap-3">
                                            <BedDouble className="h-8 w-8 text-primary/80"/>
                                            <div>
                                                <p className="font-semibold">Stay Included</p>
                                                <p className="text-sm text-muted-foreground">{details.stay.name}</p>
                                            </div>
                                        </div>
                                    )}
                                    {details.foodDays > 0 && event.foodDetails && (
                                        <div className="flex items-center gap-3">
                                            <Utensils className="h-8 w-8 text-primary/80"/>
                                            <div>
                                                <p className="font-semibold">Food Package</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {details.foodDays} Day(s) - {event.foodDetails.description}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="bg-muted/30 p-4 rounded-lg flex flex-col items-center">
                                    <Barcode text={details.bookingId} />
                                    <p className="font-mono text-xs tracking-widest mt-2">{details.bookingId}</p>
                                </div>
                            </CardContent>
                             <CardFooter className="bg-muted/50 p-4 text-xs text-muted-foreground">
                                Please present this ticket at the entrance.
                            </CardFooter>
                        </Card>
                    ))}
                </div>


                <div className="mt-10 text-center flex flex-col sm:flex-row justify-center items-center gap-4 print:hidden">
                    <Button onClick={handlePrint} size="lg" variant="outline">
                        <Printer className="mr-2 h-5 w-5" />
                        Print Tickets
                    </Button>
                    <Button asChild size="lg" variant="accent">
                        <Link href="/dashboard">
                            <Home className="mr-2 h-5 w-5" />
                            Back to Dashboard
                        </Link>
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
   
    )
}
