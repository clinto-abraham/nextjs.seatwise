
import { AuthenticatedLayout } from '@/components/authenticated-layout';
import { CreateEventForm } from '@/components/admin/create-event-form';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <AuthenticatedLayout>
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="font-headline text-4xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">
              Create and manage events, and view donations.
            </p>
          </div>
           <Button asChild variant="outline">
              <Link href="/admin/donations">
                <Heart className="mr-2 h-4 w-4" />
                View Donations
              </Link>
            </Button>
        </div>

        <CreateEventForm />
      </div>
    </AuthenticatedLayout>
  );
}
