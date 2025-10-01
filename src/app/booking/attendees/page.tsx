import AttendeesPage from '@/components/booking/attendees/AttendeesPage';
import { Suspense } from 'react';

export default function ConfirmationPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading confirmation...</div>}>
        <AttendeesPage />
      </Suspense>
    </main>
  );
}