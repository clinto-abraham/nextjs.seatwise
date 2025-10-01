
"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, MapPin, PlusCircle, Utensils } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";

const createEventSchema = z.object({
  name: z.string().min(3, "Event name must be at least 3 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  location: z.string().min(3, "Location is required."),
  latitude: z.coerce.number().min(-90, "Invalid latitude.").max(90, "Invalid latitude."),
  longitude: z.coerce.number().min(-180, "Invalid longitude.").max(180, "Invalid longitude."),
  date: z.date({
    required_error: "A date for the event is required.",
  }),
  duration: z.coerce.number().int().min(1, "Duration must be at least 1 day."),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)."),
  timezone: z.string().min(1, "Timezone is required."),
  rows: z.coerce.number().int().min(1, "Must have at least 1 row.").max(26),
  cols: z.coerce.number().int().min(1, "Must have at least 1 column.").max(50),
  hasFoodPackage: z.boolean(),
  foodCostPerDay: z.coerce.number().optional(),
  foodDescription: z.string().optional(),
}).refine(data => {
  if (data.hasFoodPackage) {
    return data.foodCostPerDay !== undefined && data.foodCostPerDay > 0 && data.foodDescription && data.foodDescription.length > 5;
  }
  return true;
}, {
  message: "If food package is offered, cost and description are required.",
  path: ["hasFoodPackage"],
});


type CreateEventFormValues = z.infer<typeof createEventSchema>;

const timezones = [
  "Asia/Kolkata",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Australia/Sydney",
  "Asia/Tokyo",
];


export function CreateEventForm() {
  const { toast } = useToast();
  const form = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      latitude: 0,
      longitude: 0,
      time: "19:00",
      duration: 1,
      timezone: "Asia/Kolkata",
      rows: 10,
      cols: 15,
      hasFoodPackage: false,
    },
  });
  
  const hasFoodPackage = form.watch("hasFoodPackage");

  const onSubmit: SubmitHandler<CreateEventFormValues> = (data) => {
    // In a real app, you would have a server action here to create the event.
    // For this demo, we'll just log the data and show a success message.
    console.log("New Event Data:", data);
    toast({
      title: "Event Created!",
      description: `The event "${data.name}" has been successfully created.`,
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2 text-2xl">
              <PlusCircle className="h-6 w-6" />
              Create New Event
            </CardTitle>
            <CardDescription>
              Fill out the form below to add a new event to the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Summer Music Festival" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the event..."
                      className="resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <Label className="flex items-center gap-2 mb-2"><MapPin className="h-4 w-4"/> Location Details</Label>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-6 rounded-lg border p-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="md:col-span-3">
                        <FormLabel>Location Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., City Park Pavilion" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input type="number" step="any" placeholder="e.g., 28.6139" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                           <Input type="number" step="any" placeholder="e.g., 77.2090" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                 <FormDescription className="md:col-span-3 text-xs">
                    You can find the latitude and longitude by right-clicking a location on Google Maps.
                </FormDescription>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Event Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (days)</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timezone</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a timezone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timezones.map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            
            <div>
              <Label className="flex items-center gap-2 mb-2"><Utensils className="h-4 w-4"/> Food Package Details</Label>
              <div className="mt-2 space-y-4 rounded-lg border p-4">
                  <FormField
                    control={form.control}
                    name="hasFoodPackage"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">This event offers a food package</FormLabel>
                      </FormItem>
                    )}
                  />

                  {hasFoodPackage && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6 pt-4 border-l">
                      <FormField
                        control={form.control}
                        name="foodCostPerDay"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cost Per Day (INR)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="e.g., 1000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="foodDescription"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Food Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="e.g., Includes veg/non-veg lunch and high-tea" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

              </div>
            </div>


            <div>
              <Label>Seating Configuration</Label>
              <div className="mt-2 grid grid-cols-2 gap-6 rounded-lg border p-4">
                <FormField
                  control={form.control}
                  name="rows"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rows</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                       <FormDescription>
                        Number of rows (A, B, C...). Max 26.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cols"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seats per Row</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Number of seats in each row. Max 50.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="accent" size="lg">
                Create Event
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
