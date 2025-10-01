
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import type { HotelRoom } from "@/lib/types";
import { placeHolderImages } from "@/lib/placeholder-images";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type HotelCardProps = {
  hotel: HotelRoom;
  onSelect: (hotel: HotelRoom | null) => void;
  isSelected: boolean;
};

export function HotelCard({ hotel, onSelect, isSelected }: HotelCardProps) {
  const hotelImage = Object.values(placeHolderImages).find(p => p.imageUrl === hotel.image);

  const isSelectable = !!onSelect;

  return (
    <Card className={cn("overflow-hidden shadow-md", isSelectable && "transition-all duration-300 hover:shadow-xl")}>
      <CardContent className="p-0">
        <div className="flex gap-4">
          <div className="relative h-32 w-32 flex-shrink-0">
            <Image 
              src={hotel.image} 
              alt={hotel.name} 
              fill
              className="object-cover"
              data-ai-hint={hotelImage?.imageHint}
            />
          </div>
          <div className="flex-grow p-4 pr-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold leading-tight">{hotel.name}</h3>
                <p className="text-sm text-muted-foreground">INR {hotel.price.toLocaleString('en-IN')} / night</p>
              </div>
              {isSelectable && (
                <Button 
                  variant={isSelected ? "accent" : "outline"} 
                  size="sm"
                  onClick={() => onSelect(isSelected ? null : hotel)}
                  className="shrink-0"
                >
                  {isSelected && <Check className="mr-1 h-4 w-4"/>}
                  {isSelected ? "Selected" : "Select"}
                </Button>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {hotel.amenities.slice(0, 3).map(amenity => (
                <span key={amenity} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{amenity}</span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
