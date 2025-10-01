
export type Event = {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  timezone: string;
  location: string;
  images: string[];
  itemsToBring: string[];
  duration: number;
  foodDetails?: {
    costPerDay: number;
    description: string;
  };
};

export type HotelRoom = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  amenities: string[];
};

export type Seat = {
  id: string;
  number: string;
  isAvailable: boolean;
};

export type SeatingRow = Seat[];
export type SeatingLayout = SeatingRow[];

export type DonationCategory = "Venue & Hall Rental" | "Sound & Audio Equipment" | "Lighting & Staging" | "Food & Catering" | "Artist & Performer Fees";

export type DonationSpendingDetail = {
  event: {
    name: string;
    location: string;
    date: string;
  };
  spending: Record<DonationCategory, number>;
};

export type UserBooking = {
  bookingId: string;
  eventId: string;
  seat: string;
  attendeeName: string;
  stayId: string | null;
  foodDays: number;
};

export type Donation = {
  id: string;
  date: string;
  amount: number;
  cause: string;
  userName: string;
  userEmail: string;
};
