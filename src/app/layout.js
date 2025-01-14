"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "/Users/gelo/Desktop/SQ/apptracker/firebase"; // Adjust path if necessary
import "./globals.css"; // Import global styles
import Login from "@/components/login"; // Login component
import SignUp from "@/components/signup"; // Signup component

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(true); // Toggle login/signup view

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false after authentication state is resolved
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  if (loading) {
    return (
      <html lang="en">
        <body className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </body>
      </html>
    );
  }

  if (!user) {
    return (
      <html lang="en">
        <body className="min-h-screen flex items-center justify-center bg-slate-200">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            {showLogin ? (
              <>
                <h1 className="text-xl flex justify-center mb-5">Login</h1>
                <Login />
                <p className="text-sm mt-4 text-center">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setShowLogin(false)}
                    className="text-blue-500 underline"
                  >
                    Sign Up
                  </button>
                </p>
              </>
            ) : (
              <>
                <h1 className="text-xl flex justify-center mb-5">Register</h1>
                <SignUp />
                <p className="text-sm mt-4 text-center">
                  Already have an account?{" "}
                  <button
                    onClick={() => setShowLogin(true)}
                    className="text-blue-500 underline w-1/8"
                  >
                    Log In
                  </button>
                </p>
              </>
            )}
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">{children}</body>
    </html>
  );
}
