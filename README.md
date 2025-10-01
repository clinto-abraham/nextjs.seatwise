# **App Name**: SeatWise Stays

## Core Features:

- Hotel Room Display: Display available hotel rooms with descriptions, images, and prices.
- Seat Selection: Allow users to select specific seats for events or travel, with a visual layout of the seating arrangement.
- Event Listings: List different events with detailed descriptions and available seat options. This feature will suggest whether or not an available hotel room may enhance a customer's experience of the listed event; the system will use an AI tool to help with this, comparing details of the user’s potential booking and the event's expected length/atmosphere/travel requirements etc.
- Booking Summary: Show a summary of selected hotel rooms and seats before finalizing the booking.
- User Authentication: Allow users to create accounts, log in, and manage their bookings.
- Payment Processing: Integrate a secure payment gateway to process bookings.

## Style Guidelines:

- Primary color: Deep sky blue (#00BFFF) for trust and dependability.
- Background color: Light gray (#F0F0F0) for a clean and neutral backdrop.
- Accent color: Coral (#FF8076) to draw attention to key interactive elements.
- Font pairing: 'Playfair' (serif) for headlines, and 'PT Sans' (sans-serif) for body text.
- Use clean, modern icons to represent different room and seat types.
- Maintain a consistent and user-friendly layout across all pages.



#########################################


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


##ERRORS TO BE SOLVED

npm ERR! While resolving: seatwise@0.1.0
npm ERR! Found: react@19.1.0
npm ERR! node_modules/react
npm ERR!   react@"19.1.0" from the root project
npm ERR! 
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^16.8.0 || ^17.0.0 || ^18.0.0" from react-day-picker@8.10.1
npm ERR! node_modules/react-day-picker
npm ERR!   react-day-picker@"^8.10.1" from the root project