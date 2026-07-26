"use client";

import { useState } from "react";

export default function Casting() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    location: "",
    experience: "",
    role: "",
    availability: "",
    additionalInfo: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/submit-casting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          age: "",
          location: "",
          experience: "",
          role: "",
          availability: "",
          additionalInfo: "",
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Casting Submissions
        </h1>
        <div className="w-24 h-1 bg-primary-red mx-auto mb-6"></div>
        <p className="text-lg text-gray-300">
          Interested in auditioning for "Ghost Notes"? Fill out the form below
          to express your interest.
        </p>
      </div>

      {/* Audition Prerequisites */}
      <div className="mb-8 p-6 bg-primary-red bg-opacity-10 border-2 border-primary-red rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
          <span className="text-primary-red mr-2">⚠️</span>
          Audition Requirements
        </h2>
        <p className="text-gray-300 mb-4">
          If selected for an audition, you must be prepared with the following:
        </p>
        <ul className="space-y-3 text-gray-200">
          <li className="flex items-start">
            <span className="text-primary-red mr-3 text-xl">•</span>
            <span>
              <strong className="text-white">Headshot & Costume Photos:</strong> Provide one professional headshot and 3 pictures in costume
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-red mr-3 text-xl">•</span>
            <span>
              <strong className="text-white">Prepared Monologue:</strong> Perform a prepared monologue (1-2 minutes)
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-red mr-3 text-xl">•</span>
            <span>
              <strong className="text-white">Script Reading:</strong> Be prepared to read with another actor from our script
            </span>
          </li>
        </ul>
      </div>

      {status === "success" && (
        <div className="mb-8 bg-green-900 bg-opacity-30 border border-green-600 text-green-200 p-4 rounded-lg">
          <p className="font-semibold">Thank you for your submission!</p>
          <p>We'll review your information and get back to you soon.</p>
        </div>
      )}

      {status === "error" && (
        <div className="mb-8 bg-red-900 bg-opacity-30 border border-red-600 text-red-200 p-4 rounded-lg">
          <p className="font-semibold">Something went wrong.</p>
          <p>Please try again or contact us directly.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-primary-blue bg-opacity-20 border border-primary-blue rounded-lg text-white focus:outline-none focus:border-primary-red transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-primary-blue bg-opacity-20 border border-primary-blue rounded-lg text-white focus:outline-none focus:border-primary-red transition-colors"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-primary-blue bg-opacity-20 border border-primary-blue rounded-lg text-white focus:outline-none focus:border-primary-red transition-colors"
          />
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">
            Age *
          </label>
          <input
            type="number"
            id="age"
            name="age"
            required
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-primary-blue bg-opacity-20 border border-primary-blue rounded-lg text-white focus:outline-none focus:border-primary-red transition-colors"
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
            Location (City, State) *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-primary-blue bg-opacity-20 border border-primary-blue rounded-lg text-white focus:outline-none focus:border-primary-red transition-colors"
          />
        </div>

        {/* Role Interest */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
            Role Interest *
          </label>
          <select
            id="role"
            name="role"
            required
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-primary-blue bg-opacity-20 border border-primary-blue rounded-lg text-white focus:outline-none focus:border-primary-red transition-colors"
          >
            <option value="">Select a role</option>
            <option value="lead">Lead Role</option>
            <option value="supporting">Supporting Role</option>
            <option value="extra">Extra/Background</option>
            <option value="any">Any Available Role</option>
          </select>
        </div>

        {/* Experience */}
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
            Acting Experience *
          </label>
          <textarea
            id="experience"
            name="experience"
            required
            rows={4}
            value={formData.experience}
            onChange={handleChange}
            placeholder="Tell us about your acting background, training, and any previous work..."
            className="w-full px-4 py-2 bg-primary-blue bg-opacity-20 border border-primary-blue rounded-lg text-white focus:outline-none focus:border-primary-red transition-colors resize-none"
          />
        </div>

        {/* Availability */}
        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-gray-300 mb-2">
            Availability *
          </label>
          <input
            type="text"
            id="availability"
            name="availability"
            required
            value={formData.availability}
            onChange={handleChange}
            placeholder="e.g., Weekends, flexible, specific dates..."
            className="w-full px-4 py-2 bg-primary-blue bg-opacity-20 border border-primary-blue rounded-lg text-white focus:outline-none focus:border-primary-red transition-colors"
          />
        </div>

        {/* Additional Info */}
        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-300 mb-2">
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            rows={4}
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Any other information you'd like to share (links to reels, social media, etc.)..."
            className="w-full px-4 py-2 bg-primary-blue bg-opacity-20 border border-primary-blue rounded-lg text-white focus:outline-none focus:border-primary-red transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-primary-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>

      <div className="mt-8 p-6 bg-primary-blue bg-opacity-10 border border-primary-blue rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">
          What to Expect
        </h3>
        <ul className="text-gray-300 space-y-2">
          <li>• We'll review all submissions within 1-2 weeks</li>
          <li>• Selected candidates will be contacted for auditions</li>
          <li>• Please ensure your contact information is accurate</li>
          <li>• Feel free to include links to your acting reel or portfolio</li>
        </ul>
      </div>
    </div>
  );
}
