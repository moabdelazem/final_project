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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();

  const API = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Ensure this matches LoginRequest
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      console.log(await data);

      if (data.error) {
        toast({
          title: "Error",
          description: "Invalid username or password.",
          variant: "destructive",
        });
      } else if (data.access_token) {
        login(data.access_token);
        toast({
          title: "Success",
          description: "You have been logged in successfully.",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast({
        title: "Error",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
  };

  return (
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
