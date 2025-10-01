
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'SeatWise Stays',
  description: 'Book hotel rooms and event seats seamlessly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col h-full">
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex-1">
            {children}
            </div>
            <Toaster />
            <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}


// import type { Metadata } from 'next';
// import './globals.css';
// import { Toaster } from '@/components/ui/toaster';
// import { Footer } from '@/components/footer';
// import { ThemeProvider } from '@/components/theme-provider';

// export const metadata: Metadata = {
//   title: 'SeatWise Stays',
//   description: 'Book hotel rooms and event seats seamlessly.',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className="h-full" suppressHydrationWarning>
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
//       </head>
//       <body className="font-body antialiased flex flex-col h-full">
//         <ThemeProvider
//             attribute="class"
//             defaultTheme="light"
//             enableSystem
//             disableTransitionOnChange
//         >
//             <div className="flex-1">
//             {children}
//             </div>
//             <Toaster />
//             <Footer />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }





// // import type { Metadata } from 'next';
// // import './globals.css';
// // import { Toaster } from '@/components/ui/toaster';
// // import { Footer } from '@/components/footer';

// // export const metadata: Metadata = {
// //   title: 'SeatWise Stays',
// //   description: 'Book hotel rooms and event seats seamlessly.',
// // };

// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode;
// // }>) {
// //   return (
// //     <html lang="en" className="h-full">
// //       <head>
// //         <link rel="preconnect" href="https://fonts.googleapis.com" />
// //         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
// //         <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
// //       </head>
// //       <body className="font-body antialiased flex flex-col h-full">
// //         <div className="flex-1">
// //           {children}
// //         </div>
// //         <Toaster />
// //         <Footer />
// //       </body>
// //     </html>
// //   );
// // }
