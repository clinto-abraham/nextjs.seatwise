import BookingSummaryPage from '@/components/booking/summary/BookingSummaryPage';
import { Suspense } from 'react';

export default function ConfirmationPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading confirmation...</div>}>
        <BookingSummaryPage />
      </Suspense>
    </main>
  );
}