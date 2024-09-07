"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookIcon,
  PlusIcon,
  RefreshCwIcon,
  UserIcon,
  LogOutIcon,
  SettingsIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  UsersIcon,
  BookOpenIcon,
  BarChartIcon,
  Router,
  AudioWaveformIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Simulated API calls
const fetchBooks = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const dataResponse = await response.json();

  return dataResponse.map((book) => {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      status: book.is_borrowed ? "Checked Out" : "Available",
    };
  });
};

const addBook = async (book) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(book),
  });
};

const updateBookStatus = async (id, newStatus) => {
  // In a real app, this would be an API call
  console.log("Updating book status:", id, newStatus);
  return { id, newStatus };
};

const fetchUserData = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const dataResponse = await response.json();

  return {
    name: dataResponse.username,
    role: dataResponse.is_admin ? "Admin" : "User",
  };
};

export default function LibraryDashboard() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    loadBooks();
    loadUserData();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    const fetchedBooks = await fetchBooks();
    setBooks(fetchedBooks);
    setLoading(false);
  };

  const loadUserData = async () => {
    const userData = await fetchUserData();
    setUser(userData);
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    const addedBook = await addBook(newBook);
    setBooks([...books, addedBook]);
    setNewBook({ title: "", author: "" });
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "Available" ? "Checked Out" : "Available";
    const updatedBook = await updateBookStatus(id, newStatus);
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, status: newStatus } : book
      )
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <div className="flex justify-between mb-4">
              <form onSubmit={handleAddBook} className="flex space-x-2">
                <Input
                  placeholder="Book Title"
                  value={newBook.title}
                  onChange={(e) =>
                    setNewBook({ ...newBook, title: e.target.value })
                  }
                  required
                />
                <Input
                  placeholder="Author"
                  value={newBook.author}
                  onChange={(e) =>
                    setNewBook({ ...newBook, author: e.target.value })
                  }
                  required
                />
                <Button type="submit">
                  <PlusIcon className="mr-2 h-4 w-4" /> Add Book
                </Button>
              </form>
              <div className="space-x-2">
                <Button variant="outline" onClick={loadBooks}>
                  <RefreshCwIcon className="mr-2 h-4 w-4" /> Sync Inventory
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        Loading books...
                      </TableCell>
                    </TableRow>
                  ) : books.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No books found. Add some books to get started.
                      </TableCell>
                    </TableRow>
                  ) : (
                    books.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.status}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(book.id, book.status)
                            }
                          >
                            <RefreshCwIcon className="mr-2 h-4 w-4" />
                            Toggle Status
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        );
      case "users":
        return <div>Users Management (placeholder)</div>;
      case "catalog":
        return <div>Book Catalog (placeholder)</div>;
      case "reports":
        return <div>Reports and Analytics (placeholder)</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">Booksnippet</h2>
        </div>
        <nav className="mt-4">
          <Button
            variant={activeTab === "dashboard" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("dashboard")}
          >
            <LayoutDashboardIcon className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant={activeTab === "users" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("users")}
          >
            <UsersIcon className="mr-2 h-4 w-4" />
            Users
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.name}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AudioWaveformIcon className="mr-2 h-4" />
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      localStorage.removeItem("token");
                      location.reload();
                    }}
                  >
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </CardTitle>
            </CardHeader>
            <CardContent>{renderContent()}</CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
