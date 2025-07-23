 'use client';

import Image from 'next/image';
import { Playfair_Display } from 'next/font/google';
import { useState } from 'react';
import Link from 'next/link';

import CountdownTimer from './component/CountdownTimer';
import EventsSection from './component/EventSection';
import Footer from './component/Footer';
import Modal from './component/Modal';
import GetInTouchForm from './component/GetInTouchForm';
import { Event } from './component/EventCard';

const playfair = Playfair_Display({ subsets: ['latin'], weight: '700' });

const EVENTS: Event[] = [
  {
    title: 'Fire & Prayer Conference',
    title2: '25th - 26th July, 2025',
    description: "Don't miss this power-packed moment!",
    flyerSrc: '/fire-conference-flyer.png',
  },
  {
    title: 'Fire & Prayer Conference Jingle',
    title2: ' ',
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
  const [modalContent, setModalContent] = useState<null | 'contact' | Event>(null);
  const [isLive, setIsLive] = useState(false);

  return (
    <div className="flex flex-col min-h-screen relative text-white overflow-hidden">
      {/* BG Layers */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url('/background-img.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-radial from-black/50 via-transparent to-black/80 z-0" />

      <div className="relative z-10 px-6 md:px-20 py-16 flex flex-col items-center flex-grow pt-30 sm:pt-20">
        {/* Logo and text */}
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

        <h1
          className={`${playfair.className} text-5xl md:text-8xl mt-20 font-extrabold tracking-widest text-center mb-8`}
        >
          {isLive ? 'GAANET is Live!' : 'COMING SOON!!!'}
        </h1>

        {!isLive && targetDate && (
          <CountdownTimer
            targetDate={targetDate}
            onComplete={() => setIsLive(true)}
          />
        )}

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
            <button
              onClick={() => setModalContent('contact')}
              className="group inline-flex items-center bg-purple-700 hover:bg-purple-800 transition-all text-white font-bold py-4 px-8 rounded-full shadow-lg"
            >
              Get in Touch
              <span className="ml-3">
                &rarr;
              </span>
            </button>

            <EventsSection events={EVENTS} onEventClick={setModalContent} />

            {/* 📋 Register Now Button */}
            <div className="mt-16 flex justify-center w-full">
              <Link href="/register">
                <button className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all text-lg">
                  Register Now
                </button>
              </Link>
            </div>
          </>
        )}
      </div>

      <Footer />

      {/* Modal */}
      {modalContent && (
        <Modal onClose={() => setModalContent(null)}>
          {modalContent === 'contact' ? (
            <GetInTouchForm onClose={() => setModalContent(null)} />
          ) : (
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-4">{modalContent.title}</h3>
              <h4 className="mb-4 text-lg text-gray-300">{modalContent.description}</h4>
              {modalContent.videoSrc ? (
                <video
                  src={modalContent.videoSrc}
                  controls
                  className="w-full h-64 sm:h-80 md:h-auto rounded-lg"
                  preload="metadata"
                />
              ) : (
                <Image
                  src={modalContent.flyerSrc!}
                  alt={modalContent.title}
                  width={400}
                  height={250}
                  className="rounded-lg mx-auto"
                />
              )}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
  