import ConfirmationClientContent from '@/components/booking/confirmation/ConfirmationClientContent';
import { Suspense } from 'react';

export default function ConfirmationPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading confirmation...</div>}>
        <ConfirmationClientContent />
      </Suspense>
    </main>
  );
}