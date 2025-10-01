
"use client";

import { useState, useMemo, useEffect } from 'react';
import { AuthenticatedLayout } from '@/components/authenticated-layout';
import { EventCard } from '@/components/event-card';
import { getAllEvents } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Calendar } from 'lucide-react';
import type { Event } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonthYear, setSelectedMonthYear] = useState('all');

  useEffect(() => {
    async function fetchEvents() {
      try {
        const events = await getAllEvents();
        setAllEvents(events);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      if (!event.location) return false;
      const eventDate = new Date(event.date);
      const eventMonthYear = `${eventDate.getFullYear()}-${String(eventDate.getMonth()).padStart(2, '0')}`;

      const matchesSearchTerm = event.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMonthYear = selectedMonthYear === 'all' || eventMonthYear === selectedMonthYear;
      
      return matchesSearchTerm && matchesMonthYear;
    });
  }, [allEvents, searchTerm, selectedMonthYear]);

  const monthYears = useMemo(() => {
    const eventMonthYears = new Set(
      allEvents.map(event => {
        const eventDate = new Date(event.date);
        return `${eventDate.getFullYear()}-${String(eventDate.getMonth()).padStart(2, '0')}`;
      })
    );

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    return Array.from(eventMonthYears)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map(my => {
        const [year, monthIndex] = my.split('-');
        return {
          value: my,
          label: `${monthNames[parseInt(monthIndex, 10)]} ${year}`,
        };
      });
  }, [allEvents]);

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-48 w-full rounded-lg" />
          <div className="space-y-2 p-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
           <div className="p-4 pt-0">
             <Skeleton className="h-10 w-full" />
           </div>
        </div>
      ))}
    </div>
  );


  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 font-headline text-4xl font-bold tracking-tight">
          Upcoming Events
        </h1>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative md:col-span-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search by location..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
             <div className="relative md:col-span-2">
                 <Select value={selectedMonthYear} onValueChange={setSelectedMonthYear}>
                    <SelectTrigger className="w-full">
                        <div className="flex items-center gap-2">
                             <Calendar className="h-5 w-5 text-muted-foreground" />
                             <SelectValue placeholder="Filter by month" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Months</SelectItem>
                        {monthYears.map(month => (
                            <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>

        {loading ? (
          renderSkeletons()
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg font-semibold">No events found</p>
            <p className="text-muted-foreground">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
