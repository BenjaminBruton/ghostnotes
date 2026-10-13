"use client";

import { useState, useEffect } from "react";

const donationTiers = [
  {
    id: "tier_5",
    amount: 5,
    name: "Supporter",
    description: "Throw us a fiver just because you're interested in the project!",
    rewards: ["Eternal friendship, and a hug if we meet"],
  },
  {
    id: "tier_10",
    amount: 10,
    name: "Fan",
    description: "Good old fashioned DVD!",
    rewards: ["Good old fashioned DVD of the short film"],
  },
  {
    id: "tier_50",
    amount: 50,
    name: "True Fan",
    description: "T-Shirt with your choice of two movie poster designs + Good old fashioned DVD!",
    rewards: ["Exclusive Ghost Notes t-shirt", "Good old fashioned DVD"],
  },
  {
    id: "tier_100",
    amount: 100,
    name: "VIP",
    description: "Set Visit + T-Shirt + Good old fashioned DVD!",
    rewards: [
      "Shout out in the credits!",
      "Visit the set during production",
      "Exclusive Ghost Notes t-shirt",
      "A badass movie poster designed by David 'Grasshopper' Handy",
      "Good old fashioned DVD",
    ],
  },
  {
    id: "tier_500",
    amount: 500,
    name: "Executive Producer",
    description: "Credit + All Rewards",
    rewards: [
      "Executive Producer credit in the film",
      "Visit the set during production, hell you can be an extra if you want!",
      "Exclusive Ghost Notes t-shirt",
      "Good old fashioned DVD",
    ],
   },
   {
    id: "tier_1000",
    amount: 1000,
    name: "Absolute Legend",
    description: "All the rewards of other tiers + pretty much whatever",
    rewards: [
      "You can come hang out at the table read on 11/14/26",
      "Executive Producer credit in the film",
      "Visit the set during production, and you can be an extra, hell, I can maybe even sneak in a speaking role!",
      "Exclusive Ghost Notes t-shirt (you can get one of each)",
      "Good old fashioned DVD",
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
  
  // Funding tracker data
  const [currentFunding, setCurrentFunding] = useState(465); // Current funding amount
  const [isLoadingFunding, setIsLoadingFunding] = useState(true);
  const fundingGoals = [
    { amount: 2000, label: "Initial Goal", description: "Food, Gas, & Labor for Cast & Crew!" },
    { amount: 3000, label: "Stretch Goal 1", description: "For extra equipment - buying or renting!" },
    { amount: 4000, label: "Stretch Goal 2", description: "Cast & Crew bonuses, festival submission costs, and marketing!" },
  ];

  // Fetch current funding on component mount
  useEffect(() => {
    const fetchFunding = async () => {
      try {
        const response = await fetch("/api/funding");
        if (response.ok) {
          const data = await response.json();
          setCurrentFunding(data.totalFunding);
        }
      } catch (error) {
        console.error("Error fetching funding data:", error);
      } finally {
        setIsLoadingFunding(false);
      }
    };

    fetchFunding();
  }, []);

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

      {/* Blood Bag Funding Tracker */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Funding Progress
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {fundingGoals.map((goal, index) => {
            const previousGoal = index > 0 ? fundingGoals[index - 1].amount : 0;
            const progressInThisGoal = Math.max(0, Math.min(currentFunding - previousGoal, goal.amount - previousGoal));
            const goalRange = goal.amount - previousGoal;
            const percentFilled = goalRange > 0 ? (progressInThisGoal / goalRange) * 100 : 0;
            const isCompleted = currentFunding >= goal.amount;
            const isActive = currentFunding >= previousGoal && currentFunding < goal.amount;
            
            return (
              <div key={index} className="flex flex-col items-center">
                {/* Blood Bag Container */}
                <div className="relative w-40 h-56 mb-4">
                  {/* Blood Bag SVG */}
                  <svg
                    viewBox="0 0 160 224"
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <clipPath id={`bagClip${index}`}>
                        <path d="M 60 20 L 60 10 Q 60 5 65 5 L 95 5 Q 100 5 100 10 L 100 20 Q 100 25 105 30 L 105 200 Q 105 210 95 215 L 65 215 Q 55 210 55 200 L 55 30 Q 55 25 60 20 Z" />
                      </clipPath>
                      
                      <linearGradient id={`bloodGradient${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8B2E2E" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#5A1A1A" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                    
                    <path
                      d="M 60 20 L 60 10 Q 60 5 65 5 L 95 5 Q 100 5 100 10 L 100 20 Q 100 25 105 30 L 105 200 Q 105 210 95 215 L 65 215 Q 55 210 55 200 L 55 30 Q 55 25 60 20 Z"
                      fill="rgba(30, 58, 95, 0.2)"
                      stroke="#1e3a5f"
                      strokeWidth="2"
                    />
                    
                    <g clipPath={`url(#bagClip${index})`}>
                      <rect
                        x="55"
                        y={215 - (195 * percentFilled / 100)}
                        width="50"
                        height={195 * percentFilled / 100}
                        fill={`url(#bloodGradient${index})`}
                        className="transition-all duration-1000 ease-out"
                      />
                      {percentFilled > 0 && (
                        <ellipse
                          cx="75"
                          cy={215 - (195 * percentFilled / 100) + 10}
                          rx="15"
                          ry="5"
                          fill="rgba(255, 255, 255, 0.1)"
                        />
                      )}
                    </g>
                    
                    <rect x="77" y="0" width="6" height="10" fill="#1e3a5f" stroke="#8b2e2e" strokeWidth="1" />
                    <line x1="110" y1="70" x2="115" y2="70" stroke="#1e3a5f" strokeWidth="1" opacity="0.5" />
                    <line x1="110" y1="120" x2="115" y2="120" stroke="#1e3a5f" strokeWidth="1" opacity="0.5" />
                    <line x1="110" y1="170" x2="115" y2="170" stroke="#1e3a5f" strokeWidth="1" opacity="0.5" />
                  </svg>
                  
                  {isCompleted && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-green-500 rounded-full p-3 animate-pulse">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <h3 className={`text-lg font-bold mb-1 ${isCompleted ? 'text-green-400' : isActive ? 'text-primary-red' : 'text-gray-400'}`}>
                    {goal.label}
                  </h3>
                  <p className="text-2xl font-bold text-white mb-1">
                    ${goal.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400">{goal.description}</p>
                  {isActive && (
                    <p className="text-sm text-primary-red mt-2 font-semibold">
                      ${progressInThisGoal.toLocaleString()} raised
                    </p>
                  )}
                  {isCompleted && (
                    <p className="text-sm text-green-400 mt-2 font-semibold">
                      ✓ Completed!
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-3xl font-bold text-white mb-2">
            ${currentFunding.toLocaleString()} <span className="text-gray-400 text-xl">raised</span>
          </p>
          <div className="max-w-md mx-auto bg-primary-blue bg-opacity-20 rounded-full h-4 overflow-hidden border border-primary-blue">
            <div 
              className="h-full bg-gradient-to-r from-primary-red to-red-800 transition-all duration-1000 ease-out"
              style={{ width: `${Math.min((currentFunding / fundingGoals[fundingGoals.length - 1].amount) * 100, 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2">
            {((currentFunding / fundingGoals[fundingGoals.length - 1].amount) * 100).toFixed(1)}% of final goal
          </p>
        </div>
      </div>

      {/* Donation Tiers */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Choose Your Support Level
        </h2>
        <div className="bg-primary-red bg-opacity-20 border-2 border-primary-red rounded-lg p-4 mb-6 text-center">
          <p className="text-white font-semibold text-lg">
            🎬 <span className="text-primary-red">BONUS:</span> Every supporter from VIP and above will also receive a random signed prop from filming!
          </p>
        </div>
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

      {/* Designs Showcase */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Reward Designs
        </h2>
        <p className="text-center text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
          These are the designs available for the t-shirts and movie posters within the various funding tiers. Artwork by David 'Grasshopper' Handy (grassart82@gmail.com).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* T-Shirt Design */}
          <div className="bg-primary-blue bg-opacity-10 border border-primary-blue rounded-lg p-4 flex flex-col items-center">
            <div className="w-full aspect-[1326/2049] relative mb-3 bg-black/20 rounded-md overflow-hidden flex items-center justify-center">
              <img 
                src="/images/ghostnotesposter1.jpeg" 
                alt="Movie Poster Design one" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-gray-300 font-medium">Movie Poster Design One</span>
          </div>

          {/* Movie Poster Design */}
          <div className="bg-primary-blue bg-opacity-10 border border-primary-blue rounded-lg p-4 flex flex-col items-center">
            <div className="w-full aspect-[1326/2049] relative mb-3 bg-black/20 rounded-md overflow-hidden flex items-center justify-center">
              <img 
                src="/images/ghostnotesposter2.jpeg" 
                alt="Movie Poster Design two" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-gray-300 font-medium">Movie Poster Design Two</span>
          </div>
        </div>
      </div>

      {/* In-Kind Donation Section */}
      <div className="mb-16">
        <div className="bg-primary-blue bg-opacity-20 p-8 rounded-lg border-2 border-primary-blue">
          <h2 className="text-2xl font-bold text-white mb-4">
            In-Kind Donation: Meal Support
          </h2>
          <p className="text-gray-300 mb-6">
            Businesses and individuals can donate a full meal
            (breakfast, lunch, or dinner for cast and crew) and receive all rewards
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
              T-shirts and posters will be sent in time for Christmas ;). Good old fashioned DVD!s and credits will
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
              Your support goes directly toward compensation for our talented
              cast and crew. Anything beyond that will go to crafty and meals and productions costs like equipment rentals and purchases last.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
