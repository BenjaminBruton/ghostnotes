"use client";

import { useState } from "react";
import Link from "next/link";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/unsubscribe-newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message:
            data.message ||
            "You have been successfully unsubscribed from our newsletter.",
        });
        setEmail("");
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to unsubscribe. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Unsubscribe from Newsletter
        </h1>
        <p className="text-gray-300">
          We're sorry to see you go. Enter your email address below to
          unsubscribe from Ghost Notes updates.
        </p>
      </div>

      <div className="bg-primary-blue bg-opacity-10 p-8 rounded-lg border border-primary-blue">
        {submitStatus.type === "success" ? (
          <div className="text-center">
            <div className="mb-6 p-4 rounded-lg bg-green-900 bg-opacity-20 border border-green-700">
              <p className="text-green-400 text-lg">{submitStatus.message}</p>
            </div>
            <p className="text-gray-300 mb-6">
              You will no longer receive updates from us. If this was a mistake,
              you can resubscribe anytime on our homepage.
            </p>
            <Link
              href="/"
              className="inline-block bg-primary-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-all"
            >
              Return to Homepage
            </Link>
          </div>
        ) : (
          <form onSubmit={handleUnsubscribe} className="space-y-6">
            <div>
              <label
                htmlFor="unsubscribe-email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="unsubscribe-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                className="w-full px-4 py-3 bg-primary-black border border-primary-blue rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-red transition-colors"
              />
            </div>

            {submitStatus.type === "error" && (
              <div className="p-4 rounded-lg bg-red-900 bg-opacity-20 border border-red-700">
                <p className="text-red-400">{submitStatus.message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Unsubscribing..." : "Unsubscribe"}
            </button>

            <div className="text-center">
              <Link
                href="/"
                className="text-primary-blue hover:text-primary-red transition-colors text-sm"
              >
                ← Back to Homepage
              </Link>
            </div>
          </form>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-gray-400">
        <p>
          Having trouble unsubscribing? Contact us at{" "}
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@ghostnotes.com"}`}
            className="text-primary-red hover:underline"
          >
            {process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@ghostnotes.com"}
          </a>
        </p>
      </div>
    </div>
  );
}
