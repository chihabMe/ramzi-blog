"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter a valid email address");
      setIsSuccess(false);
      return;
    }

    setIsSubscribing(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const result = await response.json();

      setMessage(result.message);
      setIsSuccess(result.success);

      if (result.success) {
        setEmail("");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      setIsSuccess(false);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-xl mb-8 text-gray-300">
          Subscribe to get notified about new posts and updates.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-white border border-gray-300"
            disabled={isSubscribing}
            required
          />
          <button
            type="submit"
            className="bg-white text-gray-900 px-6 py-3 font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 border border-white"
            disabled={isSubscribing}
          >
            {isSubscribing ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 ${isSuccess ? "text-green-200" : "text-red-200"}`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
