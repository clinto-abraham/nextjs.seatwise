
"use client";

import { useState } from "react";
import type { Event, SeatingLayout } from "@/lib/types";
import Image from "next/image";
import { ArrowLeft, Calendar, MapPin, Ticket as TicketIcon, Users, Clock } from "lucide-react";
import { SeatingChart } from "./seating-chart";
import { Button } from "./ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


type EventBookingClientProps = {
    event: Event;
    seatingLayout: SeatingLayout;
};

const displayTimezones = [
    { label: 'IST', timezone: 'Asia/Kolkata' },
    { label: 'PST', timezone: 'America/Los_Angeles' },
    { label: 'CET', timezone: 'Europe/Berlin' },
];

export function EventBookingClient({ event, seatingLayout }: EventBookingClientProps) {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    
    const bookingUrl = `/booking/attendees?eventId=${event.id}&seats=${selectedSeats.join(',')}`;

    const eventDateTime = toZonedTime(`${event.date}T${event.time}`, event.timezone);
    const localTime = format(eventDateTime, 'h:mm a');

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-4">
              <Button asChild variant="outline">
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to All Events
                </Link>
              </Button>
            </div>

            <div className="mb-8">
                <Carousel className="w-full max-w-5xl mx-auto" opts={{ loop: true }}>
                    <CarouselContent>
                        {event.images.map((imgSrc, index) => (
                            <CarouselItem key={index}>
                                <div className="relative h-80 md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={imgSrc}
                                        alt={`${event.name} image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                        <h1 className="font-headline text-4xl md:text-6xl font-bold drop-shadow-lg">{event.name}</h1>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-sm mt-2">
                                            <div className="flex items-center justify-center sm:justify-start gap-2">
                                                <Calendar className="h-4 w-4" />
                                                <span>{format(eventDateTime, 'PPP')}</span>
                                            </div>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger className="flex items-center justify-center sm:justify-start gap-2 cursor-default">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{localTime} ({format(eventDateTime, 'zzz')})</span>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <div className="p-1 space-y-1">
                                                        {displayTimezones.map(({label, timezone}) => (
                                                            <p key={label} className="text-xs">
                                                                {format(toZonedTime(eventDateTime, timezone), 'h:mm a')}
                                                                <span className="font-bold ml-1">{label}</span>
                                                            </p>
                                                        ))}
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                            <a 
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center sm:justify-start gap-2 hover:underline"
                                            >
                                                <MapPin className="h-4 w-4" />
                                                <span>{event.location}</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                </Carousel>
            </div>
            
            <p className="text-lg text-center max-w-3xl mx-auto text-muted-foreground mb-12">{event.description}</p>
            
            <div className="max-w-4xl mx-auto">
                <div className="space-y-8">
                     <div>
                        <h2 className="font-headline text-3xl font-bold mb-4 flex items-center gap-3"><Users className="h-8 w-8 text-primary" />Select Your Seats</h2>
                        <SeatingChart seatingLayout={seatingLayout} onSeatsChange={setSelectedSeats} />
                    </div>
                </div>
            </div>

            {selectedSeats.length > 0 && (
                <div className="sticky bottom-0 mt-12 py-4 bg-background/80 backdrop-blur-sm">
                    <div className="container mx-auto p-6 bg-card rounded-xl shadow-2xl border flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2 font-semibold">
                                <TicketIcon className="h-5 w-5 text-primary" />
                                <span>{selectedSeats.length} Seat{selectedSeats.length > 1 ? 's' : ''} Selected</span>
                            </div>
                        </div>
                        <Button asChild size="lg" className="font-bold w-full sm:w-auto" variant="accent">
                            <Link href={bookingUrl}>Enter Attendee Details</Link>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
