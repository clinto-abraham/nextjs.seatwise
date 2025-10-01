'use server';

/**
 * @fileOverview Suggests relevant hotel rooms based on the event a user is booking.
 *
 * - enhanceEventExperienceWithHotelSuggestion - A function that suggests hotel rooms based on the event.
 * - EnhanceEventExperienceInput - The input type for the enhanceEventExperienceWithHotelSuggestion function.
 * - EnhanceEventExperienceOutput - The return type for the enhanceEventExperienceWithHotelSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceEventExperienceInputSchema = z.object({
  eventDescription: z.string().describe('The description of the event the user is booking seats for.'),
  eventDetails: z.string().describe('Details about the event, including date, time, and location.'),
  userPreferences: z.string().describe('The user preferences for hotel rooms, including price range and amenities.'),
  availableHotelRooms: z.string().describe('A list of available hotel rooms with descriptions, prices, and amenities.'),
});
export type EnhanceEventExperienceInput = z.infer<typeof EnhanceEventExperienceInputSchema>;

const EnhanceEventExperienceOutputSchema = z.object({
  suggestedHotelRooms: z.string().describe('A list of suggested hotel rooms that would enhance the user experience of the event.'),
  reasoning: z.string().describe('The reasoning behind the hotel room suggestions.'),
});
export type EnhanceEventExperienceOutput = z.infer<typeof EnhanceEventExperienceOutputSchema>;

export async function enhanceEventExperienceWithHotelSuggestion(
  input: EnhanceEventExperienceInput
): Promise<EnhanceEventExperienceOutput> {
  return enhanceEventExperienceWithHotelSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceEventExperienceWithHotelSuggestionPrompt',
  input: {schema: EnhanceEventExperienceInputSchema},
  output: {schema: EnhanceEventExperienceOutputSchema},
  prompt: `You are an AI assistant designed to suggest relevant hotel rooms based on the event a user is booking seats for.

  Based on the event description, event details, user preferences, and available hotel rooms, suggest the best hotel rooms that would enhance the user's experience.

  Event Description: {{{eventDescription}}}
  Event Details: {{{eventDetails}}}
  User Preferences: {{{userPreferences}}}
  Available Hotel Rooms: {{{availableHotelRooms}}}

  Give a brief reasoning for each hotel room suggestion.
`,
});

const enhanceEventExperienceWithHotelSuggestionFlow = ai.defineFlow(
  {
    name: 'enhanceEventExperienceWithHotelSuggestionFlow',
    inputSchema: EnhanceEventExperienceInputSchema,
    outputSchema: EnhanceEventExperienceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
