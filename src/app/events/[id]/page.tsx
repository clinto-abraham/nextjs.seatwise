
import { AuthenticatedLayout } from '@/components/authenticated-layout';
import { EventBookingClient } from '@/components/event-booking-client';
import { getEventById, getSeatingLayoutByEventId } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await getEventById(params.id);
  if (!event) {
    notFound();
  }
  
  const seatingLayout = await getSeatingLayoutByEventId(params.id);

  if (!seatingLayout) {
    // Or render an error state
    notFound();
  }

  return (
    <AuthenticatedLayout>
      <EventBookingClient
        event={event}
        seatingLayout={seatingLayout}
      />
    </AuthenticatedLayout>
  );
}
