
"use client";

import { AuthenticatedLayout } from "@/components/authenticated-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { placeHolderImages } from "@/lib/placeholder-images";
import { MessageSquare, Heart, MessageCircle, Share2, Camera } from "lucide-react";
import Image from "next/image";

const mockPosts = [
    {
        id: 1,
        userName: "Jessica L.",
        userHandle: "@jess_lights",
        userAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a",
        time: "2024-07-21T14:30:00Z",
        content: "The Starlight Symphony Orchestra was absolutely magical! ✨ The open-air setting and the incredible music created an unforgettable night. Can't wait for the next one! #classicalmusic #underthestars",
        mediaUrl: placeHolderImages['event-concert'].imageUrl,
    },
    {
        id: 2,
        userName: "Mike P.",
        userHandle: "@tech_mike",
        userAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b",
        time: "2024-07-20T09:15:00Z",
        content: "So many great takeaways from the Innovate & Inspire Tech Summit. The speakers were phenomenal and I made some fantastic connections. Feeling energized and inspired! 🚀",
        mediaUrl: null,
    },
    {
        id: 3,
        userName: "Chris G.",
        userHandle: "@courtside_chris",
        userAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704c",
        time: "2024-07-18T22:00:00Z",
        content: "WHAT A GAME! The Titans vs. Knights final was everything I hoped for. The energy in the stadium was electric. That buzzer-beater will go down in history!",
        mediaUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1983&auto=format&fit=crop",
    }
]

export default function CommunityPage() {
    return (
        <AuthenticatedLayout>
            <div className="container mx-auto max-w-3xl px-4 py-12">
                 <div className="text-center mb-10">
                    <MessageSquare className="mx-auto h-12 w-12 text-primary" />
                    <h1 className="font-headline text-4xl font-bold mt-4">Community Forum</h1>
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                        Share your experiences, photos, and memorable moments from our events.
                    </p>
                </div>

                <Card className="mb-8 shadow-lg">
                    <CardContent className="p-4 flex gap-4 items-start">
                         <Avatar>
                            <AvatarImage src="https://i.pravatar.cc/150?u=me" />
                            <AvatarFallback>ME</AvatarFallback>
                        </Avatar>
                        <div className="w-full">
                            <Textarea placeholder="What was your favorite moment?" className="mb-2"/>
                            <div className="flex justify-between items-center">
                                <Button variant="ghost" size="icon">
                                    <Camera className="h-5 w-5 text-muted-foreground" />
                                </Button>
                                <Button>Post</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {mockPosts.map(post => (
                        <Card key={post.id} className="shadow-md">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                     <Avatar>
                                        <AvatarImage src={post.userAvatar} />
                                        <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="w-full">
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold">{post.userName}</p>
                                            <p className="text-sm text-muted-foreground">{post.userHandle}</p>
                                            <span className="text-sm text-muted-foreground">&middot;</span>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(post.time).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                                            </p>
                                        </div>
                                        <p className="mt-1 text-foreground/90">{post.content}</p>
                                        
                                        {post.mediaUrl && (
                                            <div className="mt-4 relative h-80 w-full rounded-xl overflow-hidden border">
                                                <Image src={post.mediaUrl} alt={`Post by ${post.userName}`} fill className="object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </div>
        </AuthenticatedLayout>
    )
}
