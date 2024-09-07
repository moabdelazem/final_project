import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>BookSnippet</CardTitle>
          <CardDescription>
            Your solution for everything related to books.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">
            Get started by logging in or creating a new account.
          </p>
          <div className="flex flex-col space-y-4">
            <Link href="/login" passHref>
              <Button className="w-full">Login</Button>
            </Link>
            <Link href="/register" passHref>
              <Button variant="outline" className="w-full">
                Register
              </Button>
            </Link>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-center text-gray-500">
          Secure, fast, and easy to use.
        </CardFooter>
      </Card>
    </div>
  );
}
