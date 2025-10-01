
"use client";

import { useState, useEffect } from 'react';
import { LandingHeader } from '@/components/landing-header';
import { Button } from '@/components/ui/button';
import { ArrowRight, Ticket, BedDouble, Building, BarChart } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { placeHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const ShapeShifter = () => {
    const shapes = [
        <circle key="c" cx="50" cy="50" r="45" />,
        <rect key="r" x="5" y="5" width="90" height="90" rx="10" />,
        <polygon key="p" points="50,5 95,50 50,95 5,50" />
    ];
    const [currentShape, setCurrentShape] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentShape((prev) => (prev + 1) % shapes.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [shapes.length]);

    return (
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary transition-all duration-1000 ease-in-out">
            <g className="transition-opacity duration-1000" style={{ opacity: 1 }}>
                {shapes.map((shape, index) => (
                    <g key={index} style={{ opacity: index === currentShape ? 1 : 0, transition: 'opacity 1s ease-in-out' }}>
                        {shape}
                    </g>
                ))}
            </g>
        </svg>
    );
};

const Typewriter = ({ text, speed = 100 } : {text: string, speed?: number}) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);

    return <span>{displayedText}</span>;
};


export default function LandingPage() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
    <div className="bg-background min-h-screen text-foreground">
      <LandingHeader scrolled={scrolled} />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center text-center">
             <div className="absolute inset-0 bg-primary/5 -z-10" />
             <div className="absolute top-0 left-0 w-full h-full bg-grid-primary/10 -z-10 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_110%)]" />

            <div className="container px-4">
                <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter animated-gradient-text">
                   SeatWise Stays
                </h1>
                <p className={cn("mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-500", scrolled ? "md:text-base" : "")}>
                   <Typewriter text="Seamlessly book event seats and hotel stays. Your next experience is just a click away." />
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                     <Button asChild size="lg" variant="accent" className="font-bold">
                        <Link href="/dashboard">
                           Explore Events <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/signup">
                           Get Started
                        </Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-card border-y">
            <div className="container px-4">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">Everything in One Place</h2>
                    <p className="mt-4 text-muted-foreground">From discovering exciting events to booking the perfect stay, we've streamlined the entire process.</p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <Ticket className="h-10 w-10 text-primary" />
                        <h3 className="mt-4 font-bold text-lg">Book Event Seats</h3>
                        <p className="mt-2 text-muted-foreground text-sm">Browse a wide range of events and secure your seats with our interactive seating charts.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <BedDouble className="h-10 w-10 text-primary" />
                        <h3 className="mt-4 font-bold text-lg">Reserve Hotel Rooms</h3>
                        <p className="mt-2 text-muted-foreground text-sm">Find and book hotel rooms that match your budget and preferences, right from the event page.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Building className="h-10 w-10 text-primary" />
                        <h3 className="mt-4 font-bold text-lg">Manage It All</h3>
                        <p className="mt-2 text-muted-foreground text-sm">Keep track of your event tickets and hotel reservations in one simple dashboard.</p>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Animation Section */}
         <section className="py-16 md:py-24">
             <div className="container px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-square max-w-sm mx-auto">
                        <ShapeShifter />
                    </div>
                    <div>
                         <h2 className="font-headline text-3xl md:text-4xl font-bold">Dynamic & Simple</h2>
                        <p className="mt-4 text-muted-foreground">We leverage modern technology to create a user experience that is both powerful and intuitive. Our platform adapts to your needs, making booking a breeze.</p>
                    </div>
                </div>
             </div>
        </section>


        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-primary/5 border-t">
            <div className="container px-4 text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
                <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Create an account today to unlock a world of events and effortless bookings. Your next adventure awaits.</p>
                 <div className="mt-8">
                     <Button asChild size="lg" variant="accent" className="font-bold">
                        <Link href="/signup">
                           Sign Up Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}



// "use client";

// import { useState, useEffect } from 'react';
// import { LandingHeader } from '@/components/landing-header.tsx';
// import { Button } from '@/components/ui/button';
// import { ArrowRight, Ticket, BedDouble, Building, BarChart } from 'lucide-react';
// import Link from 'next/link';
// import { cn } from '@/lib/utils';
// import { placeHolderImages } from '@/lib/placeholder-images';
// import Image from 'next/image';

// const ShapeShifter = () => {
//     const shapes = [
//         <circle key="c" cx="50" cy="50" r="45" />,
//         <rect key="r" x="5" y="5" width="90" height="90" rx="10" />,
//         <polygon key="p" points="50,5 95,50 50,95 5,50" />
//     ];
//     const [currentShape, setCurrentShape] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentShape((prev) => (prev + 1) % shapes.length);
//         }, 2000);
//         return () => clearInterval(interval);
//     }, [shapes.length]);

//     return (
//         <svg viewBox="0 0 100 100" className="w-full h-full text-primary transition-all duration-1000 ease-in-out">
//             <g className="transition-opacity duration-1000" style={{ opacity: 1 }}>
//                 {shapes.map((shape, index) => (
//                     <g key={index} style={{ opacity: index === currentShape ? 1 : 0, transition: 'opacity 1s ease-in-out' }}>
//                         {shape}
//                     </g>
//                 ))}
//             </g>
//         </svg>
//     );
// };

// const Typewriter = ({ text, speed = 100 } : {text: string, speed?: number}) => {
//     const [displayedText, setDisplayedText] = useState('');

//     useEffect(() => {
//         let i = 0;
//         const interval = setInterval(() => {
//             if (i < text.length) {
//                 setDisplayedText(text.substring(0, i + 1));
//                 i++;
//             } else {
//                 clearInterval(interval);
//             }
//         }, speed);
//         return () => clearInterval(interval);
//     }, [text, speed]);

//     return <span>{displayedText}</span>;
// };


// export default function LandingPage() {
//     const [scrolled, setScrolled] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             setScrolled(window.scrollY > 10);
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//   return (
//     <div className="bg-background min-h-screen text-foreground">
//       <LandingHeader scrolled={scrolled} />
//       <main>
//         {/* Hero Section */}
//         <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center text-center">
//              <div className="absolute inset-0 bg-primary/5 -z-10" />
//              <div className="absolute top-0 left-0 w-full h-full bg-grid-primary/10 -z-10 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_110%)]" />

//             <div className="container px-4">
//                 <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter animated-gradient-text">
//                    SeatWise Stays
//                 </h1>
//                 <p className={cn("mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-500", scrolled ? "md:text-base" : "")}>
//                    <Typewriter text="Seamlessly book event seats and hotel stays. Your next experience is just a click away." />
//                 </p>
//                 <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
//                      <Button asChild size="lg" variant="accent" className="font-bold">
//                         <Link href="/dashboard">
//                            Explore Events <ArrowRight className="ml-2 h-5 w-5" />
//                         </Link>
//                     </Button>
//                     <Button asChild size="lg" variant="outline">
//                         <Link href="/signup">
//                            Get Started
//                         </Link>
//                     </Button>
//                 </div>
//             </div>
//         </section>

//         {/* Features Section */}
//         <section className="py-16 md:py-24 bg-card border-y">
//             <div className="container px-4">
//                 <div className="text-center max-w-3xl mx-auto">
//                     <h2 className="font-headline text-3xl md:text-4xl font-bold">Everything in One Place</h2>
//                     <p className="mt-4 text-muted-foreground">From discovering exciting events to booking the perfect stay, we've streamlined the entire process.</p>
//                 </div>
//                 <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//                     <div className="flex flex-col items-center">
//                         <Ticket className="h-10 w-10 text-primary" />
//                         <h3 className="mt-4 font-bold text-lg">Book Event Seats</h3>
//                         <p className="mt-2 text-muted-foreground text-sm">Browse a wide range of events and secure your seats with our interactive seating charts.</p>
//                     </div>
//                     <div className="flex flex-col items-center">
//                         <BedDouble className="h-10 w-10 text-primary" />
//                         <h3 className="mt-4 font-bold text-lg">Reserve Hotel Rooms</h3>
//                         <p className="mt-2 text-muted-foreground text-sm">Find and book hotel rooms that match your budget and preferences, right from the event page.</p>
//                     </div>
//                     <div className="flex flex-col items-center">
//                         <Building className="h-10 w-10 text-primary" />
//                         <h3 className="mt-4 font-bold text-lg">Manage It All</h3>
//                         <p className="mt-2 text-muted-foreground text-sm">Keep track of your event tickets and hotel reservations in one simple dashboard.</p>
//                     </div>
//                 </div>
//             </div>
//         </section>
        
//         {/* Animation Section */}
//          <section className="py-16 md:py-24">
//              <div className="container px-4">
//                 <div className="grid md:grid-cols-2 gap-12 items-center">
//                     <div className="relative aspect-square max-w-sm mx-auto">
//                         <ShapeShifter />
//                     </div>
//                     <div>
//                          <h2 className="font-headline text-3xl md:text-4xl font-bold">Dynamic & Simple</h2>
//                         <p className="mt-4 text-muted-foreground">We leverage modern technology to create a user experience that is both powerful and intuitive. Our platform adapts to your needs, making booking a breeze.</p>
//                     </div>
//                 </div>
//              </div>
//         </section>


//         {/* Call to Action Section */}
//         <section className="py-16 md:py-24 bg-primary/5 border-t">
//             <div className="container px-4 text-center">
//                 <h2 className="font-headline text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
//                 <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Create an account today to unlock a world of events and effortless bookings. Your next adventure awaits.</p>
//                  <div className="mt-8">
//                      <Button asChild size="lg" variant="accent" className="font-bold">
//                         <Link href="/signup">
//                            Sign Up Now <ArrowRight className="ml-2 h-5 w-5" />
//                         </Link>
//                     </Button>
//                 </div>
//             </div>
//         </section>
//       </main>
//     </div>
//   );
// }




// // import Image from 'next/image';
// // import { LoginForm } from '@/components/auth/login-form';
// // import { placeHolderImages } from '@/lib/placeholder-images';
// // import { Ticket } from 'lucide-react';

// // export default function LoginPage() {
// //   const loginImage = placeHolderImages['login-hero'];

// //   return (
// //     <div className="bg-background min-h-screen">
// //       <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
// //         <aside className="relative col-span-5 hidden h-full w-full flex-col bg-muted p-10 text-white lg:flex">
// //           <div className="absolute inset-0 bg-primary" />
// //            <Image
// //             src={loginImage.imageUrl}
// //             alt={loginImage.description}
// //             fill
// //             className="object-cover"
// //             data-ai-hint={loginImage.imageHint}
// //             priority
// //           />
// //           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
// //           <div className="relative z-20 flex items-center text-lg font-medium">
// //             <Ticket className="mr-2 h-8 w-8" />
// //             <span className="font-headline text-2xl">SeatWise Stays</span>
// //           </div>
// //           <div className="relative z-20 mt-auto">
// //             <blockquote className="space-y-2">
// //               <p className="text-lg">
// //                 &ldquo;From front-row seats to luxury suites, every booking is an experience. Seamless, simple, and smart.&rdquo;
// //               </p>
// //               <footer className="text-sm">Sofia Davis</footer>
// //             </blockquote>
// //           </div>
// //         </aside>
// //         <main className="flex min-h-screen items-center justify-center lg:col-span-7">
// //           <div className="mx-auto w-full max-w-md p-8">
// //             <LoginForm />
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }
