
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Event } from "@/lib/types";
import { Calendar, MapPin, ArrowRight, Clock } from "lucide-react";
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { BookedSeatsAccordion } from "./booked-seats-accordion";

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
    
    const eventDateTime = toZonedTime(`${event.date}T${event.time}`, event.timezone);
    const displayTime = format(eventDateTime, 'h:mm a');

    return (
        <Card className="flex flex-col overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="relative h-48 w-full">
                <Image
                    src={event.images[0]}
                    alt={event.name}
                    fill
                    className="object-cover"
                />
            </div>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">{event.name}</CardTitle>
                <CardDescription className="line-clamp-2 pt-1">{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-2 text-sm text-muted-foreground">
                 <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{format(eventDateTime, 'PPP')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{displayTime} ({event.timezone.split('/')[1].replace('_', ' ')})</span>
                </div>
                 <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:underline"
                >
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                </a>
            </CardContent>
            <div className="px-6 pb-4">
              <BookedSeatsAccordion eventId={event.id} />
            </div>
            <CardFooter className="bg-muted/20 p-4 mt-auto">
                <Button asChild className="w-full font-bold" variant="accent">
                    <Link href={`/events/${event.id}`}>
                        Book Seats
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
