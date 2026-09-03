"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/subscribe-newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message: "Thank you for subscribing! Check your email for confirmation.",
        });
        setEmail("");
        setName("");
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to subscribe. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Ghost Notes
        </h1>
        <div className="w-24 h-1 bg-primary-red mx-auto mb-6"></div>
        <p className="text-xl text-gray-300 italic">
          "The whole picture comes last. "
        </p>
      </div>

      {/* Log Line Section */}
      <section className="mb-16 bg-primary-blue bg-opacity-20 p-8 rounded-lg border border-primary-blue">
        <h2 className="text-2xl font-bold text-white mb-4">The Story</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          A police officer haunted by cryptic photographs of murdered men struggles to decipher their meaning, unaware the answers lie in a story unfolding somewhere else entirely.
        </p>
      </section>

      {/* About Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">About the Film</h2>
        <div className="space-y-4 text-gray-300">
          <p>
            <span className="font-semibold text-primary-red">Genre:</span> Crime
            Drama / Thriller
          </p>
          <p>
            <span className="font-semibold text-primary-red">Format:</span> Short
            Film (~30 minutes)
          </p>
          <p>
            <span className="font-semibold text-primary-red">Status:</span>{" "}
            Pre-Production
          </p>
          <p>
            <span className="font-semibold text-primary-red">
              Expected Production:
            </span>{" "}
            3rd & 4th Quarter - 2026 (Anticipated submission for 2027 Waco Indie Film Festival)
          </p>
        </div>
      </section>

      {/* Blog/Updates Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Latest Updates</h2>
        <div className="space-y-6">
          <article className="bg-primary-blue bg-opacity-10 p-6 rounded-lg border border-primary-blue hover:border-primary-red transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">
              Casting Call Now Open
            </h3>
            <p className="text-sm text-gray-400 mb-3">July 25, 2026</p>
            <p className="text-gray-300">
              Casting is officially open! We're
              looking for talented actors to bring this story to life. Check out
              the{" "}
              <Link href="/casting" className="text-primary-red hover:underline">
                casting page
              </Link>{" "}
              to submit your interest.
            </p>
          </article>
          
          <article className="bg-primary-blue bg-opacity-10 p-6 rounded-lg border border-primary-blue hover:border-primary-red transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">
              Script Development Complete
            </h3>
            <p className="text-sm text-gray-400 mb-3">July 15, 2026</p>
            <p className="text-gray-300">
              Two years in the making, we're proud to announce that the
              screenplay is finally complete. We can't wait to bring this story to the
              screen.
            </p>
          </article>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="mb-16 bg-primary-blue bg-opacity-10 p-8 rounded-lg border border-primary-blue">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Stay Updated
          </h2>
          <p className="text-gray-300 mb-6 text-center">
            Subscribe to our newsletter to receive the latest updates on production progress, casting announcements, and festival screenings.
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="newsletter-name" className="sr-only">
                  Name (Optional)
                </label>
                <input
                  type="text"
                  id="newsletter-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="w-full px-4 py-3 bg-primary-black border border-primary-blue rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-red transition-colors"
                />
              </div>
              <div>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email Address
                </label>
                <input
                  type="email"
                  id="newsletter-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full px-4 py-3 bg-primary-black border border-primary-blue rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-red transition-colors"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe to Updates"}
            </button>
            
            {submitStatus.type && (
              <div
                className={`p-4 rounded-lg text-center ${
                  submitStatus.type === "success"
                    ? "bg-green-900 bg-opacity-20 border border-green-700 text-green-400"
                    : "bg-red-900 bg-opacity-20 border border-red-700 text-red-400"
                }`}
              >
                {submitStatus.message}
              </div>
            )}
          </form>
          
          <p className="text-sm text-gray-400 text-center mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-primary-red bg-opacity-10 p-8 rounded-lg border border-primary-red">
        <h2 className="text-2xl font-bold text-white mb-4">Get Involved</h2>
        <p className="text-gray-300 mb-6">
          Interested in being part of this production? We're currently looking
          for cast members and crew!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/casting"
            className="inline-block bg-primary-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-all"
          >
            Apply for Casting
          </Link>
          <Link
            href="/crew"
            className="inline-block bg-primary-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-all"
          >
            Join the Crew
          </Link>
        </div>
      </section>
    </div>
  );
}
