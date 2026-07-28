"use client";

import { useState } from "react";

const donationTiers = [
  {
    id: "tier_10",
    amount: 10,
    name: "Supporter",
    description: "HD Download",
    rewards: ["HD download of the short film"],
  },
  {
    id: "tier_50",
    amount: 50,
    name: "Fan",
    description: "T-Shirt + HD Download",
    rewards: ["Exclusive Ghost Notes t-shirt", "HD download of the short film"],
  },
  {
    id: "tier_100",
    amount: 100,
    name: "VIP",
    description: "Set Visit + T-Shirt + HD Download",
    rewards: [
      "Visit the set during production",
      "Exclusive Ghost Notes t-shirt",
      "HD download of the short film",
    ],
  },
  {
    id: "tier_500",
    amount: 500,
    name: "Executive Producer",
    description: "Credit + All Rewards",
    rewards: [
      "Executive Producer credit in the film",
      "Visit the set during production",
      "Exclusive Ghost Notes t-shirt",
      "HD download of the short film",
    ],
  },
];

export default function Crowdfunding() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showInKindForm, setShowInKindForm] = useState(false);
  const [inKindFormData, setInKindFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    proposal: "",
  });
  const [inKindStatus, setInKindStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleDonation = async (tierId: string) => {
    setSelectedTier(tierId);
    // This will redirect to Stripe Checkout
    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tierId }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
      alert("There was an error processing your donation. Please try again.");
    }
  };

  const handleInKindSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInKindStatus("loading");

    try {
      const response = await fetch("/api/submit-inkind", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inKindFormData),
      });

      if (response.ok) {
        setInKindStatus("success");
        setInKindFormData({
          name: "",
          email: "",
          phone: "",
          organization: "",
          proposal: "",
        });
        setShowInKindForm(false);
      } else {
        setInKindStatus("error");
      }
    } catch (error) {
      setInKindStatus("error");
    }
  };

  const handleInKindChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInKindFormData({
      ...inKindFormData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Support Ghost Notes
        </h1>
        <div className="w-24 h-1 bg-primary-red mx-auto mb-6"></div>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Help us bring this story to life. Your support will fund production costs,
          equipment, and bring together the talented cast and crew needed to make
          Ghost Notes a reality.
        </p>
      </div>

      {/* Donation Tiers */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Choose Your Support Level
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {donationTiers.map((tier) => (
            <div
              key={tier.id}
              className="bg-primary-blue bg-opacity-10 p-6 rounded-lg border-2 border-primary-blue hover:border-primary-red transition-all flex flex-col"
            >
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold text-primary-red mb-2">
                  ${tier.amount}
                </div>
                <p className="text-gray-400 text-sm">{tier.description}</p>
              </div>

              <div className="flex-1 mb-6">
                <h4 className="text-sm font-semibold text-gray-300 mb-3">
                  Rewards:
                </h4>
                <ul className="space-y-2">
                  {tier.rewards.map((reward, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-start">
                      <span className="text-primary-red mr-2">✓</span>
                      <span>{reward}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleDonation(tier.id)}
                disabled={selectedTier === tier.id}
                className="w-full bg-primary-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-all disabled:opacity-50"
              >
                {selectedTier === tier.id ? "Processing..." : "Support Now"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* In-Kind Donation Section */}
      <div className="mb-16">
        <div className="bg-primary-blue bg-opacity-20 p-8 rounded-lg border-2 border-primary-blue">
          <h2 className="text-2xl font-bold text-white mb-4">
            In-Kind Donation: Meal Support
          </h2>
          <p className="text-gray-300 mb-6">
            Businesses and individuals can donate a full shooting day worth of meals
            (breakfast, lunch, and dinner for cast and crew) and receive all rewards
            from the <span className="text-primary-red font-semibold">$500+ Executive Producer tier</span>,
            including an Executive Producer credit in the film!
          </p>

          {!showInKindForm ? (
            <button
              onClick={() => setShowInKindForm(true)}
              className="bg-primary-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-all"
            >
              Submit Meal Donation Proposal
            </button>
          ) : (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Meal Donation Proposal Form
              </h3>

              {inKindStatus === "success" && (
                <div className="mb-6 bg-green-900 bg-opacity-30 border border-green-600 text-green-200 p-4 rounded-lg">
                  <p className="font-semibold">Thank you for your proposal!</p>
                  <p>We'll review it and get back to you within 3-5 business days.</p>
                </div>
              )}

              {inKindStatus === "error" && (
                <div className="mb-6 bg-red-900 bg-opacity-30 border border-red-600 text-red-200 p-4 rounded-lg">
                  <p className="font-semibold">Something went wrong.</p>
                  <p>Please try again or contact us directly.</p>
                </div>
              )}

              <form onSubmit={handleInKindSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={inKindFormData.name}
                    onChange={handleInKindChange}
                    className="w-full px-4 py-2 bg-primary-blue bg-opacity-20 border border-primary-blue rounded-lg text-white focus:outline-none focus:border-primary-red transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={inKindFormData.email}
                    onChange={handleInKindChange}
                    className="w-full px-4 py-2 bg-primary-blue bg-opacity-20 border border-primary-blue rounded-lg text-white focus:outline-none focus:border-primary-red transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={inKindFormData.phone}
                    onChange={handleInKindChange}
                    className="w-full px-4 py-2 bg-primary-blue bg-opacity-20 border border-primary-blue rounded-lg text-white focus:outline-none focus:border-primary-red transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-300 mb-2">
                    Business/Organization Name
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={inKindFormData.organization}
                    onChange={handleInKindChange}
                    className="w-full px-4 py-2 bg-primary-blue bg-opacity-20 border border-primary-blue rounded-lg text-white focus:outline-none focus:border-primary-red transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="proposal" className="block text-sm font-medium text-gray-300 mb-2">
                    Proposal Details *
                  </label>
                  <textarea
                    id="proposal"
                    name="proposal"
                    required
                    rows={6}
                    value={inKindFormData.proposal}
                    onChange={handleInKindChange}
                    placeholder="Please describe what you can provide for a shooting day (breakfast, lunch, dinner). Include menu details, dietary accommodations, delivery logistics, and any other relevant information."
                    className="w-full px-4 py-2 bg-primary-blue bg-opacity-20 border border-primary-blue rounded-lg text-white focus:outline-none focus:border-primary-red transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={inKindStatus === "loading"}
                    className="flex-1 bg-primary-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-all disabled:opacity-50"
                  >
                    {inKindStatus === "loading" ? "Submitting..." : "Submit Proposal"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowInKindForm(false)}
                    className="px-6 py-3 rounded-lg font-semibold border border-gray-600 text-gray-300 hover:border-gray-400 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* FAQ / Info */}
      <div className="bg-primary-blue bg-opacity-10 p-8 rounded-lg border border-primary-blue">
        <h2 className="text-2xl font-bold text-white mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 text-gray-300">
          <div>
            <h3 className="font-semibold text-white mb-2">
              When will I receive my rewards?
            </h3>
            <p className="text-sm">
              T-shirts will be sent after filming wraps. HD downloads and credits will
              be delivered upon film completion (estimated late 2026). Set visits will
              be coordinated during production.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">
              Is my donation tax-deductible?
            </h3>
            <p className="text-sm">
              Please consult with your tax advisor. This is a crowdfunding campaign for
              an independent film production.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">
              How will the funds be used?
            </h3>
            <p className="text-sm">
              Your support goes directly toward production costs including equipment
              rental, location fees, post-production, and compensation for our talented
              cast and crew.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
