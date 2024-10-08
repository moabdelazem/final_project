"use client";

import { useState, useEffect } from "react";
import { router } from "next";
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

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Fetches the list of books from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of book objects.
 * Each book object has the following properties: id, title, author, status.
 * The status can be either "Checked Out" or "Available".
 * @throws {Error} If the API request fails.
 */
const fetchBooks = async () => {
  // Fetch Data from API
  const response = await fetch(`${API}/books`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // Handle API Faliure
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  // Parse The Response Into JSON
  const dataResponse = await response.json();

  // Map Through The Data And Return The Required Data
  return dataResponse.map((book) => {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      status: book.is_borrowed ? "Checked Out" : "Available",
    };
  });
};

/**
 * Adds a book to the API.
 * @param {Object} book - The book object to be added.
 * @returns {Promise<void>} - A promise that resolves when the book is successfully added.
 */
const addBook = async (book) => {
  try {
    // Fetch Data from API
    const response = await fetch(`${API}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Get Token From Local Storage
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(book),
    });

    // Handle API Failure
    if (!response.ok) {
      throw new Error("Failed to add book");
    }

    // Parse the response into JSON
    const addedBook = await response.json();

    return addedBook;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

// Update Book Status
/**
 * Updates the status of a book.
 *
 * @param {string} id - The ID of the book to update.
 * @param {string} newStatus - The new status of the book.
 * @returns {Promise<Object>} - A promise that resolves to the updated book object.
 * @throws {Error} - If there is an error updating the book status.
 */
const updateBookStatus = async (id, newStatus) => {
  try {
    // Fetch Data from API
    const response = await fetch(`${API}/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Get Token From Local Storage
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id: id, book_status: newStatus }),
    });

    // Handle API Failure
    if (!response.ok) {
      throw new Error("Failed to update book status");
    }

    // Parse the response into JSON
    const updatedBook = await response.json();

    return updatedBook;
  } catch (error) {
    console.error("Error updating book status:", error);
    throw error;
  }
};

// Fetch User Data
/**
 * Fetches user data from the API.
 * @returns {Promise<Object>} The user data object containing the name and role.
 * @throws {Error} If there is an error fetching the user data.
 */
const fetchUserData = async () => {
  try {
    // Fetch Data from API
    const response = await fetch(`${API}/users`, {
      method: "GET",
      headers: {
        // Get Token From Local Storage
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Handle API Failure
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    // Parse the response into JSON
    const dataResponse = await response.json();

    // Extract the required data from the response
    const userData = {
      name: dataResponse.username,
      role: dataResponse.is_admin ? "Admin" : "User",
    };

    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

/**
 * Handles the logout functionality.
 * Removes the token from the local storage and reloads the page.
 */
const logoutHandler = () => {
  localStorage.removeItem("token");
  location.reload();
};

/**
 * LibraryDashboard component represents the dashboard page of the library application.
 * It displays a list of books, allows adding new books, and updating book status.
 * The component also includes navigation tabs for different sections of the dashboard.
 *
 * @returns {JSX.Element} The rendered LibraryDashboard component.
 */
export default function LibraryDashboard() {
  // State Variables To Store Data
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);

  // Load books and user data on component mount
  useEffect(() => {
    loadBooks();
    loadUserData();
  }, []);

  /**
   * Fetches the list of books from the API and updates the state.
   * Sets the loading state to true while fetching the data.
   * @returns {Promise<void>} A promise that resolves when the books are successfully fetched.
   * @throws {Error} If there is an error fetching the books.
   * @async
   */
  const loadBooks = async () => {
    try {
      setLoading(true);
      const fetchedBooks = await fetchBooks();
      setBooks(fetchedBooks);
      setLoading(false);
    } catch (error) {
      console.error("Error loading books:", error);
      setLoading(false);
    }
  };

  /**
   * Loads user data asynchronously.
   * @returns {Promise<void>} A promise that resolves when the user data is loaded.
   * @throws {Error} If there is an error loading the user data.
   */
  const loadUserData = async () => {
    try {
      // Fetch User Data
      const userData = await fetchUserData();
      // Set User Data
      setUser(userData);
    } catch (error) {
      // Handle Error
      console.error("Error loading user data:", error);
    }
  };

  /**
   * Adds a new book to the API and updates the state with the added book.
   * @returns {Promise<void>} A promise that resolves when the book is successfully added.
   * @throws {Error} If there is an error adding the book.
   */
  const handleAddBook = async (e) => {
    // Prevent Default Form Submission
    e.preventDefault();
    try {
      // Add Book
      const addedBook = await addBook(newBook);
      // Update State
      setBooks([...books, addedBook]);
      // Reset Form
      setNewBook({ title: "", author: "" });
    } catch (error) {
      // Handle Error
      console.error("Error adding book:", error);
    }
  };

  /**
   * Updates the status of a book in the API and updates the state with the updated book.
   * @param {string} number - The ID of the book to update.
   * @param {boolean} currentStatus - The current status of the book.
   */
  const handleUpdateStatus = async (id, currentStatus) => {
    try {
      // Update Book Status
      const newStatus = currentStatus === true ? true : false;
      const updatedBook = await updateBookStatus(id, newStatus);
      // Set Updated Book Status
      setBooks(
        books.map((book) =>
          book.id === id ? { ...book, status: newStatus } : book
        )
      );
    } catch (error) {
      // Handle Error
      console.error("Error updating book status:", error);
    }
  };

  /**
   * Deletes a book from the API.
   *
   * @param {string} id - The ID of the book to delete.
   * @returns {Promise<string>} - The ID of the deleted book.
   * @throws {Error} - If the deletion fails.
   */
  const deleteBook = async (id) => {
    try {
      // Fetch Data from API
      const response = await fetch(`${API}/books/${id}`, {
        method: "DELETE",
        headers: {
          // Get Token From Local Storage
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Handle API Failure
      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      loadBooks();

      // Return the deleted book ID
      return id;
    } catch (error) {
      console.error("Error deleting book:", error);
      throw error;
    }
  };

  const UserManagement = () => {
    const fetchAllUsersData = async () => {
      try {
        const response = await fetch(`${API}/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const dataResponse = await response.json();

        setUsers(dataResponse);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    return (
      <div>
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
                  Loading Users...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No users found. Add some users to get started.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.title}</TableCell>
                  <TableCell>{user.author}</TableCell>
                  <TableCell>{user.status}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  };

  // Render Content Based On Active Tab
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
                        <TableCell className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(book.id, book.status)
                            }
                          >
                            <RefreshCwIcon className="mr-2 h-4 w-4" />
                            {book.status === "Available"
                              ? "Check Out"
                              : "Check In"}
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => deleteBook(book.id)}
                          >
                            <BookOpenIcon className="mr-2 h-4 w-4" />
                            Delete
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
        return (
          <div>
            <UserManagement />
          </div>
        );
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
            <h1 className="text-2xl font-semibold text-gray-800">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="h-8 w-8 rounded-full bg-gray-200" />
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
                      // Forwards the user to the login page
                      router.push("/login");
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
