
import type { Donation, DonationSpendingDetail } from './types.ts';

export const donationSpendingDetails: DonationSpendingDetail[] = [
  {
    event: {
      name: "Starlight Symphony Orchestra",
      location: "Grand Park Amphitheater",
      date: "2024-10-26",
    },
    spending: {
      "Venue & Hall Rental": 1800000,
      "Sound & Audio Equipment": 1200000,
      "Lighting & Staging": 900000,
      "Food & Catering": 2500000,
      "Artist & Performer Fees": 4000000,
    }
  },
  {
    event: {
      name: "Innovate & Inspire Tech Summit",
      location: "Metropolitan Convention Center",
      date: "2024-11-12",
    },
    spending: {
      "Venue & Hall Rental": 2700000,
      "Sound & Audio Equipment": 2000000,
      "Lighting & Staging": 1600000,
      "Food & Catering": 3500000,
      "Artist & Performer Fees": 4800000,
    }
  },
];

// In a real app, this would be tied to user accounts
export const allDonations: Donation[] = [
    { id: 'don-1', date: '2024-07-15', amount: 2500, cause: 'General Event Fund', userName: 'Alice Johnson', userEmail: 'alice@example.com' },
    { id: 'don-2', date: '2024-06-28', amount: 1000, cause: 'Sound & Audio Equipment', userName: 'Bob Williams', userEmail: 'bob@example.com' },
    { id: 'don-3', date: '2024-05-10', amount: 5000, cause: 'Artist & Performer Fees', userName: 'Charlie Brown', userEmail: 'charlie@example.com' },
    { id: 'don-4', date: '2024-04-22', amount: 1500, cause: 'Venue & Hall Rental', userName: 'Diana Miller', userEmail: 'diana@example.com' },
    { id: 'don-5', date: '2024-07-18', amount: 750, cause: 'General Event Fund', userName: 'Ethan Davis', userEmail: 'ethan@example.com' },
    { id: 'don-6', date: '2024-06-15', amount: 3000, cause: 'Lighting & Staging', userName: 'Fiona Garcia', userEmail: 'fiona@example.com' },

];

// In a real application, this would come from a user-specific API call
// For now, we filter the allDonations list to simulate a logged-in user.
export const myDonations = allDonations.filter(d => ['alice@example.com', 'charlie@example.com'].includes(d.userEmail));


export const getMyDonations = async (): Promise<Donation[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(myDonations);
        }, 500);
    });
}

export const getAllDonations = async (): Promise<Donation[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(allDonations);
        }, 500);
    });
}
