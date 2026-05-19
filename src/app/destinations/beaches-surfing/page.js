"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function BeachesSurfingPage() {
  return (
    <main className="min-h-screen bg-[#FDFCF7] text-[#2D2A22] pb-20">
      <div className="relative w-full h-[50vh] bg-[#1A1512]">
        <Image src="/beaches-cover.jpg" alt="Golden Beaches & Surfing" fill priority className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-[#FDFCF7]" />
        <div className="absolute bottom-8 left-0 w-full px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="text-xs font-bold text-[#7C5E28] bg-[#FAF6EC] px-4 py-2 rounded-full inline-block mb-4 shadow-sm border border-[#EFECE3] hover:bg-[#C19A5B] hover:text-white transition-colors">
              ← Back to Home
            </Link>
            <h1 className="text-3xl md:text-5xl font-serif font-black text-[#2D2A22]">Golden Beaches & Surfing</h1>
            <p className="text-xs md:text-sm text-[#C19A5B] font-bold uppercase tracking-wider mt-1">Sun-kissed coasts and world-class waves</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-[#2D2A22]">About the Experience</h2>
          <p className="text-sm md:text-base text-[#666053] leading-relaxed">
            Discover the pristine southern and eastern coastlines of Sri Lanka. From the vibrant coral reefs of Hikkaduwa and whale watching in Mirissa to the thrilling world-class surf breaks of Arugam Bay, we provide custom transfers and multi-day coastal drives completely tailored to your holiday pace.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#EFECE3] shadow-sm h-fit">
          <h3 className="font-bold text-sm uppercase tracking-wider text-[#C19A5B] mb-2">Want to Visit?</h3>
          <p className="text-xs text-[#666053] mb-4">Book a safe private ride with our personal driver to explore these coastal locations seamlessly.</p>
          <a href="https://wa.me/94777721144" target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] text-white text-center font-bold py-3 rounded-xl text-xs block transition-transform hover:scale-105">
            💬 Book This Tour via WhatsApp
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-16">
        <h3 className="text-xl font-serif font-bold mb-6">Visual Journey</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { src: "/hikkaduwa-coral.jpg", title: "Hikkaduwa Corals" },
            { src: "/mirissa-whale.jpg", title: "Mirissa Coast" },
            { src: "/arugambay-surf.jpg", title: "Arugam Bay Surf" }
          ].map((item, index) => (
            <div key={index} className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100 shadow-sm border border-[#EFECE3] group">
              <Image src={item.src} alt={item.title} fill sizes="(max-w-768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <p className="text-white text-xs font-bold">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}