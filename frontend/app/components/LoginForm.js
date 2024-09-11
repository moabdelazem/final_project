// app/components/LoginForm.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiCall } from "@/app/lib/api";
import { useAuth } from "@/app/contexts/AuthContext";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginForm() {
  // Initialize the username and password state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Get the toast function from the useToast hook
  const { toast } = useToast();
  // Get the login function from the AuthContext
  const { login } = useAuth();
  // Get the router object from the useRouter hook
  const router = useRouter();

  // Get the API URL from the environment variables
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Handle the form submission
  const handleSubmit = async (e) => {
    // Prevent the default form submission
    e.preventDefault();
    try {
      // Make a POST request to the login endpoint
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Ensure this matches LoginRequest
      });

      // If the response is not OK, throw an error
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      // Parse the JSON response
      const data = await response.json();

      // If the response contains an error, show a toast
      if (data.error) {
        // Show an error toast
        toast({
          title: "Error",
          description: "Invalid username or password.",
          variant: "destructive",
        });
        // If the response contains an access token, log in the user
      } else if (data.access_token) {
        // Call the login function from the AuthContext
        login(data.access_token);
        // Show a success toast
        toast({
          title: "Success",
          description: "You have been logged in successfully.",
        });
        // Redirect the user to the dashboard
        router.push("/dashboard");
      }
    } catch (error) {
      // Log the error to the console
      console.error("Error during login:", error);
      // Show an error toast
      toast({
        title: "Error",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
  };

  return (
    // Wrap the form in a motion.div to animate it
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center items-center"
    >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login Into Your Account</CardTitle>
          <CardDescription>
            Enter your email and password to log in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="Username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={() => router.push("/")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button type="submit">
                Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
