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
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();
  const { toast } = useToast();

  const handleInputChange = (event) => {
    setPassword(event.target.value);
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const API = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    console.log(response);
    if (response.error) {
      toast({
        title: "Error",
        description: response.error,
        variant: "destructive",
      });
    } else if (response.status === 200) {
      toast({
        title: "Success",
        description: "User has been registered successfully.",
      });
      router.push("/dashboard"); // Modify the route to go to the dashboard
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/\d/)) strength += 25;
    if (password.match(/[^a-zA-Z\d]/)) strength += 25;
    return strength;
  };

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
