
"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignupState = {
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
};

export async function signup(
  prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const validatedFields = signupSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the fields.",
    };
  }

  // In a real app, you'd create a user in the database here.
  // For this demo, we'll just simulate a successful signup.

  const sessionData = {
    isLoggedIn: true,
    name: validatedFields.data.name,
    email: validatedFields.data.email
  }

  cookies().set("session", JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });

  redirect("/dashboard");
}


const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export type LoginState = {
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
  pending2FA?: boolean;
};


export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed.",
    };
  }

  // In a real app, you'd find a user by email and verify the password.
  // For this demo, any valid-looking login is accepted.
  const { email } = validatedFields.data;
  
  const sessionData = {
    isLoggedIn: false, // Not fully logged in yet
    pending2FA: true,
    name: 'Demo User', // Hardcoded for demo
    email: email
  }

  cookies().set("session", JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 5, // 5 minutes to complete 2FA
    path: "/",
  });

  return redirect("/login/verify");
}


const verifySchema = z.object({
  code: z.string().length(6, { message: "Code must be 6 digits." }),
});

export type VerifyState = {
  message?: string;
  errors?: {
    code?: string[];
  };
};

export async function verifyTwoFactor(prevState: VerifyState, formData: FormData): Promise<VerifyState> {
  const validatedFields = verifySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid code.",
    };
  }
  
  const sessionCookie = cookies().get("session");
  if (!sessionCookie) {
    return redirect("/");
  }

  const session = JSON.parse(sessionCookie.value);

  // In a real app, you would verify the TOTP code here.
  // For this demo, any 6-digit code is accepted.
  if (session.pending2FA) {
    const fullyLoggedInSession = {
      ...session,
      isLoggedIn: true,
      pending2FA: false,
    };

    cookies().set("session", JSON.stringify(fullyLoggedInSession), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
      path: "/",
    });

    return redirect("/dashboard");
  }

  return { message: "Verification failed. Please try logging in again." };
}


export async function logout() {
  cookies().delete("session");
  redirect("/");
}
