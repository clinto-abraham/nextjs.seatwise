
"use client";

import { AuthenticatedLayout } from "@/components/authenticated-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getAllEvents } from "@/lib/data";
import { placeHolderImages } from "@/lib/placeholder-images";
import type { Event } from "@/lib/types";
import { Users, FileWarning, Upload, Video } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const mockGrievances = [
    {
        id: 1,
        userName: "Alex R.",
        userAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        eventName: "Starlight Symphony Orchestra",
        description: "The sound system on the left side of the stage was malfunctioning for the first 20 minutes. We missed the entire opening piece. Very disappointing for the price we paid.",
        mediaUrl: placeHolderImages['event-concert'].imageUrl,
        mediaType: 'image'
    },
    {
        id: 2,
        userName: "Samantha B.",
        userAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
        eventName: "Innovate & Inspire Tech Summit",
        description: "The food package for Day 2 ran out of non-vegetarian options by 1 PM. Many attendees who paid for the full package were left with only salads. This is not acceptable.",
        mediaUrl: 'https://picsum.photos/seed/grievance2/600/400',
        mediaType: 'image'
    }
];


export default function GrievancesPage() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        async function fetchEvents() {
            const allEvents = await getAllEvents();
            setEvents(allEvents);
        }
        fetchEvents();
    }, []);

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto max-w-4xl px-4 py-12">
                <div className="text-center mb-10">
                    <FileWarning className="mx-auto h-12 w-12 text-destructive" />
                    <h1 className="font-headline text-4xl font-bold mt-4">Public Grievances</h1>
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                        This is a public forum to report issues and share experiences regarding events. Your feedback helps us and the event organizers improve.
                    </p>
                </div>

                <Card className="shadow-lg mb-12">
                    <CardHeader>
                        <CardTitle>File a Grievance</CardTitle>
                        <CardDescription>Provide details about the issue you faced. Your submission will be publicly visible.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="event-select">Select Event</Label>
                                <Select>
                                    <SelectTrigger id="event-select">
                                        <SelectValue placeholder="Choose the relevant event" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {events.map(event => (
                                            <SelectItem key={event.id} value={event.id}>{event.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="media-upload">Upload Photo/Video (Proof)</Label>
                                <Input id="media-upload" type="file" accept="image/*,video/*" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Describe the Issue</Label>
                            <Textarea id="description" placeholder="Clearly describe the problem, including date, time, and location within the venue if possible." />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="destructive">Submit Grievance</Button>
                    </CardFooter>
                </Card>

                <div className="space-y-8">
                    <h2 className="font-headline text-2xl font-bold text-center">Recent Grievances</h2>
                    {mockGrievances.map(item => (
                        <Card key={item.id} className="shadow-md overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <Image src={item.userAvatar} alt={item.userName} width={40} height={40} className="rounded-full" />
                                    <div className="flex-grow">
                                        <div className="flex items-center justify-between">
                                            <p className="font-bold">{item.userName}</p>
                                            <p className="text-xs text-muted-foreground font-semibold">{item.eventName}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                                    </div>
                                </div>
                            </CardContent>
                             {item.mediaUrl && (
                                <div className="relative h-64 w-full bg-muted">
                                    <Image src={item.mediaUrl} alt={`Grievance proof for ${item.eventName}`} fill className="object-cover" />
                                </div>
                            )}
                        </Card>
                    ))}
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
