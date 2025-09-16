export default function HeroSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-8 leading-tight">
          The most realistic voice AI platform
        </h1>
        <p className="text-lg lg:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          AI voice models and products powering millions of developers, creators, and enterprises. From 
          low-latency conversational agents to the leading AI voice generator for voiceovers and audiobooks.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 text-lg">
            SIGN UP
          </button>
          <button className="bg-gray-100 text-gray-800 px-8 py-3 rounded-full font-medium hover:bg-gray-200 text-lg">
            CONTACT SALES
          </button>
        </div>
      </div>
    </section>
  )
}
