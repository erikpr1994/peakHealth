import React from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">Welcome to Peak Health</h1>
        <p className="text-lg text-indigo-200 mb-8">
          Your ultimate companion for tracking workouts, monitoring progress,
          and achieving your fitness goals.
        </p>
        <Link
          href="/login"
          className="bg-white text-indigo-600 hover:bg-gray-100"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
