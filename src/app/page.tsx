 'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import { useState } from 'react';

import CountdownTimer from './component/CountdownTimer';
import EventCard, { Event } from './component/EventCard';
import Footer from './component/Footer';

const playfair = Playfair_Display({ subsets: ['latin'], weight: '700' });

const EVENTS: Event[] = [
  {
    title: 'Fire & Prayer Conference',
    title2: "25th - 26th July, 2025",
    description: "Don't miss this power-packed moment!",
    flyerSrc: '/fire-conference-flyer.png',
  },
  {
    title: 'Fire & Prayer Conference Jingle',
    title2: " ",
    description: 'Watch our Fire & Prayer Conference highlights.',
    videoSrc: '/fire-conference-video.mp4',
  },
  {
    title: 'Empowerment Program ',
    title2: '22nd - 23rd July, 2025',
    description: "Don't miss this!!",
    flyerSrc: '/empowerment-flyer.png',
  },
];

export default function ComingSoonPage() {
  const targetDate = new Date('2025-09-04T08:00:00Z'); // 9AM WAT (UTC+1)
  const [isLive, setIsLive] = useState(false);

  return (
    <div className="flex flex-col min-h-screen relative text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url('/background-img.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-radial from-black/50 via-transparent to-black/80 z-0" />

      <div className="relative z-10 px-6 md:px-20 py-16 flex flex-col items-center flex-grow pt-30 sm:pt-20">
        {/* Logo */}
        <div className="absolute top-6 left-6 z-50 flex items-center space-x-1">
          <div className="relative w-30 h-30 md:w-50 md:h-45">
            <Image
              src="/logo.png"
              alt="GAANET Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden md:block tracking-widest text-white mb-6 -ml-2">
            <h3 className="text-xl md:text-xl -ml-7 font-semibold leading-tight">
              GLOBAL ACCESS<br />
              APOSTOLIC NETWORK <br />
              INTERNATIONAL
            </h3>
          </div>
        </div>

        {/* Get in Touch Top-Right Link */}
        <div className="absolute top-6 right-6 z-50">
          <Link
            href="/contact"
            className="text-sm md:text-base font-semibold text-white hover:text-purple-300 transition"
          >
            Get in Touch
          </Link>
        </div>

        {/* Headline */}
        <h1
          className={`${playfair.className} text-5xl md:text-8xl mt-20 font-extrabold tracking-widest text-center mb-8`}
        >
          {isLive ? 'GAANET is Live!' : 'COMING SOON!!!'}
        </h1>

        {/* Countdown */}
        {!isLive && (
          <CountdownTimer
            targetDate={targetDate}
            onComplete={() => setIsLive(true)}
          />
        )}

        {/* Description + Events */}
        {!isLive && (
          <>
            <p className="max-w-2xl text-center text-purple-100 text-lg mb-10 leading-loose">
              <span className="font-semibold text-purple-50">
                GLOBAL ACCESS APOSTOLIC NETWORK INTERNATIONAL (GAANET)
              </span>{' '}
              is a powerful network of ministers and ministries that are moving in the power of the Spirit,
              encouraging and supporting one another and building the Kingdom of God under a protective,
              supportive and nurturing covering.
            </p>

            {/* Events Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {EVENTS.map((event, index) => (
                <EventCard key={index} event={event} onOpen={() => {}} />
              ))}

              {/* Button under the grid */}
              <div className="col-span-full flex justify-center mt-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center bg-purple-700 hover:bg-purple-800 transition-all text-white font-bold py-4 px-8 rounded-full shadow-lg"
                >
                  Get in Touch
                  <span className="ml-3">&rarr;</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
