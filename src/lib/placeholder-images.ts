
import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const placeHolderImages: Record<string, ImagePlaceholder> = data.placeholderImages.reduce((acc, current) => {
  acc[current.id] = current;
  return acc;
}, {} as Record<string, ImagePlaceholder>);
