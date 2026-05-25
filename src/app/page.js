"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  // Mobile nav state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({ success: null, message: "" });

  // Form submit handler for Web3Forms
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult({ success: null, message: "" });

    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitResult({
          success: true,
          message: "Thank you! Your message has been sent successfully. We will get back to you soon."
        });
        e.target.reset();
      } else {
        setSubmitResult({
          success: false,
          message: data.message || "Something went wrong. Please try again."
        });
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "Network error. Please check your connection and try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // The 7 Experience Categories matching folder structure
  const experiences = [
    {
      id: 1,
      title: "Golden Beaches & Surfing",
      tagline: "Sun-kissed coasts and world-class waves",
      coverImage: "/beaches-cover.jpg",
      slug: "beaches-surfing"
    },
    {
      id: 2,
      title: "Cultural & Historical Heritage",
      tagline: "Journey through 2500+ years of ancient majesty",
      coverImage: "/culture-cover.jpg",
      slug: "culture-heritage"
    },
    {
      id: 3,
      title: "Wildlife Safari & Nature",
      tagline: "Meet the giants of the wild in their natural habitat",
      coverImage: "/wildlife-cover.jpg",
      slug: "wildlife-nature"
    },
    {
      id: 4,
      title: "Misty Mountains & Tea Plantations",
      tagline: "Breathtaking viewpoints, waterfalls, and lush tea trails",
      coverImage: "/mountains-cover.jpg",
      slug: "mountains-tea"
    },
    {
      id: 5,
      title: "Authentic Sri Lankan Food Experiences",
      tagline: "Taste the rich spices and traditional flavors of paradise",
      coverImage: "/food-cover.jpg",
      slug: "food-experiences"
    },
    {
      id: 6,
      title: "Adventure & Wellness",
      tagline: "Thrilling hikes meets peaceful Ayurveda rejuvenation",
      coverImage: "/adventure-cover.jpg",
      slug: "adventure-wellness"
    },
    {
      id: 7,
      title: "Nightlife & Beach Parties",
      tagline: "Dance under the stars at the best coastal hotspots",
      coverImage: "/nightlife-cover.jpg",
      slug: "nightlife-parties"
    }
  ];

  // Honey Land Tours Guests Gallery Data (Updated to .jpeg match files)
  const honeyGallery = [
    { id: 1, src: "/honey-gallery/tourist-1.jpeg", alt: "Tourists enjoying the safari with Honey Land" },
    { id: 2, src: "/honey-gallery/tourist-2.jpeg", alt: "Beautiful moments exploring ancient majesty" },
    { id: 3, src: "/honey-gallery/tourist-3.jpeg", alt: "Happy clients exploring Sri Lanka waterfalls" },
    { id: 4, src: "/honey-gallery/tourist-4.jpeg", alt: "Honey Land Tours guest memories" },
    { id: 5, src: "/honey-gallery/tourist-5.jpeg", alt: "Exploring cultural heritage sites" },
    { id: 6, src: "/honey-gallery/tourist-6.jpeg", alt: "Wonderful group tour experience" },
    { id: 7, src: "/honey-gallery/tourist-7.jpeg", alt: "Scenic view with our beautiful guests" },
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      country: "United Kingdom",
      title: "An Unforgettable Multi-Day Journey!",
      text: "Booking Honeyland Tours was the best decision we made for our Sri Lanka trip. Our personal driver was incredibly professional, safe, and knew all the hidden gems around Sigiriya and Kandy. Highly recommended!",
      date: "May 2026",
      link: "https://www.tripadvisor.co.uk/AttractionProductReview-g1500185-d20274850-A_Multi_Day_Tour_Around_Sri_Lanka_with_Our_Personal_Driver-Katunayake_Negombo_Wes.html"
    },
    {
      id: 2,
      name: "David & Emma",
      country: "Germany",
      title: "Super Safe and Reliable Driver",
      text: "Excellent private chauffeur service starting from Naula. The air-conditioned van was spotless, and the driver spoke perfect English. We felt like family throughout the entire island tour.",
      date: "April 2026",
      link: "https://www.tripadvisor.co.uk/Attraction_Review-g297897-d20133876-Reviews-Sri_lanka_personal_driver-Negombo_Western_Province.html"
    },
    {
      id: 3,
      name: "James L.",
      country: "Australia",
      title: "Perfect Private Tour Guide",
      text: "The absolute best way to see Sri Lanka. Customized itinerary, flexible stops for photography, and excellent recommendations for local food. 5 stars all the way!",
      date: "March 2026",
      link: "https://www.tripadvisor.co.uk/Attraction_Review-g297897-d20133876-Reviews-Sri_lanka_personal_driver-Negombo_Western_Province.html"
    },
    {
      id: 4,
      name: "Elena R.",
      country: "Italy",
      title: "Best Chauffeur Experience in Sri Lanka",
      text: "We spent 7 days traveling around the cultural triangle and coast. The driving was extremely smooth and safe, which is rare in Sri Lanka. Very punctual and honest service.",
      date: "February 2026",
      link: "https://www.tripadvisor.co.uk/Attraction_Review-g297897-d20133876-Reviews-Sri_lanka_personal_driver-Negombo_Western_Province.html"
    },
    {
      id: 5,
      name: "Mark & Chloe",
      country: "Netherlands",
      title: "Highly Recommend Honeyland!",
      text: "From airport pickup to drop-off, everything was flawless. Incredible local knowledge, great recommendations for safari, and always had a warm smile. Thank you for making our holiday special!",
      date: "January 2026",
      link: "https://www.tripadvisor.co.uk/Attraction_Review-g297897-d20133876-Reviews-Sri_lanka_personal_driver-Negombo_Western_Province.html"
    },
    {
      id: 6,
      name: "Charlotte K.",
      country: "France",
      title: "Outstanding Service and Hospitality",
      text: "Wonderful experience exploring the historic sites. Our chauffeur was punctual, deeply knowledgeable about Sri Lankan history, and drove with extreme care. The best private travel service on the island!",
      date: "December 2025",
      link: "https://www.tripadvisor.co.uk/Attraction_Review-g297897-d20133876-Reviews-Sri_lanka_personal_driver-Negombo_Western_Province.html"
    }
  ];

  return (
    <main className="min-h-screen bg-[#FDFCF7] text-[#2D2A22] relative scroll-smooth">
      
      {/* Floating Sticky WhatsApp Widget */}
      <a
        href="https://wa.me/94777721144"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-[#25D366] hover:bg-[#20BA56] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-all transform hover:scale-110 font-semibold"
      >
        <span>💬 Chat With Us</span>
      </a>

      {/* Hero Section */}
      <div id="home" className="relative w-full min-h-[85vh] flex flex-col justify-between overflow-hidden bg-[#1A1512]">
        <Image
          src="/sigiriya.jpg" 
          alt="Honeyland Tours Background"
          fill
          priority
          className="object-cover opacity-60 z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-[#FDFCF7] z-10" />

        {/* Navigation Bar */}
        <nav className="relative z-40 w-full py-5 px-6 bg-black/30 backdrop-blur-md border-b border-white/10">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="font-serif font-black text-2xl tracking-wide text-white">
              HONEYLAND <span className="text-[#F3D798]">TOURS</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 text-sm font-semibold text-white">
              <a href="#home" className="hover:text-[#F3D798]">Home</a>
              <a href="#destinations" className="hover:text-[#F3D798]">Experiences</a>
              <a href="#gallery" className="hover:text-[#F3D798]">Gallery</a>
              <a href="#reviews" className="hover:text-[#F3D798]">Reviews</a>
              <a href="#contact-section" className="hover:text-[#F3D798]">Contact</a>
            </div>

            <div className="hidden md:block">
              <a
                href="https://wa.me/94777721144"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C19A5B] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
              >
                Book a Driver
              </a>
            </div>

            {/* Hamburger Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white focus:outline-none p-1"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-[#1A1512]/95 backdrop-blur-lg border-b border-white/10 py-6 px-6 flex flex-col gap-4">
              <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-[#F3D798] text-base font-semibold">Home</a>
              <a href="#destinations" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-[#F3D798] text-base font-semibold">Experiences</a>
              <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-[#F3D798] text-base font-semibold">Gallery</a>
              <a href="#reviews" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-[#F3D798] text-base font-semibold">Reviews</a>
              <a href="#contact-section" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-[#F3D798] text-base font-semibold">Contact</a>
              <a
                href="https://wa.me/94777721144"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C19A5B] text-white px-5 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-center mt-2"
              >
                Book a Driver
              </a>
            </div>
          )}
        </nav>

        {/* Hero Title */}
        <div className="max-w-4xl mx-auto px-6 text-center relative z-20 my-auto py-20">
          <div className="inline-flex items-center gap-1.5 bg-black/40 border border-white/20 px-4 py-1.5 rounded-full text-[#F3D798] text-xs font-bold tracking-widest uppercase mb-6">
            ⭐ Premium Private Chauffeur Services
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-black mb-4 text-white drop-shadow-md">
            Your Trusted <span className="text-[#F3D798]">Sri Lanka Personal Drivers</span>
          </h1>
          <p className="text-md md:text-xl text-[#F7F5F0] mb-6 max-w-xl mx-auto">
            Discover paradise through the eyes of trusted local experts. Tailored island-wide private tours starting from Naula.
          </p>
          <a href="#destinations" className="bg-[#C19A5B] text-white font-bold px-6 py-3 rounded-full inline-block">
            Explore Experiences ➔
          </a>
        </div>
      </div>

      {/* Experiences Cards Section */}
      <div id="destinations" className="max-w-6xl mx-auto py-20 px-6 scroll-mt-10">
        <div className="text-center mb-12">
          <span className="text-[#C19A5B] text-xs font-bold uppercase tracking-widest block mb-2">Beautiful Pearl of the Indian Ocean</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D2A22]">Select Your Travel Style</h2>
          <div className="w-12 h-0.5 bg-[#C19A5B] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="bg-white rounded-2xl overflow-hidden border border-[#EFECE3] shadow-sm flex flex-col justify-between p-3">
              <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100">
                <Image 
                  src={exp.coverImage} 
                  alt={exp.title} 
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover" 
                />
              </div>
              <div className="pt-4 pb-2 px-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-[#2D2A22] mb-1">{exp.title}</h3>
                  <p className="text-[10px] text-[#C19A5B] font-bold uppercase tracking-wide mb-4">{exp.tagline}</p>
                </div>
                
                <Link 
                  href={`/destinations/${exp.slug}`}
                  className="w-full bg-[#FAF6EC] hover:bg-[#C19A5B] text-[#7C5E28] hover:text-white font-bold py-2.5 rounded-xl text-xs transition-colors border border-[#EFECE3] block text-center cursor-pointer"
                >
                  👁️ View Details & Gallery
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Honey Land Tours Guests Gallery */}
      <div id="gallery" className="max-w-6xl mx-auto py-16 px-6 scroll-mt-20 border-t border-[#EFECE3]">
        <div className="text-center mb-12">
          <span className="text-[#C19A5B] text-xs font-bold uppercase tracking-widest block mb-2">Memories With Our Guests</span>
          <h2 className="text-3xl font-serif font-bold text-[#2D2A22] mb-2">Honey Land Tours Gallery</h2>
          <div className="w-12 h-0.5 bg-[#C19A5B] mx-auto mb-4"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {honeyGallery.map((photo) => (
            <div 
              key={photo.id} 
              className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md border border-[#EFECE3] transition-all duration-300 bg-white p-1.5"
            >
              <div className="relative h-56 w-full overflow-hidden rounded-xl bg-gray-100">
                <Image 
                  src={photo.src} 
                  alt={photo.alt}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div id="reviews" className="max-w-6xl mx-auto py-16 px-6 scroll-mt-20 border-t border-[#EFECE3]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-[#2D2A22] mb-2">What Travelers Say On TripAdvisor</h2>
          <div className="w-12 h-0.5 bg-[#C19A5B] mx-auto mb-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-2xl border border-[#EFECE3] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="text-[#00AFEF] text-xs font-bold mb-2">⭐⭐⭐⭐• 5.0 Excellent</div>
                <h4 className="font-bold text-sm text-[#2D2A22] mb-1">{"\""}{review.title}{"\""}</h4>
                <p className="text-xs md:text-sm text-[#666053] italic leading-relaxed mb-4">{"\""}{review.text}{"\""}</p>
              </div>
              <div className="pt-3 border-t border-[#F4F1EA] flex justify-between items-center">
                <div>
                  <h5 className="font-bold text-xs text-[#2D2A22]">{review.name}</h5>
                  <p className="text-[11px] text-[#A19B8E]">{review.country} • {review.date}</p>
                </div>
                <a href={review.link} target="_blank" rel="noopener noreferrer" className="text-xs text-[#C19A5B] font-bold">🔗</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact-section" className="max-w-3xl mx-auto py-16 px-6 scroll-mt-20 border-t border-[#EFECE3]">
        <div className="text-center mb-10">
          <span className="text-[#C19A5B] text-xs font-bold uppercase tracking-widest block mb-2">Plan Your Dream Trip</span>
          <h2 className="text-3xl font-serif font-bold text-[#2D2A22]">Get In Touch With Us</h2>
          <div className="w-12 h-0.5 bg-[#C19A5B] mx-auto mt-4"></div>
        </div>

        <form onSubmit={handleFormSubmit} className="bg-white p-8 rounded-2xl border border-[#EFECE3] shadow-sm space-y-6">
          {/* Web3Forms Access Key Fixed with Quotes */}
          <input type="hidden" name="access_key" value="67510ec7-134c-492e-ae15-ea392d118b75" />
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
          
          {/* Web3Forms Routing: Emails will be routed directly to Mama's email */}
          <input type="hidden" name="to_email" value="mama@email.com" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-[#2D2A22] mb-2">Your Name</label>
              <input 
                type="text" 
                name="name" 
                required 
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-[#EFECE3] bg-[#FAF6EC]/30 text-sm focus:outline-none focus:border-[#C19A5B] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#2D2A22] mb-2">Email Address</label>
              <input 
                type="email" 
                name="email" 
                required 
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl border border-[#EFECE3] bg-[#FAF6EC]/30 text-sm focus:outline-none focus:border-[#C19A5B] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#2D2A22] mb-2">Subject / Tour Plan</label>
            <input 
              type="text" 
              name="subject" 
              required 
              placeholder="Booking request for 5 days multi-day tour"
              className="w-full px-4 py-3 rounded-xl border border-[#EFECE3] bg-[#FAF6EC]/30 text-sm focus:outline-none focus:border-[#C19A5B] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#2D2A22] mb-2">Your Message</label>
            <textarea 
              name="message" 
              required 
              rows="4"
              placeholder="Tell us your travel dates, number of passengers, and places you want to visit..."
              className="w-full px-4 py-3 rounded-xl border border-[#EFECE3] bg-[#FAF6EC]/30 text-sm focus:outline-none focus:border-[#C19A5B] transition-colors resize-none"
            ></textarea>
          </div>

          {submitResult.success !== null && (
            <div className={`p-4 rounded-xl text-sm font-semibold ${submitResult.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {submitResult.message}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#C19A5B] hover:bg-[#A88144] disabled:bg-gray-400 text-white font-bold py-3.5 rounded-xl text-sm transition-colors uppercase tracking-wider shadow-sm"
          >
            {isSubmitting ? "Sending Message..." : "Send Message ➔"}
          </button>
        </form>
      </div>

      {/* Footer Section */}
      <footer id="contact" className="bg-[#1A1813] text-[#FDFCF7] py-12 border-t border-[#ECECE3]/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* COLUMN 1: About */}
          <div>
            <h3 className="text-[#C19A5B] font-bold text-lg mb-4 tracking-wider">HONEYLAND TOURS</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Trusted private chauffeur drives based in{" "}
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#C19A5B] hover:underline inline-flex items-center gap-1"
              >
                Naula, Sri Lanka.
              </a>
            </p>
          </div>

          {/* COLUMN 2: Contact Info */}
          <div>
            <h3 className="text-[#C19A5B] font-bold text-lg mb-4 tracking-wider">CONTACT INFO</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <a href="tel:+94777721144" className="flex items-center gap-3 hover:text-[#C19A5B] transition-colors group">
                <svg className="w-4 h-4 text-[#C19A5B] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.72l.54 2.22a1 1 0 01-.25.96l-2.03 2.03a13.109 13.109 0 005.74 5.74l2.03-2.03a1 1 0 01.96-.25l2.22.54a1 1 0 01.72.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+94 77 772 1144</span>
              </a>
              
              <a href="mailto:honeylandtours@gmail.com" className="flex items-center gap-3 hover:text-[#C19A5B] transition-colors group">
                <svg className="w-4 h-4 text-[#C19A5B] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>honeylandtours@gmail.com</span>
              </a>
            </div>
          </div>

          {/* COLUMN 3: Socials */}
          <div>
            <h3 className="text-[#C19A5B] font-bold text-lg mb-4 tracking-wider">CONNECT WITH US</h3>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3b5998] transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>

              <a href="https://wa.me/94777721144" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#25D366] transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.93 0c3.165.001 6.14 1.233 8.377 3.473 2.235 2.24 3.461 5.218 3.459 8.385-.004 6.582-5.34 11.93-11.873 11.93-2.01 0-3.987-.511-5.742-1.486L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.435.002 9.851-4.413 9.854-9.849.002-2.634-1.023-5.11-2.883-6.972C16.476 1.822 14.004 .799 11.373.799c-5.439 0-9.855 4.415-9.858 9.853-.001 1.637.436 3.232 1.266 4.636l-.993 3.626 3.714-.974zm13.315-7.417c-.314-.157-1.859-.918-2.146-1.022-.288-.105-.497-.157-.707.157-.21.314-.813 1.022-.996 1.231-.183.209-.367.236-.681.079-.314-.157-1.327-.489-2.528-1.562-.933-.832-1.564-1.86-1.747-2.174-.183-.314-.02-.484.137-.641.142-.141.314-.367.472-.55.157-.183.21-.314.314-.524.105-.21.052-.393-.026-.55-.079-.157-.707-1.702-.969-2.33-.255-.614-.514-.532-.707-.541-.183-.01-.393-.01-.602-.01s-.55.079-.838.393c-.288.314-1.1 1.074-1.1 2.619s1.126 3.038 1.283 3.247c.157.079 2.215 3.382 5.367 4.743.75.324 1.335.518 1.792.663.754.24 1.441.206 1.984.125.605-.09 1.859-.759 2.121-1.454.262-.695.262-1.293.183-1.414-.079-.122-.288-.194-.602-.351z"/>
                </svg>
              </a>
              
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#e1306c] transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>

              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-black transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>

              <a 
                href="https://www.tripadvisor.co.uk/Attraction_Review-g297897-d20133876-Reviews-Sri_lanka_personal_driver-Negombo_Western_Province.html" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#00AF87] transition-all"
                title="TripAdvisor Profile"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14.5a4.5 4.5 0 1 1 4.5-4.5 4.5 4.5 0 0 1-4.5 4.5zM12 9a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm3.75-4.25a.75.75 0 1 1-.75.75.75.75 0 0 1 .75-.75zm-7.5 0a.75.75 0 1 1-.75.75.75.75 0 0 1 .75-.75z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-6xl mx-auto px-6 pt-8 mt-8 border-t border-[#ECECE3]/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© 2026 Honeyland Tours. All Rights Reserved.</p>
        </div>
      </footer>

    </main>
  );
}