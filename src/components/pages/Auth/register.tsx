'use client'
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
import { Label } from "@/components/ui/label";

const registerSchema = z
  .object({
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
    companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
    address: z.string().min(5, { message: "Address must be at least 5 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    agree: z.boolean().refine(val => val, { message: "You must agree to the services." }),
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      address: "",
      email: "",
      password: "",
      agree: false,
    },
  });

  function onSubmit(values: RegisterFormValues) {
    // You can handle registration here
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-200 p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left: Register form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <Card className="w-full max-w-md mx-auto bg-transparent border-0">
            <CardContent className="p-0">
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Create Your Account</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">Full Name</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="John Doe" {...field} className="bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">Company Name</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Your Company" {...field} className="bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">Address</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="123 Main St, Anytown" {...field} className="bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} className="bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} className="bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="agree"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-3">
                          <FormControl>
                          <input
                            type="checkbox"
                            id="agree"
                            checked={field.value}
                            onChange={e => field.onChange(e.target.checked)}
                            className="w-5 h-5 accent-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                          />
                        </FormControl>
                        <Label htmlFor="agree" className="cursor-pointer select-none text-gray-600">
                          I agree to the <a href="#" className="underline text-blue-600 hover:text-blue-700">Terms of Service</a>
                        </Label>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full mt-4 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                    Create Account
                  </Button>
                  <div className="text-center mt-4 text-sm">
                    <span className="text-gray-500">Already have an account? </span>
                    <Link href="/login" className="text-blue-600 hover:underline hover:text-blue-700 transition-colors">Sign In</Link>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Right: Welcome content */}
        <div className="hidden md:flex flex-1 flex-col justify-center items-center p-10 text-white text-center bg-gradient-to-br from-blue-400 to-blue-600 rounded-r-3xl">
          <div className="max-w-sm">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">Join Our Community</h1>
            <p className="text-lg opacity-90 mb-8">
              Discover a new way to manage your projects and collaborate with your team.
            </p>
            <div className="flex justify-center gap-4">
              <img src="/window.svg" alt="Community" className="w-48 h-48" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
