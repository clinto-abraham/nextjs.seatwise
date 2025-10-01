
"use client";

import { useState } from "react";
import { Armchair } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SeatingLayout } from "@/lib/types";
import { Card } from "@/components/ui/card";

type SeatingChartProps = {
  seatingLayout: SeatingLayout;
  onSeatsChange: (seats: string[]) => void;
};

export function SeatingChart({ seatingLayout, onSeatsChange }: SeatingChartProps) {
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());

  const handleSeatClick = (seatId: string, isAvailable: boolean) => {
    if (!isAvailable) return;

    const newSelectedSeats = new Set(selectedSeats);
    if (newSelectedSeats.has(seatId)) {
      newSelectedSeats.delete(seatId);
    } else {
      newSelectedSeats.add(seatId);
    }
    setSelectedSeats(newSelectedSeats);
    onSeatsChange(Array.from(newSelectedSeats));
  };
  
  const getSeatClass = (isAvailable: boolean, seatId: string) => {
    if (!isAvailable) {
      return "text-red-500 cursor-not-allowed";
    }
    if (selectedSeats.has(seatId)) {
      return "text-green-500 cursor-pointer transition-transform duration-200 scale-110";
    }
    return "text-yellow-400 hover:text-yellow-500 cursor-pointer transition-colors";
  };
  
  return (
    <Card className="p-4 sm:p-6 shadow-lg">
      <div className="relative w-full overflow-x-auto">
        <div className="mb-4 flex justify-center">
            <div className="px-8 py-2 bg-muted rounded-full text-sm font-semibold text-muted-foreground shadow-inner">STAGE</div>
        </div>
        <div className="flex flex-col items-center gap-2">
          {seatingLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-1 sm:gap-2">
              <span className="w-6 text-center font-mono text-sm text-muted-foreground">
                {String.fromCharCode(65 + rowIndex)}
              </span>
              <div className="flex gap-1 sm:gap-2">
                {row.map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat.id, seat.isAvailable)}
                    aria-label={`Seat ${seat.id}`}
                    disabled={!seat.isAvailable}
                    className="focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                  >
                    <Armchair
                      className={cn("h-6 w-6 sm:h-8 sm:w-8", getSeatClass(seat.isAvailable, seat.id))}
                    />
                  </button>
                ))}
              </div>
               <span className="w-6 text-center font-mono text-sm text-muted-foreground">
                {String.fromCharCode(65 + rowIndex)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        <div className="flex items-center gap-2">
            <Armchair className="h-5 w-5 text-yellow-400" />
            <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
            <Armchair className="h-5 w-5 text-green-500" />
            <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
            <Armchair className="h-5 w-5 text-red-500" />
            <span>Booked</span>
        </div>
      </div>
    </Card>
  );
}
