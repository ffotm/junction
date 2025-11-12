"use client"
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const resetSchema = z
  .object({
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type ResetFormValues = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: ResetFormValues) {
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#ffffff]">
      <div className="w-full max-w-4xl h-auto bg-white/10 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
        {/* Decorative SVGs and dots (reuse from login) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Top left wave */}
          <svg className="absolute top-0 left-0 w-1/2 h-40 opacity-60" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,80 Q100,20 200,80 T400,80 V100 H0 Z" fill="url(#wave1)" />
            <defs>
              <linearGradient id="wave1" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1e3a8a" />
                <stop offset="1" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          {/* Bottom right wave */}
          <svg className="absolute bottom-0 right-0 w-2/3 h-32 opacity-50" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 Q100,80 200,20 T400,20 V0 H0 Z" fill="url(#wave2)" />
            <defs>
              <linearGradient id="wave2" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#1e3a8a" />
              </linearGradient>
            </defs>
          </svg>
          {/* Decorative dots */}
          <svg className="absolute left-10 top-1/2 w-16 h-16 opacity-30" viewBox="0 0 64 64" fill="none">
            <circle cx="16" cy="16" r="4" fill="#3b82f6" />
            <circle cx="48" cy="32" r="3" fill="#1e3a8a" />
            <circle cx="32" cy="48" r="2" fill="#3b82f6" />
          </svg>
          {/* Abstract fish silhouette */}
          <svg className="absolute right-20 bottom-24 w-20 h-10 opacity-20" viewBox="0 0 80 40" fill="none">
            <ellipse cx="40" cy="20" rx="30" ry="10" fill="#1e3a8a" />
            <polygon points="70,20 80,10 80,30" fill="#3b82f6" />
          </svg>
        </div>
        {/* Left: Reset form (card) */}
        <div className="relative z-10 flex items-center justify-center min-w-[60%] bg-white/80 backdrop-blur-md p-8 md:p-12">
          <Card className="w-full max-w-lg md:max-w-xl shadow-lg rounded-2xl border-0">
            <CardContent className="py-10 px-8">
              <h3 className="text-2xl font-bold text-[#1e3a8a] mb-6 text-center">Reset your password</h3>
              {submitted ? (
                <div className="text-center text-green-700 font-medium py-8">
                  Your password has been reset.
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" autoComplete="new-password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" autoComplete="new-password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full mt-2 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white font-semibold text-lg rounded-lg shadow-md hover:from-[#3b82f6] hover:to-[#1e3a8a] transition-all duration-200">
                      Reset Password
                    </Button>
                    <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2 text-sm">
                      <Link href="/login" className="text-[#1e3a8a] hover:underline hover:text-[#3b82f6] transition-colors">Back to Login</Link>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Right: Info content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-end px-10 py-12 bg-gradient-to-br from-[#1e3a8a]/90 to-[#3b82f6]/80 text-white min-w-[35%] text-right">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">Set a New Password</h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-6">Choose a strong password</h2>
          <p className="text-lg mb-8 max-w-md opacity-90 ml-auto">
            Enter your new password below. Make sure it&apos;s strong and something you&apos;ll remember.
          </p>
          <div className="flex gap-3 mt-4 justify-end">
            <span className="inline-block w-3 h-3 rounded-full bg-white/80 animate-pulse" />
            <span className="inline-block w-2 h-2 rounded-full bg-white/60 animate-pulse delay-200" />
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse delay-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
