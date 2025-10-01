
"use server";

import { 
  enhanceEventExperienceWithHotelSuggestion,
  type EnhanceEventExperienceInput,
  type EnhanceEventExperienceOutput,
 } from '@/ai/flows/enhance-event-experience-with-hotel-suggestion';

type AIResult = {
  success: boolean;
  data?: EnhanceEventExperienceOutput;
  error?: string;
}

export async function getAIHotelSuggestion(input: EnhanceEventExperienceInput): Promise<AIResult> {
  try {
    const result = await enhanceEventExperienceWithHotelSuggestion(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("AI suggestion failed:", error);
    return { success: false, error: 'Failed to get AI-powered suggestions. Please try again.' };
  }
}
