
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ticket, BedDouble, ArrowLeft, Utensils } from 'lucide-react';
import { AuthenticatedLayout } from '@/components/authenticated-layout';
import Link from 'next/link';
import type { HotelRoom, Event } from '@/lib/types';
import { getAllHotelRooms, getEventById } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';

type Attendee = {
    seat: string;
    name: string;
    contact: string;
    email?: string;
    address?: string;
    stayId: string | null;
    foodDays: number;
};

type FormValues = {
    attendees: Attendee[];
};

export default function AttendeesPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [stays, setStays] = useState<HotelRoom[]>([]);
    const [event, setEvent] = useState<Event | null>(null);
    
    const eventId = searchParams.get('eventId');
    const seats = searchParams.get('seats');

    const form = useForm<FormValues>({
        defaultValues: {
            attendees: []
        },
        mode: "onBlur"
    });

    const { fields, replace } = useFieldArray({
        control: form.control,
        name: "attendees"
    });

    useEffect(() => {
        async function fetchData() {
            if (eventId) {
                const eventData = await getEventById(eventId);
                setEvent(eventData || null);
            }
            const allStays = await getAllHotelRooms();
            setStays(allStays);
        }
        fetchData();

        const seatArray = seats ? seats.split(',') : [];
        if (seatArray.length > 0 && fields.length !== seatArray.length) {
            const attendeesData = seatArray.map(seat => ({
                seat,
                name: '',
                contact: '',
                email: '',
                address: '',
                stayId: null,
                foodDays: 0,
            }));
            replace(attendeesData);
        }

    }, [eventId, seats, replace, fields.length]);

    const onSubmit = (data: FormValues) => {
        const staySelections = data.attendees.map(a => `${a.seat}:${a.stayId || 'none'}`).join(',');
        const foodSelections = data.attendees.map(a => `${a.seat}:${a.foodDays}`).join(',');
        
        // Encode attendee details into a single string
        const attendeeDetails = encodeURIComponent(JSON.stringify(data.attendees.map(a => ({seat: a.seat, name: a.name}))));

        const bookingUrl = `/booking/summary?eventId=${eventId}&seats=${seats}&staySelections=${staySelections}&foodSelections=${foodSelections}&attendeeDetails=${attendeeDetails}`;
        
        router.push(bookingUrl);
    }

    if (!seats) {
        return (
            <AuthenticatedLayout>
                <div className="container mx-auto max-w-4xl px-4 py-12 text-center">
                    <h1 className="font-headline text-3xl font-bold mb-4">No seats selected</h1>
                    <p className="text-muted-foreground mb-8">Please go back to the event page and select your seats.</p>
                    <Button asChild>
                        <Link href={eventId ? `/events/${eventId}` : '/dashboard'}>Go to Event</Link>
                    </Button>
                </div>
            </AuthenticatedLayout>
        );
    }
    
    const foodOptions = event && event.duration > 1 
        ? [
            { value: 0, label: "No food package" },
            ...Array.from({ length: event.duration }, (_, i) => ({ value: i + 1, label: `Food for Day ${i + 1}` })),
            { value: event.duration + 1, label: `Food for all ${event.duration} days` }
        ]
        : [
            { value: 0, label: "No food package" },
            { value: 1, label: "Include food package" }
        ];

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto max-w-4xl px-4 py-12">
                <div className="flex items-center gap-4 mb-8">
                    <Ticket className="h-8 w-8 sm:h-12 sm:w-12 text-primary" />
                    <div>
                        <h1 className="font-headline text-3xl sm:text-4xl font-bold">Attendee Information</h1>
                        <p className="text-muted-foreground">Please provide details and select add-ons for each seat.</p>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-8">
                            {fields.map((field, index) => (
                                <Card key={field.id} className="shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="font-headline text-xl sm:text-2xl">Seat: {field.seat}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <FormField
                                                control={form.control}
                                                name={`attendees.${index}.name`}
                                                rules={{ required: 'Full name is required.' }}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Full Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="John Doe" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`attendees.${index}.contact`}
                                                rules={{ required: 'Contact number is required.' }}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Contact Number</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="+91 98765 43210" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                             <FormField
                                                control={form.control}
                                                name={`attendees.${index}.email`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email (Optional)</FormLabel>
                                                        <FormControl>
                                                            <Input type="email" placeholder="john.doe@example.com" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                             <FormField
                                                control={form.control}
                                                name={`attendees.${index}.address`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Address (Optional)</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="123 Main St, Anytown, India" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <Separator />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <Label className="flex items-center gap-2 mb-2 font-semibold"><BedDouble className="h-5 w-5 text-primary"/> Stay Selection (Optional)</Label>
                                                 <Controller
                                                    control={form.control}
                                                    name={`attendees.${index}.stayId`}
                                                    render={({ field }) => (
                                                        <Select
                                                            onValueChange={(value) => field.onChange(value === 'none' ? null : value)}
                                                            value={field.value || 'none'}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a stay" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="none">No stay needed</SelectItem>
                                                                {stays.map(stay => (
                                                                    <SelectItem key={stay.id} value={stay.id}>{stay.name} - INR {stay.price.toLocaleString('en-IN')}/night</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                            </div>
                                             {event?.foodDetails && (
                                                <div>
                                                    <Label className="flex items-center gap-2 mb-2 font-semibold"><Utensils className="h-5 w-5 text-primary"/> Food Add-on (Optional)</Label>
                                                    <Controller
                                                        control={form.control}
                                                        name={`attendees.${index}.foodDays`}
                                                        render={({ field }) => (
                                                            <Select
                                                                onValueChange={(value) => field.onChange(Number(value))}
                                                                value={String(field.value)}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select food option" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {foodOptions.map(opt => (
                                                                        <SelectItem key={opt.value} value={String(opt.value)}>{opt.label}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                    />
                                                    <p className="text-xs text-muted-foreground mt-2">
                                                        Cost: INR {event.foodDetails.costPerDay.toLocaleString('en-IN')}/day.
                                                        {' '}{event.foodDetails.description}
                                                    </p>
                                                </div>
                                             )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
                             <Button asChild variant="outline">
                                <Link href={`/events/${eventId}?seats=${seats}`}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Seat Selection
                                </Link>
                            </Button>
                            <Button type="submit" size="lg" disabled={!form.formState.isDirty || !form.formState.isValid} className="font-bold w-full sm:w-auto" variant="accent">
                                Proceed to Summary
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </AuthenticatedLayout>
    );
}

    