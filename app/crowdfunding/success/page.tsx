import Link from "next/link";

export default function Success() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-600 rounded-full mx-auto flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Thank You for Your Support!
        </h1>
        <div className="w-24 h-1 bg-primary-red mx-auto mb-6"></div>
      </div>

      <div className="bg-primary-blue bg-opacity-10 p-8 rounded-lg border border-primary-blue mb-8">
        <p className="text-xl text-gray-300 mb-6">
          Your contribution helps bring Ghost Notes to life. We're incredibly grateful
          for your support of independent filmmaking.
        </p>
        <p className="text-gray-400 mb-4">
          You'll receive a confirmation email shortly with details about your rewards.
        </p>
        <p className="text-gray-400">
          We'll keep you updated on the production progress and notify you when your
          rewards are ready!
        </p>
      </div>

      <div className="space-y-4">
        <Link
          href="/"
          className="inline-block bg-primary-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-all"
        >
          Return to Home
        </Link>
        <div>
          <Link
            href="/crowdfunding"
            className="text-primary-red hover:underline"
          >
            View all support tiers
          </Link>
        </div>
      </div>
    </div>
  );
}
