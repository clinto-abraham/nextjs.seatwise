
"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Sparkles, Hotel, Check } from "lucide-react";
import { getAIHotelSuggestion } from "@/actions/ai";
import type { Event, HotelRoom } from "@/lib/types";
import type { EnhanceEventExperienceOutput } from "@/ai/flows/enhance-event-experience-with-hotel-suggestion";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

type AIHotelSuggesterProps = {
    event: Event;
    hotels: HotelRoom[];
    onSelectHotel: (hotel: HotelRoom | null) => void;
    selectedHotelId: string | undefined;
}

export function AIHotelSuggester({ event, hotels, onSelectHotel, selectedHotelId }: AIHotelSuggesterProps) {
    const [suggestion, setSuggestion] = useState<EnhanceEventExperienceOutput | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGetSuggestion = async () => {
        setLoading(true);
        setError(null);
        setSuggestion(null);

        const input = {
            eventDescription: event.description,
            eventDetails: `Name: ${event.name}, Date: ${event.date}, Location: ${event.location}`,
            userPreferences: "Looking for a balance of comfort, convenience, and value. Proximity to the venue is a plus.",
            availableHotelRooms: JSON.stringify(hotels.map(h => ({ name: h.name, description: h.description, price: h.price, amenities: h.amenities })))
        };

        const result = await getAIHotelSuggestion(input);
        
        if (result.success && result.data) {
            try {
                // The AI output is a stringified JSON, so we need to parse it.
                const parsedSuggestions = JSON.parse(result.data.suggestedHotelRooms);
                setSuggestion({
                    ...result.data,
                    suggestedHotelRooms: parsedSuggestions,
                });
            } catch (e) {
                 // It might not be JSON, but a simple string. Handle that.
                 if (typeof result.data.suggestedHotelRooms === 'string') {
                    setSuggestion({
                        ...result.data,
                        suggestedHotelRooms: [{ name: result.data.suggestedHotelRooms, reasoning: result.data.reasoning }],
                    });
                 } else {
                    setError("AI returned an unexpected format. Please try again.");
                 }
            }
        } else {
            setError(result.error || "An unknown error occurred.");
        }
        setLoading(false);
    };
    
    const suggestedHotelsList = suggestion?.suggestedHotelRooms ? (Array.isArray(suggestion.suggestedHotelRooms) ? suggestion.suggestedHotelRooms : [suggestion.suggestedHotelRooms]) : [];
    
    const suggestedHotelNames = suggestedHotelsList.map(s => typeof s === 'string' ? s : s.name);

    const suggestedHotelsInDb = hotels.filter(h => suggestedHotelNames.includes(h.name));

    return (
        <Card className="bg-primary/5 border-primary/20 shadow-md">
            <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                    <Sparkles className="h-8 w-8 text-primary mb-2"/>
                    <h3 className="font-semibold text-foreground">Enhance Your Experience</h3>
                    <p className="text-sm text-muted-foreground mb-3">Let our AI suggest the perfect hotel for this event.</p>
                    <Button onClick={handleGetSuggestion} disabled={loading} size="sm">
                        <Sparkles className="mr-2 h-4 w-4"/>
                        {loading ? 'Analyzing...' : 'Get Suggestions'}
                    </Button>
                </div>
                {loading && (
                    <div className="mt-4 space-y-2">
                        <Skeleton className="h-4 w-3/4 mx-auto" />
                        <Skeleton className="h-4 w-1/2 mx-auto" />
                    </div>
                )}
                {error && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {suggestion && suggestedHotelsInDb.length > 0 && (
                     <div className="mt-4 space-y-3">
                        <h4 className="font-semibold text-sm text-center">AI Recommendations:</h4>
                         {suggestedHotelsInDb.map(hotel => {
                            const hotelSuggestionDetails = suggestedHotelsList.find(s => (typeof s === 'object' ? s.name : s) === hotel.name);
                            const reasoning = typeof hotelSuggestionDetails === 'object' ? hotelSuggestionDetails.reasoning : suggestion.reasoning;
                             return (
                                <button key={hotel.id} onClick={() => onSelectHotel(selectedHotelId === hotel.id ? null : hotel)} className="w-full text-left">
                                <Card className={cn("transition-all", selectedHotelId === hotel.id ? 'border-accent ring-2 ring-accent' : 'hover:border-primary/50')}>
                                    <CardContent className="p-3">
                                        <div className="flex justify-between items-start">
                                            <p className="font-bold text-sm flex items-center gap-2"><Hotel className="h-4 w-4 text-primary"/>{hotel.name}</p>
                                            {selectedHotelId === hotel.id && <Check className="h-5 w-5 text-accent"/>}
                                        </div>
                                        {reasoning && <p className="text-xs text-muted-foreground mt-1 pl-6">{reasoning}</p>}
                                    </CardContent>
                                </Card>
                                </button>
                             )
                         })}
                     </div>
                )}
            </CardContent>
        </Card>
    )
}
