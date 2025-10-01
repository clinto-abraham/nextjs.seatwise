
"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
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
import { signup, type SignupState } from "@/actions/auth";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "../ui/separator";

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C44.902,35.122,48,29.69,48,24C48,22.659,47.862,21.35,47.611,20.083z"></path>
    </svg>
);

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending} variant="accent">
      {pending ? "Creating Account..." : "Create an account"}
    </Button>
  );
}

export function SignupForm() {
  const initialState: SignupState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(signup, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message && state.errors) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Card className="w-full max-w-sm border-0 shadow-none sm:border sm:shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Create an Account</CardTitle>
        <CardDescription>
          Join SeatWise Stays to start booking your next experience.
        </CardDescription>
      </CardHeader>
      <CardContent>
         <div className="grid gap-4">
            <Button variant="outline" className="w-full">
                <GoogleIcon />
                Sign up with Google
            </Button>
            
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                    </span>
                </div>
            </div>

            <form action={dispatch} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Max Robinson" required />
                {state?.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name[0]}</p>}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                />
                {state?.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" />
                {state?.errors?.password && <p className="text-sm font-medium text-destructive">{state.errors.password[0]}</p>}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" />
                {state?.errors?.confirmPassword && <p className="text-sm font-medium text-destructive">{state.errors.confirmPassword[0]}</p>}
            </div>

            <SubmitButton />

            </form>
         </div>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}




// "use client";

// import Link from "next/link";
// import { useFormState, useFormStatus } from "react-dom";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { signup, type SignupState } from "@/actions/auth";
// import { useEffect } from "react";
// import { useToast } from "@/hooks/use-toast";

// function SubmitButton() {
//   const { pending } = useFormStatus();
//   return (
//     <Button className="w-full" type="submit" disabled={pending} variant="accent">
//       {pending ? "Creating Account..." : "Create an account"}
//     </Button>
//   );
// }

// export function SignupForm() {
//   const initialState: SignupState = { message: "", errors: {} };
//   const [state, dispatch] = useFormState(signup, initialState);
//   const { toast } = useToast();

//   useEffect(() => {
//     if (state?.message && state.errors) {
//       toast({
//         variant: "destructive",
//         title: "Signup Failed",
//         description: state.message,
//       });
//     }
//   }, [state, toast]);

//   return (
//     <Card className="w-full max-w-sm border-0 shadow-none sm:border sm:shadow-lg">
//       <CardHeader>
//         <CardTitle className="font-headline text-3xl">Create an Account</CardTitle>
//         <CardDescription>
//           Enter your information to create an account
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form action={dispatch} className="grid gap-4">
//           <div className="grid gap-2">
//             <Label htmlFor="name">Name</Label>
//             <Input id="name" name="name" placeholder="Max Robinson" required />
//             {state?.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name[0]}</p>}
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="m@example.com"
//               required
//             />
//             {state?.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="password">Password</Label>
//             <Input id="password" name="password" type="password" />
//             {state?.errors?.password && <p className="text-sm font-medium text-destructive">{state.errors.password[0]}</p>}
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="confirmPassword">Confirm Password</Label>
//             <Input id="confirmPassword" name="confirmPassword" type="password" />
//             {state?.errors?.confirmPassword && <p className="text-sm font-medium text-destructive">{state.errors.confirmPassword[0]}</p>}
//           </div>

//           <SubmitButton />

//         </form>
//         <div className="mt-4 text-center text-sm">
//           Already have an account?{" "}
//           <Link href="/" className="underline">
//             Sign in
//           </Link>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
