
import Image from 'next/image';
import { SignupForm } from '@/components/auth/signup-form';
import { placeHolderImages } from '@/lib/placeholder-images';
import { Ticket } from 'lucide-react';

export default function SignupPage() {
  const loginImage = placeHolderImages['login-hero'];
  
  return (
    <div className="bg-background min-h-screen">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="flex min-h-screen items-center justify-center lg:col-span-7">
          <div className="mx-auto w-full max-w-md p-8">
            <SignupForm />
          </div>
        </main>
        <aside className="relative col-span-5 hidden h-full w-full flex-col bg-muted p-10 text-white lg:flex">
          <div className="absolute inset-0 bg-primary" />
           <Image
            src={loginImage.imageUrl}
            alt={loginImage.description}
            fill
            className="object-cover"
            data-ai-hint={loginImage.imageHint}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Ticket className="mr-2 h-8 w-8" />
            <span className="font-headline text-2xl">SeatWise Stays</span>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;From front-row seats to luxury suites, every booking is an experience. Seamless, simple, and smart.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </aside>
      </div>
    </div>
  );
}
