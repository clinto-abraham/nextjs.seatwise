
import { AuthenticatedLayout } from "@/components/authenticated-layout";
import { DonationChart } from "@/components/donation-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { donationSpendingDetails } from "@/lib/donation-data";
import type { DonationCategory } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// A simple function to convert category name to a URL-friendly slug
const slugify = (text: string) => text.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-');

// A simple function to convert a slug back to the category name
const unslugify = (slug: string) => {
    const text = slug.replace(/-/g, ' ');
    // Capitalize each word, and handle 'And' for 'Sound & Audio' etc.
    return text.replace(/\b\w/g, l => l.toUpperCase()).replace(/And/g, '&');
};


export default function DonationCategoryPage({ params }: { params: { category: string }}) {
    const categoryName = unslugify(params.category) as DonationCategory;

    const validCategories = ["Venue & Hall Rental", "Sound & Audio Equipment", "Lighting & Staging", "Food & Catering", "Artist & Performer Fees"];

    if (!validCategories.includes(categoryName)) {
        notFound();
    }

    const chartData = donationSpendingDetails.map(item => ({
        eventLabel: `${item.event.name} (${item.event.location} - ${item.event.date})`,
        amount: item.spending[categoryName] || 0,
    }));
    
    return (
        <AuthenticatedLayout>
            <div className="container mx-auto max-w-4xl px-4 py-12">
                <div className="mb-4">
                    <Button asChild variant="outline">
                        <Link href="/donation/usage">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Donation Usage
                        </Link>
                    </Button>
                </div>
                
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline text-3xl">Spending for {categoryName}</CardTitle>
                        <CardDescription>This chart shows the amount spent on {categoryName.toLowerCase()} for each event.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DonationChart data={chartData} />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}

// Generate static paths for each category
export async function generateStaticParams() {
    const categories = ["Venue & Hall Rental", "Sound & Audio Equipment", "Lighting & Staging", "Food & Catering", "Artist & Performer Fees"];
    return categories.map(category => ({
        category: slugify(category),
    }));
}
