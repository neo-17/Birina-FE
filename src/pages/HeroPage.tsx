import React, { useState, useEffect } from 'react'
import QRScannerModal from './QRScannerModel';
import { QrCode } from 'lucide-react';

export default function Home() {
  // Animation on scroll effect
  const [isVisible, setIsVisible] = useState({});
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
      if (section.id) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="text-gray-800 font-sans antialiased">
      <QRScannerModal isOpen={isQRScannerOpen} onClose={() => setIsQRScannerOpen(false)} />
      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-black via-gray-900 to-black text-white min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 bg-repeat opacity-5"
          ></div>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="transform transition-all duration-1000 translate-y-0">
            <span className="inline-block bg-red-600 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-4 font-semibold">Authentic Assamese Crafts</span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-2">
              Tradition Meets <span className="text-red-500 relative">
                Blockchain
                <span className="absolute bottom-0 left-0 w-full h-1 bg-red-500 transform scale-x-0 origin-bottom-left transition-transform duration-700 group-hover:scale-x-100"></span>
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              Authentic Assamese gamusa with blockchain verification,
              connecting traditional weavers to the Web3 world.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {/* <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-md font-semibold shadow-lg hover:shadow-red-900/30 transition-all duration-300 transform hover:-translate-y-1">
                Know More
              </button> */}
              <button onClick={() => setIsQRScannerOpen(true)} className="border border-white/80 backdrop-blur-sm bg-white/5 px-8 py-3 rounded-md font-semibold flex items-center gap-2 transition-all duration-300 hover:bg-white/10">
                <QrCode size={24} />
                Scan A QR <span className="text-red-500">→</span>
              </button>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ring-2 ring-black shadow-md">AG</div>
                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ring-2 ring-black shadow-md">KB</div>
                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ring-2 ring-black shadow-md">RM</div>
              </div>
              <p className="text-sm text-gray-300">Join the collectors preserving cultural heritage</p>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg transition-all duration-300 hover:bg-white/10">
                <p className="text-3xl font-bold text-white-400 mb-1">100%</p>
                <p className="text-sm text-gray-300">Authentic Handcrafted</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg transition-all duration-300 hover:bg-white/10">
                <p className="text-3xl font-bold text-white-400 mb-1">50+</p>
                <p className="text-sm text-gray-300">Artisans Supported</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg transition-all duration-300 hover:bg-white/10">
                <p className="text-3xl font-bold text-white-400 mb-1">100+</p>
                <p className="text-sm text-gray-300">NFTs Minted</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg transition-all duration-300 hover:bg-white/10">
                <p className="text-3xl font-bold text-white-400 mb-1">0%</p>
                <p className="text-sm text-gray-300">Carbon Footprint</p>
              </div>
            </div>
          </div>
          <div className="relative w-full h-[500px] rounded-xl shadow-2xl overflow-hidden group">
            {/* Image Background */}
            <img
              src="/Images/Birina_NFT.jpeg" // Replace with your image URL or import
              alt="NFT Image"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            />

            {/* Gradient Overlay for Background Effect (Optional) */}
            {/* <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 [mask-image:repeating-linear-gradient(white_0_20px,transparent_20px_40px)] transition-all duration-500 group-hover:scale-105"></div> */}

            {/* Text Overlay */}
            <div className="absolute bottom-6 left-6 text-white text-sm bg-black/40 backdrop-blur-sm p-4 rounded-lg shadow-lg transition-all duration-300 group-hover:translate-y-2">
              <p className="font-bold text-lg mb-1">Fulam Gamusa #042</p>
              <p className="text-xs mb-1">Creator: Lokhimi Pegu</p>
              <p className="text-xs mb-1">Blockchain: Base</p>
              <p className="text-xs mb-2">Woven: Feb 2025</p>
              <span className="bg-gradient-to-r from-green-600 to-green-500 text-white text-xs px-3 py-1 rounded-full mt-2 inline-block shadow-md">Verified &#10004;</span>
            </div>

            {/* Labels */}
            <span className="absolute top-10 right-[-30px] -rotate-90 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs px-3 py-1 rounded-md shadow-md transform transition-all duration-300 group-hover:right-[-20px]">Unique NFT</span>
            <span className="absolute bottom-16 left-[-30px] rotate-90 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs px-3 py-1 rounded-md shadow-md transform transition-all duration-300 group-hover:left-[-20px]">Authentic Craft</span>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white text-gray-900 py-24 px-6 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="transform transition-all duration-1000 translate-y-0">
            <h2 className="text-3xl font-bold mb-6 relative inline-block">
              About
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-red-500"></span>
            </h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Birina Handmade bridges centuries-old Assamese gamusa traditions with Web3 technology,
              ensuring authenticity, traceability and supporting local artisans.
            </p>
            <h3 className="text-xl font-semibold mb-4 text-white-800">Our Heritage Mission</h3>
            <p className="mb-8 text-gray-700 leading-relaxed">
              Birina Handmade preserves the iconic Assamese gamusa – a handwoven cloth symbolizing
              cultural identity and heritage across generations.
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start group">
                <span className="text-white-600 bg-white-100 p-2 rounded-full flex-shrink-0 mt-1 transition-all duration-300 group-hover:bg-white-200">&#9989;</span>
                <div>
                  <span className="font-semibold block mb-1 text-white-900">Authentic Craftsmanship</span>
                  <span className="text-gray-700">Traditional methods preserved through digital certification on the blockchain.</span>
                </div>
              </li>
              <li className="flex gap-4 items-start group">
                <span className="text-white-600 bg-white-100 p-2 rounded-full flex-shrink-0 mt-1 transition-all duration-300 group-hover:bg-white-200">&#128101;</span>
                <div>
                  <span className="font-semibold block mb-1 text-white-900">Community Empowerment</span>
                  <span className="text-gray-700">Supporting marginalized weavers and artisans through sustainable business practices.</span>
                </div>
              </li>
              <li className="flex gap-4 items-start group">
                <span className="text-white-600 bg-white-100 p-2 rounded-full flex-shrink-0 mt-1 transition-all duration-300 group-hover:bg-white-200">&#128640;</span>
                <div>
                  <span className="font-semibold block mb-1 text-white-900">Blockchain Innovation</span>
                  <span className="text-gray-700">Each piece is traceable on Base blockchain, bringing traditional crafts into the Web3 era.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-6 text-white-800 relative inline-block">
              Bridging Tradition & Technology
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-white-400"></span>
            </h3>
            <ul className="space-y-6">
              <li className="group">
                <strong className="text-white-700 block mb-2">01 <span className="border-b border-white-300 pb-1">Traditional Heritage</span></strong>
                <p className="text-gray-700 pl-6">The iconic gamusa has been central to Assamese identity for centuries.</p>
              </li>
              <li className="group">
                <strong className="text-white-700 block mb-2">02 <span className="border-b border-white-300 pb-1">Artisan Empowerment</span></strong>
                <p className="text-gray-700 pl-6">We work with over 100 weavers, mostly women from marginalized communities.</p>
              </li>
              <li className="group">
                <strong className="text-white-700 block mb-2">03 <span className="border-b border-white-300 pb-1">Blockchain Verification</span></strong>
                <p className="text-gray-700 pl-6">NFT certificates on Base blockchain ensure authenticity and provenance.</p>
              </li>
              <li className="group">
                <strong className="text-white-700 block mb-2">04 <span className="border-b border-white-300 pb-1">Global Accessibility</span></strong>
                <p className="text-gray-700 pl-6">Web3 technology connects local artisans to the global marketplace.</p>
              </li>
            </ul>
            <div className="mt-8 text-sm text-gray-500 bg-white p-4 rounded-lg border border-gray-200 flex justify-between">
              <span>Since <strong className="text-white-700">2018</strong></span>
              <span>Artisans: <strong className="text-white-700">50+</strong></span>
              <span>NFTs Created: <strong className="text-white-700">100+</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Blockchain Section */}
      <section id="blockchain" className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-24 px-6 relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-repeat opacity-5" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L3N2Zz4=')" }}></div>
        </div>
        <div className="max-w-6xl mx-auto gap-16 relative z-10">
          <div className="transform transition-all duration-1000 translate-y-0">
            <h2 className="text-3xl font-bold mb-6 relative inline-block">
              Authenticating Cultural Heritage with Base Blockchain
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-white-500"></span>
            </h2>
            <p className="mb-8 text-gray-300 leading-relaxed">
              Each Birina Handmade product includes a unique QR code linked to a
              digital certificate (NFT) on the Base blockchain.
            </p>
            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl mb-8 shadow-lg border border-gray-800">
              <h3 className="text-lg font-semibold mb-6 text-white-400">How Our Blockchain Verification Works:</h3>
              <ol className="list-decimal pl-6 space-y-4 text-gray-300">
                <li className="pb-2 border-b border-gray-800">Each gamusa is assigned a unique digital identity when created</li>
                <li className="pb-2 border-b border-gray-800">Artisan information, creation date, and product details are recorded</li>
                <li className="pb-2 border-b border-gray-800">Data is minted as an NFT on the Base blockchain</li>
                <li>Scan the QR code to verify authenticity, traceability and provenance of a Gamusa.</li>
              </ol>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 transition-all duration-300 hover:border-white-500 group">
                <h4 className="font-semibold mb-2 text-white group-hover:text-white-400 transition-colors duration-300">Guaranteed Authenticity</h4>
                <p className="text-gray-300">Verify that your product is a genuine handcrafted Birina creation.</p>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 transition-all duration-300 hover:border-white-500 group">
                <h4 className="font-semibold mb-2 text-white group-hover:text-white-400 transition-colors duration-300">Complete Traceability</h4>
                <p className="text-gray-300">Track the journey of your gamusa from artisan to your hands.</p>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 transition-all duration-300 hover:border-white-500 group">
                <h4 className="font-semibold mb-2 text-white group-hover:text-white-400 transition-colors duration-300">Artisan Recognition</h4>
                <p className="text-gray-300">Know the artisan behind your gamusa and support their craft.</p>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 transition-all duration-300 hover:border-white-500 group">
                <h4 className="font-semibold mb-2 text-white group-hover:text-white-400 transition-colors duration-300">Digital Ownership</h4>
                <p className="text-gray-300">Receive a digital certificate of ownership with your purchase.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artisans Section */}
      <section id="artisans" className="bg-white text-gray-900 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 relative">
            Artisans
            <span className="block mx-auto w-16 h-1 bg-red-500 mt-2"></span>
          </h2>
          <p className="text-center max-w-2xl mx-auto mb-16 text-gray-600 leading-relaxed">
            Our skilled artisans from marginalized communities in Assam create each handwoven gamusa with care
            and precision.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                name: 'Bornali Doley Pegu',
                image: '/Images/Bornali Doley Pegu.png',
                title: 'Danichapori, Golaghat',
                quote: 'With Birina, I can support my family while preserving the traditional weaving techniques I learned from my grandmother.'
              },
              {
                name: 'Lokhimi Pegu',
                image: '/Images/Lokhimai Pegu.png',
                title: 'Danichapori, Golaghat',
                quote: 'Creating modern patterns that honor our traditions allows me to express my creativity while celebrating Assamese culture.'
              },
              {
                name: 'Rupa Charo Pegu',
                image: '/Images/Rupa Charo Pegu.png',
                title: 'Puronimati Bhakat Gaon, Golaghat',
                quote: 'Building and maintaining traditional looms connects me to centuries of craftsmanship while supporting our weaving community.'
              },
              {
                name: 'Monalisha Taud',
                image: '/Images/Monalisha Taud.png',
                title: 'Danichapori, Golaghat',
                quote: 'Using traditional natural dyes preserves our heritage and creates sustainable textiles that tell our story to the world.'
              }
            ].map((artisan, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-md border border-gray-200 hover:border-white-300 transition-all duration-300 hover:-translate-y-1 group">
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-48 mb-6 rounded-lg flex items-center justify-center text-gray-400 overflow-hidden relative group-hover:from-white-100 group-hover:to-white-200 transition-all duration-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src={artisan.image} alt={artisan.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-1 text-white-900">{artisan.name}</h4>
                <p className="text-sm text-gray-600 mb-3 border-b border-gray-200 pb-3">{artisan.title}</p>
                <p className="text-sm italic text-gray-700">"{artisan.quote}"</p>
              </div>
            ))}
          </div>

          {/* <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white-700 mb-6 relative inline-block">
                Empowering Communities Through Craft
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-white-400"></span>
              </h3>
              <p className="mb-6 text-gray-700 leading-relaxed">
                Birina Handmade operates as a cluster-based social enterprise, collaborating
                with over 200 artisans from marginalized communities in Assam, many of whom
                are women.
              </p>
              <p className="mb-8 text-gray-700 leading-relaxed">
                By providing sustainable income opportunities, our artisans can preserve their
                cultural heritage while achieving financial independence and supporting their
                families.
              </p>
              <div className="grid grid-cols-2 gap-6 bg-gradient-to-br from-indigo-50 to-white-50 p-8 rounded-xl shadow-md border border-white-100">
                <div className="text-center bg-white p-4 rounded-lg shadow-sm border border-white-100">
                  <p className="text-2xl font-bold text-white-600 mb-1">200+</p>
                  <p className="text-sm text-gray-600">Artisans Employed</p>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow-sm border border-white-100">
                  <p className="text-2xl font-bold text-white-600 mb-1">85%</p>
                  <p className="text-sm text-gray-600">Women Artisans</p>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow-sm border border-white-100">
                  <p className="text-2xl font-bold text-white-600 mb-1">40%</p>
                  <p className="text-sm text-gray-600">Income Increase</p>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow-sm border border-white-100">
                  <p className="text-2xl font-bold text-white-600 mb-1">15+</p>
                  <p className="text-sm text-gray-600">Villages Reached</p>
                </div>
              </div>
              <div className="mt-8">
                <a href="#" className="text-white-600 hover:text-white-800 font-medium flex items-center gap-1 transition-all duration-300 hover:gap-2">
                  Learn about our social impact
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white-50 to-white-100 p-8 rounded-xl shadow-lg border border-white-200">
              <h3 className="text-lg font-semibold text-white-800 mb-6 relative inline-block">
                Support Our Artisan Community
                <span className="absolute bottom-0 left-0 w-12 h-1 bg-white-400"></span>
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3 items-start group">
                  <span className="text-green-600 bg-green-100 p-1 rounded-full flex-shrink-0 transition-all duration-300 group-hover:bg-green-200">✔</span>
                  <span>Purchase authentic handcrafted products with blockchain verification</span>
                </li>
                <li className="flex gap-3 items-start group">
                  <span className="text-green-600 bg-green-100 p-1 rounded-full flex-shrink-0 transition-all duration-300 group-hover:bg-green-200">✔</span>
                  <span>Connect directly with artisans and learn their stories</span>
                </li>
                <li className="flex gap-3 items-start group">
                  <span className="text-green-600 bg-green-100 p-1 rounded-full flex-shrink-0 transition-all duration-300 group-hover:bg-green-200">✔</span>
                  <span>Be part of preserving cultural heritage for future generations</span>
                </li>
              </ul>
              <div className="mt-8">
                <button className="bg-gradient-to-r from-white-600 to-white-700 hover:from-white-700 hover:to-white-800 text-white px-6 py-3 rounded-md font-semibold w-full shadow-lg hover:shadow-white-300/30 transition-all duration-300 transform hover:-translate-y-1">
                  Support Our Artisans
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Verification Benefits & Testimonials Section */}
      <section id="benefits" className="bg-gradient-to-br from-gray-50 to-white text-gray-900 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 relative">
            Verification Benefits
            <span className="block mx-auto w-16 h-1 bg-red-500 mt-2"></span>
          </h2>
          <p className="text-center mb-16 text-gray-600">Why our blockchain verification matters</p>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:border-white-300 transition-all duration-300 hover:-translate-y-1 group">
              <div className="bg-white-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-white-200 transition-all duration-300">
                <svg className="w-8 h-8 text-white-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-white-900 group-hover:text-white-700 transition-colors duration-300">Guaranteed Authenticity</h3>
              <p className="text-gray-600 leading-relaxed">Instantly confirm that your gamusa is a genuine Birina product, handwoven by verified artisans using traditional methods.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:border-white-300 transition-all duration-300 hover:-translate-y-1 group">
              <div className="bg-white-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-white-200 transition-all duration-300">
                <svg className="w-8 h-8 text-white-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-white-900 group-hover:text-white-700 transition-colors duration-300">Artisan Connection</h3>
              <p className="text-gray-600 leading-relaxed">Learn about the artisan who created your product, their story, and how your purchase supports their livelihood.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:border-white-300 transition-all duration-300 hover:-translate-y-1 group">
              <div className="bg-white-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-white-200 transition-all duration-300">
                <svg className="w-8 h-8 text-white-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-white-900 group-hover:text-white-700 transition-colors duration-300">Digital Ownership</h3>
              <p className="text-gray-600 leading-relaxed">Receive a digital certificate of ownership that can be transferred if you gift or sell your gamusa to someone else.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2 relative">
            What Our Customers Say
            <span className="block mx-auto w-12 h-1 bg-yellow-500 mt-2"></span>
          </h2>
          <p className="text-center mb-12 text-gray-600">Real feedback from verified purchases</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-8 rounded-xl shadow-lg border border-yellow-100 hover:border-yellow-300 transition-all duration-300 relative">
              <div className="absolute top-4 right-4 text-yellow-500 opacity-30">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.626.41-2.03a2.79 2.79 0 011.26-.667c.12-.025.24-.04.36-.03.66.03 1.3.35 1.93.97l.723-.958c-.27-.29-.56-.54-.888-.77-.43-.285-.9-.523-1.416-.704-.51-.18-1.05-.27-1.63-.27-1.08 0-2.052.37-2.916 1.102-.853.73-1.388 1.77-1.6 3.12-.19 1.05-.118 2.07.214 3.05.343 1 .948 1.817 1.814 2.45.87.636 1.87.954 3 .954.34 0 .672-.033 1-.1.42-.08.81-.212 1.18-.392.37-.18.68-.408.94-.683.52-.545.77-1.183.77-1.92zm8-1.677c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.695-1.327-.825-.55-.13-1.07-.14-1.54-.03-.16-.96.1-1.63.41-2.036.303-.4.77-.66 1.26-.688.12-.03.24-.03.36-.03.66.03 1.3.35 1.93.968l.723-.956c-.27-.288-.56-.54-.888-.77-.43-.285-.9-.524-1.416-.704-.51-.18-1.05-.27-1.63-.27-1.08 0-2.052.37-2.916 1.102-.85.73-1.39 1.77-1.6 3.12-.19 1.05-.12 2.07.21 3.05.34 1 .95 1.82 1.82 2.45.87.64 1.86.95 3 .95.33 0 .67-.03 1-.1.41-.1.8-.21 1.17-.4.37-.18.68-.4.94-.68.51-.55.77-1.19.77-1.92z" />
                </svg>
              </div>
              <p className="text-yellow-500 text-2xl mb-4 flex">★★★★★</p>
              <p className="text-gray-700 leading-relaxed mb-6">"As a collector of traditional textiles, I love that I can verify the authenticity of my gamusa. The blockchain certificate adds real value and connects me to the artisan who created it."</p>
              <div className="flex items-center">
                <div className="bg-yellow-200 h-10 w-10 rounded-full flex items-center justify-center text-yellow-700 font-semibold text-sm mr-3">JB</div>
                <div>
                  <p className="font-semibold text-gray-900">Jesu Neelkamal Borah</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="text-green-600">✓</span> Verified Purchase · Guwahati
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-8 rounded-xl shadow-lg border border-yellow-100 hover:border-yellow-300 transition-all duration-300 relative">
              <div className="absolute top-4 right-4 text-yellow-500 opacity-30">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.626.41-2.03a2.79 2.79 0 011.26-.667c.12-.025.24-.04.36-.03.66.03 1.3.35 1.93.97l.723-.958c-.27-.29-.56-.54-.888-.77-.43-.285-.9-.523-1.416-.704-.51-.18-1.05-.27-1.63-.27-1.08 0-2.052.37-2.916 1.102-.853.73-1.388 1.77-1.6 3.12-.19 1.05-.118 2.07.214 3.05.343 1 .948 1.817 1.814 2.45.87.636 1.87.954 3 .954.34 0 .672-.033 1-.1.42-.08.81-.212 1.18-.392.37-.18.68-.408.94-.683.52-.545.77-1.183.77-1.92zm8-1.677c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.695-1.327-.825-.55-.13-1.07-.14-1.54-.03-.16-.96.1-1.63.41-2.036.303-.4.77-.66 1.26-.688.12-.03.24-.03.36-.03.66.03 1.3.35 1.93.968l.723-.956c-.27-.288-.56-.54-.888-.77-.43-.285-.9-.524-1.416-.704-.51-.18-1.05-.27-1.63-.27-1.08 0-2.052.37-2.916 1.102-.85.73-1.39 1.77-1.6 3.12-.19 1.05-.12 2.07.21 3.05.34 1 .95 1.82 1.82 2.45.87.64 1.86.95 3 .95.33 0 .67-.03 1-.1.41-.1.8-.21 1.17-.4.37-.18.68-.4.94-.68.51-.55.77-1.19.77-1.92z" />
                </svg>
              </div>
              <p className="text-yellow-500 text-2xl mb-4 flex">★★★★★</p>
              <p className="text-gray-700 leading-relaxed mb-6">"I love being able to trace my gamusa back to the artisan. The blockchain verification was easy to use, even though I'm not tech-savvy. It's a brilliant way to protect cultural crafts."</p>
              <div className="flex items-center">
                <div className="bg-yellow-200 h-10 w-10 rounded-full flex items-center justify-center text-yellow-700 font-semibold text-sm mr-3">SI</div>
                <div>
                  <p className="font-semibold text-gray-900">Sheikh Rezaul Islam</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="text-green-600">✓</span> Verified Purchase · Jorhat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-gradient-to-br from-gray-100 to-gray-50 text-gray-900 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">
            Frequently Asked Questions
            <span className="block mx-auto w-16 h-1 bg-white-500 mt-2"></span>
          </h2>
          <p className="text-center text-gray-600 mb-12">Everything you need to know about our products and blockchain verification</p>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:border-white-200 transition-all duration-300 group">
              <h3 className="text-lg font-semibold mb-3 text-white-900 group-hover:text-white-700 transition-colors duration-300">What is a gamusa?</h3>
              <p className="text-gray-700 leading-relaxed">A gamusa is a traditional handwoven Assamese cloth, often used as a sign of respect and cultural pride. Each one is crafted with unique patterns and deep cultural significance.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:border-white-200 transition-all duration-300 group">
              <h3 className="text-lg font-semibold mb-3 text-white-900 group-hover:text-white-700 transition-colors duration-300">How do I verify my gamusa?</h3>
              <p className="text-gray-700 leading-relaxed">Each Birina gamusa comes with a QR code or NFC tag. Simply scan the code or tap with your phone to view the digital certificate of authenticity on the Algorand blockchain.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:border-white-200 transition-all duration-300 group">
              <h3 className="text-lg font-semibold mb-3 text-white-900 group-hover:text-white-700 transition-colors duration-300">What makes Birina Handmade different?</h3>
              <p className="text-gray-700 leading-relaxed">We combine tradition and technology by certifying every handcrafted gamusa on the blockchain. This ensures authenticity while directly supporting Assamese artisans.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:border-white-200 transition-all duration-300 group">
              <h3 className="text-lg font-semibold mb-3 text-white-900 group-hover:text-white-700 transition-colors duration-300">Is blockchain verification eco-friendly?</h3>
              <p className="text-gray-700 leading-relaxed">Yes. We use the Algorand blockchain, which is carbon-negative and highly energy-efficient, making it an ideal choice for sustainable digital certification.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:border-white-200 transition-all duration-300 group">
              <h3 className="text-lg font-semibold mb-3 text-white-900 group-hover:text-white-700 transition-colors duration-300">Can I gift or resell my gamusa?</h3>
              <p className="text-gray-700 leading-relaxed">Absolutely. The digital certificate can be transferred on the blockchain, preserving ownership history and maintaining its authenticity across owners.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section id="cta" className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 px-6 relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-repeat opacity-5" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L3N2Zz4=')" }}></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Join the Movement</h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Own a piece of heritage. Support Assamese artisans. Embrace the future of verified tradition.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {/* <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-4 rounded-md font-semibold text-white shadow-lg hover:shadow-red-900/30 transition-all duration-300 transform hover:-translate-y-1">
              Explore gamusa Collection
            </button> */}
            <button onClick={() => setIsQRScannerOpen(true)} className="flex border border-white hover:bg-white hover:text-black px-10 py-4 rounded-md font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              <span className='px-2'><QrCode size={24} /></span>Verify a Product
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-br from-gray-900 to-black text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          {/* Brand Description */}
          <div className="md:col-span-2">
            <h4 className="text-2xl font-bold mb-4 relative inline-block">
              Birina Handmade
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-red-500 rounded-full"></span>
            </h4>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Blending Assamese heritage with modern technology to protect and promote authentic craftsmanship.
            </p>
            <div className="mt-6 text-sm text-gray-500 italic">
              Supported by <span className="text-white font-semibold">Web3Assam</span>
            </div>
          </div>

          {/* Quick Links */}
          {/* Contact Info */}
          <div>
            <h5 className="text-2xl font-semibold mb-3">Contact</h5>
            <ul className="text-gray-400 space-y-2">
              <li>Email: <a href="mailto:info@birinahandmade.com" className="hover:text-white">birina.net@gmail.com</a></li>
              <li>Phone: <a href="tel:+918638178955" className="hover:text-white">+91 86381-78955</a></li>
              <li>Jalukbari, Guwahati, Assam.</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} Birina Handmade. All rights reserved.
        </div>
      </footer>

    </main>
  )
}