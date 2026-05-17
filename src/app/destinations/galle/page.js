"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function GalleDetails() {
  return (
    <main className="min-h-screen bg-[#FDFCF7] text-[#2D2A22] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link href="/#destinations" className="inline-flex items-center gap-2 text-sm font-semibold text-[#C19A5B] hover:text-[#7C5E28] mb-6 transition-colors">
          ⬅ Back to Destinations
        </Link>

        <h1 className="text-3xl md:text-4xl font-serif font-black mb-4">Galle Dutch Fort</h1>
        <p className="text-[#C19A5B] text-xs font-bold uppercase tracking-widest mb-6">Colonial Charm Meets Golden Coastlines</p>
        
        {/* Main Cover Image */}
        <div className="relative w-full h-[45vh] rounded-2xl overflow-hidden mb-8 bg-[#1A1512] shadow-md">
          <Image src="/galle-cover.jpg" alt="Galle Dutch Fort" fill priority className="object-cover opacity-90" />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
        </div>

        {/* Description Text */}
        <div className="prose max-w-none text-[#666053] leading-relaxed mb-10 space-y-4 text-sm md:text-base">
          <p>
            {`Situated on the southwest coast, the Galle Dutch Fort is a magnificent living monument where centuries of colonial history merge perfectly with modern coastal vibes. Originally built by the Portuguese in the 16th century and heavily fortified by the Dutch, this UNESCO World Heritage fortified city stands strong against the crashing waves of the Indian Ocean.`}
          </p>
          <p>
            {`Walk along the ancient cobblestone streets lined with Dutch-colonial villas, vibrant boutique shops, cozy cafes, and historic churches. Don't miss the iconic Galle Lighthouse at sunset, offering dramatic views that highlight the southern coast's absolute beauty.`}
          </p>
        </div>

        {/* Gallery Grid */}
        <h3 className="font-serif font-bold text-xl mb-4 text-[#2D2A22]">Experience Galle</h3>
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="aspect-square rounded-xl overflow-hidden border border-[#EFECE3] relative bg-gray-100 shadow-xs">
            <Image src="/galle-1.jpg" alt="Galle View 1" fill sizes="(max-w-768px) 33vw, 25vw" className="object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden border border-[#EFECE3] relative bg-gray-100 shadow-xs">
            <Image src="/galle-2.jpg" alt="Galle View 2" fill sizes="(max-w-768px) 33vw, 25vw" className="object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden border border-[#EFECE3] relative bg-gray-100 shadow-xs">
            <Image src="/galle-3.jpg" alt="Galle View 3" fill sizes="(max-w-768px) 33vw, 25vw" className="object-cover hover:scale-105 transition-transform duration-300" />
          </div>
        </div>

        {/* Call To Action Box */}
        <div className="text-center bg-[#FAF6EC] p-8 rounded-2xl border border-[#EFECE3]">
          <h4 className="font-bold text-lg mb-2 text-[#2D2A22]">Want to Visit Galle Dutch Fort?</h4>
          <p className="text-xs text-[#666053] mb-5">Travel down the southern highway smoothly with our reliable and professional personal drivers.</p>
          <a href="https://wa.me/94777721144" target="_blank" rel="noopener noreferrer" className="bg-[#C19A5B] hover:bg-[#A37F43] text-white px-6 py-3 rounded-full text-xs font-bold inline-block tracking-wider transition-colors shadow-sm">
            💬 Book a Driver via WhatsApp
          </a>
        </div>

      </div>
    </main>
  );
}