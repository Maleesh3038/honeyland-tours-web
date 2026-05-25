"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase'; // Supabase connection eka import kara

export default function Home() {
  // Mobile nav state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({ success: null, message: "" });

  // Form submit handler for Web3Forms AND Supabase
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult({ success: null, message: "" });

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    try {
      // 1. Supabase Database ekata booking details save kirima
      const { error: dbError } = await supabase
        .from('bookings')
        .insert([
          { 
            name: formProps.name, 
            email: formProps.email, 
            subject: formProps.subject, 
            message: formProps.message,
            created_at: new Date()
          }
        ]);

      if (dbError) throw dbError;

      // 2. Web3Forms හරහා honeylandtours@gmail.com එකට Email එක යැවීම
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitResult({
          success: true,
          message: "Thank you! Your booking has been saved and email sent successfully."
        });
        e.target.reset();
      } else {
        setSubmitResult({
          success: false,
          message: data.message || "Email sending failed, but booking was saved."
        });
      }
    } catch (error) {
      console.error(error);
      setSubmitResult({
        success: false,
        message: "Something went wrong. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Experiences Categories
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

  // Gallery Data
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
              className="md:hidden text-white p-1"
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

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-[#1A1512]/95 backdrop-blur-lg py-6 px-6 flex flex-col gap-4">
              <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-white font-semibold">Home</a>
              <a href="#destinations" onClick={() => setIsMenuOpen(false)} className="text-white font-semibold">Experiences</a>
              <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="text-white font-semibold">Gallery</a>
              <a href="#reviews" onClick={() => setIsMenuOpen(false)} className="text-white font-semibold">Reviews</a>
              <a href="#contact-section" onClick={() => setIsMenuOpen(false)} className="text-white font-semibold">Contact</a>
            </div>
          )}
        </nav>

        {/* Hero Title */}
        <div className="max-w-4xl mx-auto px-6 text-center relative z-20 my-auto py-20">
          <h1 className="text-4xl md:text-6xl font-serif font-black mb-4 text-white">
            Your Trusted <span className="text-[#F3D798]">Sri Lanka Personal Drivers</span>
          </h1>
          <p className="text-md md:text-xl text-[#F7F5F0] mb-6">
            Discover paradise through the eyes of trusted local experts. Tailored island-wide private tours starting from Naula.
          </p>
        </div>
      </div>

      {/* Experiences Section */}
      <div id="destinations" className="max-w-6xl mx-auto py-20 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="bg-white rounded-2xl overflow-hidden border border-[#EFECE3] p-3 flex flex-col justify-between">
              <div className="relative w-full h-48 rounded-xl overflow-hidden">
                <Image src={exp.coverImage} alt={exp.title} fill className="object-cover" />
              </div>
              <div className="pt-4 px-2">
                <h3 className="font-bold text-lg text-[#2D2A22] mb-1">{exp.title}</h3>
                <p className="text-[10px] text-[#C19A5B] font-bold uppercase mb-4">{exp.tagline}</p>
                <Link href={`/destinations/${exp.slug}`} className="w-full bg-[#FAF6EC] text-[#7C5E28] font-bold py-2.5 rounded-xl text-xs block text-center">
                  👁️ View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div id="gallery" className="max-w-6xl mx-auto py-16 px-6 border-t border-[#EFECE3]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {honeyGallery.map((photo) => (
            <div key={photo.id} className="bg-white p-1.5 rounded-2xl border border-[#EFECE3]">
              <div className="relative h-56 w-full overflow-hidden rounded-xl">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div id="reviews" className="max-w-6xl mx-auto py-16 px-6 border-t border-[#EFECE3]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-2xl border border-[#EFECE3] flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#2D2A22] mb-1">"{review.title}"</h4>
                <p className="text-xs md:text-sm text-[#666053] italic mb-4">"{review.text}"</p>
              </div>
              <div className="pt-3 border-t border-[#F4F1EA] flex justify-between items-center">
                <div>
                  <h5 className="font-bold text-xs text-[#2D2A22]">{review.name}</h5>
                  <p className="text-[11px] text-[#A19B8E]">{review.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact-section" className="max-w-3xl mx-auto py-16 px-6 border-t border-[#EFECE3]">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-[#2D2A22]">Get In Touch With Us</h2>
        </div>

        <form onSubmit={handleFormSubmit} className="bg-white p-8 rounded-2xl border border-[#EFECE3] space-y-6">
          <input type="hidden" name="access_key" value="67510ec7-134c-492e-ae15-ea392d118b75" />
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
          
          {/* Email route - MAMA email actual setup */}
          <input type="hidden" name="to_email" value="honeylandtours@gmail.com" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase mb-2">Your Name</label>
              <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-[#EFECE3] bg-[#FAF6EC]/30 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-2">Email Address</label>
              <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-[#EFECE3] bg-[#FAF6EC]/30 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-2">Subject / Tour Plan</label>
            <input type="text" name="subject" required className="w-full px-4 py-3 rounded-xl border border-[#EFECE3] bg-[#FAF6EC]/30 text-sm" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-2">Your Message</label>
            <textarea name="message" required rows="4" className="w-full px-4 py-3 rounded-xl border border-[#EFECE3] bg-[#FAF6EC]/30 text-sm resize-none"></textarea>
          </div>

          {submitResult.success !== null && (
            <div className={`p-4 rounded-xl text-sm font-semibold ${submitResult.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {submitResult.message}
            </div>
          )}

          <button type="submit" disabled={isSubmitting} className="w-full bg-[#C19A5B] text-white font-bold py-3.5 rounded-xl text-sm uppercase tracking-wider">
            {isSubmitting ? "Sending Message..." : "Send Message ➔"}
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-[#1A1813] text-[#FDFCF7] py-12 border-t border-[#ECECE3]/10">
        <div className="max-w-6xl mx-auto px-6 text-center text-xs text-gray-500">
          <p>© 2026 Honeyland Tours. All Rights Reserved.</p>
        </div>
      </footer>

    </main>
  );
}