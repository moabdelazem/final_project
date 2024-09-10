// app/components/RegisterForm.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiCall } from "@/app/lib/api";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterForm() {
  // Initialize the username, email, password, and confirmPassword state
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Initialize the password strength state
  const [passwordStrength, setPasswordStrength] = useState(0);
  // Get the router object from the useRouter hook
  const router = useRouter();
  // Get the toast function from the useToast hook
  const { toast } = useToast();

  // Handle the form submission
  const handleInputChange = (event) => {
    setPassword(event.target.value);
    setPasswordStrength(calculatePasswordStrength(password));
  };

  // Get the API URL from the environment variables
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // Handle the form submission
  const handleSubmit = async (e) => {
    // Prevent the default form submission
    e.preventDefault();
    // Make a POST request to the register endpoint
    const response = await fetch(`${API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    // Parse the JSON response
    if (response.error) {
      // If the response contains an error, show a toast
      toast({
        title: "Error",
        description: response.error,
        variant: "destructive",
      });
    } else if (response.status === 200) {
      // If the response is successful, show a success toast
      toast({
        title: "Success",
        description: "User has been registered successfully.",
      });
      router.push("/dashboard"); // Redirect to the dashboard
    }
  };

  /**
   * Calculates the strength of a password based on certain criteria.
   *
   * @param {string} password - The password to calculate the strength for.
   * @returns {number} - The strength of the password as a number between 0 and 100.
   */
  const calculatePasswordStrength = (password) => {
    // Initialize the strength of the password
    let strength = 0;
    // Check the length of the password
    if (password.length >= 8) strength += 25;
    // Check if the password contains lowercase and uppercase letters
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    // Check if the password contains a number
    if (password.match(/\d/)) strength += 25;
    // Check if the password contains a special character
    if (password.match(/[^a-zA-Z\d]/)) strength += 25;
    return strength;
  };

  // Render the password strength component
  const renderPasswordStrength = () => {
    return (
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm">Password Strength</span>
          <span className="text-sm font-semibold">{passwordStrength}%</span>
        </div>
        <Progress value={passwordStrength} className="w-full h-2 bg-gray-200">
          <div
            className="h-full transition-all duration-500 ease-out rounded-full"
            style={{
              width: `${passwordStrength}%`,
              backgroundColor:
                passwordStrength < 50
                  ? "red"
                  : passwordStrength < 75
                  ? "orange"
                  : "green",
            }}
          />
        </Progress>
      </div>
    );
  };

  return (
    <motion.div
      className="w-full max-w-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="backdrop-blur-md bg-white/90 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create New Account..
          </CardTitle>
          <CardDescription>Start your journey with us.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
            {renderPasswordStrength()}
            <div className="space-y-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                id="confirmpassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button type="submit">
                Register
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
