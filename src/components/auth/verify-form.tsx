
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyTwoFactor, type VerifyState } from "@/actions/auth";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending} variant="accent">
      {pending ? "Verifying..." : "Verify"}
    </Button>
  );
}

export function VerifyForm() {
  const initialState: VerifyState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(verifyTwoFactor, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message && state.errors) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Card className="w-full max-w-sm border-0 shadow-none sm:border sm:shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Two-Factor Authentication</CardTitle>
        <CardDescription>
          Enter the 6-digit code from your authenticator app.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              name="code"
              placeholder="123456"
              required
              maxLength={6}
            />
            {state?.errors?.code && <p className="text-sm font-medium text-destructive">{state.errors.code[0]}</p>}
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
