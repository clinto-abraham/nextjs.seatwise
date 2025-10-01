
"use client";

import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "./ui/skeleton";
import { Ticket, ArrowRight } from "lucide-react";
import { getMyBookedSeatsForEvent } from "@/lib/data";
import { Button } from "./ui/button";
import Link from "next/link";

type BookedSeatsAccordionProps = {
    eventId: string;
};

export function BookedSeatsAccordion({ eventId }: BookedSeatsAccordionProps) {
    const [myBookedSeats, setMyBookedSeats] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyBookedSeats = async () => {
            const seats = await getMyBookedSeatsForEvent(eventId);
            setMyBookedSeats(seats);
            setLoading(false);
        };

        fetchMyBookedSeats();
    }, [eventId]);

    if (loading) {
        return (
            <div className="space-y-2 p-4">
                <Skeleton className="h-8 w-full" />
            </div>
        );
    }
    
    if (myBookedSeats.length === 0) {
        return null;
    }


    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="hover:no-underline">
                    <span className="font-semibold text-primary">My Booked Seats ({myBookedSeats.length})</span>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="max-h-40 overflow-y-auto pr-2">
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {myBookedSeats.map(seat => (
                                <div key={seat} className="flex items-center gap-1 text-xs p-1 bg-secondary rounded-md">
                                    <Ticket className="h-3 w-3 text-muted-foreground" />
                                    <span className="font-mono">{seat}</span>
                                d_foregroun</div>
                            ))}
                        </div>
                    </div>
                     <Button asChild variant="link" className="mt-2 px-0 h-auto">
                        <Link href="/my-bookings">
                            Manage My Bookings <ArrowRight className="ml-2 h-4 w-4"/>
                        </Link>
                    </Button>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
