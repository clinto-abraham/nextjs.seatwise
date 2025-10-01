/**
 * @fileOverview
 * This file defines the recommended data structures (schemas) for a MongoDB implementation
 * of the SeatWise Stays application. These interfaces can be used with an ODM like Mongoose
 * or directly with the MongoDB Node.js driver.
 */

import type { ObjectId } from 'mongodb'; // Assuming usage of MongoDB's native ObjectId

// -----------------------------
// 1. User Schema
// -----------------------------
// Represents a user account in the system.
export interface User {
  _id: ObjectId;
  name: string;
  email: string; // Should be unique
  passwordHash: string; // Store a hashed password, not the plain text
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// -----------------------------
// 2. Event Schema
// -----------------------------
// Represents an event that users can book tickets for.
export interface Event {
  _id: ObjectId;
  name: string;
  description: string;
  date: Date; // Store as a BSON Date for proper querying
  time: string; // e.g., "19:00"
  timezone: string; // e.g., "Asia/Kolkata"
  duration: number; // in days
  location: string;
  venueCoordinates: {
    latitude: number;
    longitude: number;
  };
  images: string[]; // URLs to images
  
  foodDetails?: {
    costPerDay: number;
    description: string;
  };

  seatingLayout: SeatingLayout; // Embed the seating layout within the event
  
  createdBy: ObjectId; // Ref to User collection (admin)
  createdAt: Date;
  updatedAt: Date;
}

export interface SeatingLayout {
  rows: number;
  cols: number;
  // A map to store seats that are unavailable by default (e.g., booked, reserved for staff)
  // Key: "A1", "C12", etc. Value: status
  unavailableSeats: Record<string, 'booked' | 'reserved'>; 
}


// -----------------------------
// 3. Hotel Schema
// -----------------------------
// Represents a hotel room that can be booked.
export interface Hotel {
  _id: ObjectId;
  name: string;
  description: string;
  pricePerNight: number;
  images: string[]; // URLs to images
  amenities: string[];
  createdAt: Date;
}


// -----------------------------
// 4. Booking Schema
// -----------------------------
// Represents a booking made by a user, which can contain multiple tickets.
export interface Booking {
  _id: ObjectId;
  userId: ObjectId; // Ref to User collection
  eventId: ObjectId; // Ref to Event collection
  
  // Array of individual tickets within this booking
  tickets: Ticket[];
  
  totalAmount: number;
  bookingDate: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
}

// Represents a single ticket within a booking
export interface Ticket {
  seat: string; // e.g., "A1", "D14"
  attendee: {
    name: string;
    contact: string;
    email?: string;
    address?: string;
  };
  // Optional reference to a hotel booking associated with this ticket
  hotelBooking?: {
    hotelId: ObjectId; // Ref to Hotel collection
    checkInDate: Date;
    checkOutDate: Date;
    price: number;
  };
  // Optional food package details
  foodPackage?: {
    days: number;
    cost: number;
  };
}


// -----------------------------
// 5. Donation Schema
// -----------------------------
// Represents a donation made by a user.
export interface Donation {
  _id: ObjectId;
  userId: ObjectId; // Ref to User collection
  amount: number; // in the smallest currency unit (e.g., paise)
  cause: string; // e.g., "General Event Fund", "Lighting & Staging"
  transactionId: string; // From the payment gateway
  status: 'completed' | 'failed' | 'pending';
  donationDate: Date;
}


// -----------------------------
// 6. Community & Grievance Post Schema
// -----------------------------
// Can be used for both the community forum and the grievances page.
export interface Post {
  _id: ObjectId;
  userId: ObjectId; // Ref to User collection
  eventId?: ObjectId; // Optional ref to Event collection
  
  type: 'community' | 'grievance'; // To distinguish between the two forums
  
  content: string;
  mediaUrl?: string; // URL to an uploaded image or video
  mediaType?: 'image' | 'video';

  createdAt: Date;
}
