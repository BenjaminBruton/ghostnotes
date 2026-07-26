import Link from "next/link";

export default function Home() {
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
