
import type { Event, HotelRoom, SeatingLayout, UserBooking } from './types';
import { placeHolderImages } from './placeholder-images';

export const events: Event[] = [
  {
    id: 'evt-1',
    name: 'Starlight Symphony Orchestra',
    description: 'An unforgettable evening of classical music under the stars. The Starlight Symphony Orchestra will perform timeless pieces by Mozart, Beethoven, and Bach in the city\'s most iconic open-air amphitheater.',
    date: '2024-10-26',
    time: '19:00',
    timezone: 'Asia/Kolkata',
    location: 'Grand Park Amphitheater',
    images: [
      placeHolderImages['event-concert'].imageUrl,
      'https://images.unsplash.com/photo-1519412666095-9ce9a1d1dcf9?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2070&auto=format&fit=crop',
    ],
    itemsToBring: ['A light jacket', 'Comfortable shoes', 'A copy of your ticket'],
    duration: 1,
    foodDetails: {
        costPerDay: 800,
        description: "Includes a selection of vegetarian and non-vegetarian snacks and a beverage."
    }
  },
  {
    id: 'evt-2',
    name: 'Innovate & Inspire Tech Summit',
    description: 'Join industry leaders and tech pioneers for a two-day summit exploring the future of artificial intelligence, blockchain, and sustainable tech. Network with peers, attend insightful keynotes, and discover groundbreaking startups.',
    date: '2024-11-12',
    time: '09:30',
    timezone: 'America/Los_Angeles',
    location: 'Metropolitan Convention Center',
    images: [
      placeHolderImages['event-conference'].imageUrl,
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop'
    ],
    itemsToBring: ['Laptop or tablet', 'Business cards', 'A notebook and pen', 'Water bottle'],
    duration: 2,
    foodDetails: {
        costPerDay: 1200,
        description: "Full-day catering with breakfast, lunch, and high-tea. Veg/Non-Veg options available."
    }
  },
  {
    id: 'evt-3',
    name: 'Titans vs. Knights: Championship Final',
    description: 'Experience the thrilling conclusion of the basketball season as the Titans face off against the Knights. Witness every slam dunk, three-pointer, and buzzer-beater in this high-stakes championship final.',
    date: '2024-11-05',
    time: '18:00',
    location: 'Metropolitan Convention Center',
    timezone: 'Europe/Berlin',
    images: [
      "https://images.unsplash.com/photo-1515523110800-9415d16b84e8?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562089408-969a12f121d5?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1983&auto=format&fit=crop"
    ],
    itemsToBring: ['Team jersey', 'Foam finger', 'Your loud voice!'],
    duration: 1,
  },
];

export const hotelRooms: HotelRoom[] = [
  {
    id: 'hotel-1',
    name: 'The Royal Crest Suite',
    description: 'Indulge in unparalleled luxury with panoramic city views, a king-sized bed, and a spa-inspired bathroom. Perfect for a lavish getaway.',
    price: 45000,
    image: placeHolderImages['hotel-luxury'].imageUrl,
    amenities: ['Free WiFi', 'Pool', 'Spa', '24/7 Room Service', 'City View'],
  },
  {
    id: 'hotel-2',
    name: 'The Artisan Loft',
    description: 'A chic and stylish loft in a boutique hotel, featuring unique decor, a cozy queen bed, and artisanal coffee. Ideal for the modern traveler.',
    price: 22000,
    image: placeHolderImages['hotel-boutique'].imageUrl,
    amenities: ['Free WiFi', 'Cafe', 'Pet Friendly', 'Art Gallery'],
  },
  {
    id: 'hotel-3',
    name: 'The Urban Nest',
    description: 'A clean, comfortable, and affordable room in the heart of the city. Everything you need for a smart and simple stay.',
    price: 9500,
    image: placeHolderImages['hotel-budget'].imageUrl,
    amenities: ['Free WiFi', 'Self Check-in', 'Breakfast Included'],
  },
];

const generateSeatingLayout = (rows: number, cols: number, unavailableCount: number): SeatingLayout => {
  const layout: SeatingLayout = [];
  const unavailable = new Set<string>();
  while (unavailable.size < unavailableCount) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    unavailable.add(`${r}-${c}`);
  }

  for (let i = 0; i < rows; i++) {
    const row: any[] = [];
    const rowLetter = String.fromCharCode(65 + i);
    for (let j = 0; j < cols; j++) {
      const seatId = `${rowLetter}${j + 1}`;
      row.push({
        id: seatId,
        number: `${j + 1}`,
        isAvailable: !unavailable.has(`${i}-${j}`),
      });
    }
    layout.push(row);
  }
  return layout;
};

const seatingLayouts: Record<string, SeatingLayout> = {
  'evt-1': generateSeatingLayout(8, 12, 20),
  'evt-2': generateSeatingLayout(10, 15, 30),
  'evt-3': generateSeatingLayout(12, 20, 50),
};

// In a real application, this would come from a user-specific API call
const myBookings: UserBooking[] = [
    {
        bookingId: "SWS-t-1-B3-123456",
        eventId: "evt-1",
        seat: "B3",
        attendeeName: "John Doe",
        stayId: "hotel-2",
        foodDays: 1,
    },
    {
        bookingId: "SWS-t-1-B4-234567",
        eventId: "evt-1",
        seat: "B4",
        attendeeName: "Jane Smith",
        stayId: null,
        foodDays: 0,
    },
    {
        bookingId: "SWS-t-2-A10-345678",
        eventId: "evt-2",
        seat: "A10",
        attendeeName: "Peter Jones",
        stayId: "hotel-3",
        foodDays: 2,
    },
    {
        bookingId: "SWS-t-3-F5-456789",
        eventId: "evt-3",
        seat: "F5",
        attendeeName: "Emily White",
        stayId: null,
        foodDays: 0,
    },
    {
        bookingId: "SWS-t-3-F6-567890",
        eventId: "evt-3",
        seat: "F6",
        attendeeName: "Michael Brown",
        stayId: null,
        foodDays: 0,
    }
];

export const getMyBookedSeatsForEvent = async (eventId: string): Promise<string[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const seats = myBookings.filter(b => b.eventId === eventId).map(b => b.seat);
            resolve(seats);
        }, 500);
    });
}

export const getMyBookings = async (): Promise<UserBooking[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(myBookings);
        }, 300);
    });
}

export const getEventById = async (id: string): Promise<Event | undefined> => {
  return events.find(event => event.id === id);
}

export const getAllEvents = async (): Promise<Event[]> => {
  return events;
}

export const getHotelRoomById = async (id: string): Promise<HotelRoom | undefined> => {
    return hotelRooms.find(room => room.id === id);
}

export const getAllHotelRooms = async (): Promise<HotelRoom[]> => {
  return hotelRooms;
}

export const getSeatingLayoutByEventId = async (id: string): Promise<SeatingLayout | undefined> => {
  return seatingLayouts[id];
}
