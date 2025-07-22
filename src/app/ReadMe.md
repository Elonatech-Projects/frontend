'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Playfair_Display } from 'next/font/google';
import { ArrowRight } from 'lucide-react';
import Footer from './component/Footer';

const playfair = Playfair_Display({ subsets: ['latin'], weight: '700' });

const TWO_MONTHS_IN_MS = 60 * 24 * 60 * 60 * 1000;

type Event = {
  title: string;
  description: string;
  flyerSrc?: string;
  videoSrc?: string;
};

const EVENTS: Event[] = [
  {
    title: 'Fire & Prayer Conference',
    description: "Don't miss this power-packed moment!",
    flyerSrc: '/fire-conference-flyer.png',
  },
  {
    title: 'Fire & Prayer Conference Video',
    description: 'Watch our Fire & Prayer Conference highlights.',
    videoSrc: '/fire-conference-video.mp4',
  },
  {
    title: 'Empowerment Program',
    description: "Don't miss this!!",
    flyerSrc: '/empowerment-flyer.png',
  },
];

export default function ComingSoonPage() {
  const [targetDate] = useState(() => new Date(Date.now() + TWO_MONTHS_IN_MS));
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const [modalContent, setModalContent] = useState<null | 'contact' | Event>(null);

  function getTimeLeft(target: Date) {
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white px-6 bg-black">
        <h1 className="text-5xl font-bold animate-pulse">GAANET is Live!</h1>
      </div>
    );
  }

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

      <div className="relative z-10 px-6 md:px-20 py-16 flex flex-col items-center flex-grow">
        {/* Logo */}
        <div className="absolute top-6 left-6 w-24 h-24 md:w-32 md:h-32 z-50">
          <Image src="/logo.png" alt="GAANET Logo" fill style={{ objectFit: 'contain' }} priority />
        </div>

        {/* Hero */}
        <h1
          className={`${playfair.className} text-5xl md:text-8xl font-extrabold tracking-widest text-center mb-8`}
        >
          COMING SOON!!!
        </h1>

        {/* Countdown */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-wrap justify-center gap-6 mb-12">
          <TimeBlock label="Days" value={timeLeft.days} />
          <TimeBlock label="Hours" value={timeLeft.hours} />
          <TimeBlock label="Minutes" value={timeLeft.minutes} />
          <TimeBlock label="Seconds" value={timeLeft.seconds} />
        </div>

        {/* Intro */}
        <p className="max-w-2xl text-center text-purple-100 text-lg mb-10 leading-loose">
          <span className="font-semibold text-purple-50">
            GLOBAL ACCESS APOSTOLIC NETWORK INTERNATIONAL (GAANET)
          </span>{' '}
          is a powerful network of ministers and ministries that are moving in the power of the Spirit,
          encouraging and supporting one another and building the Kingdom of God under a protective,
          supportive and nurturing covering.
        </p>

        {/* CTA */}
        <button
          onClick={() => setModalContent('contact')}
          className="group inline-flex items-center bg-purple-700 hover:bg-purple-800 transition-all text-white font-bold py-4 px-8 rounded-full shadow-lg"
        >
          Get in Touch
          <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
        </button>

        {/* Upcoming Events */}
        <div className="mt-20 max-w-6xl w-full">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EVENTS.map((event) => (
              <EventCard key={event.title} event={event} onOpen={() => setModalContent(event)} />
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* Modals */}
      {modalContent && (
        <Modal onClose={() => setModalContent(null)}>
          {modalContent === 'contact' ? (
            <GetInTouchForm onClose={() => setModalContent(null)} />
          ) : (
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-4">{modalContent.title}</h3>
              <h4 className="mb-4 text-lg text-black">{modalContent.description}</h4>
              {modalContent.videoSrc ? (
                <video
                  src={modalContent.videoSrc}
                  controls
                  className="w-full rounded-lg"
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

function TimeBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center px-4">
      <span className="text-5xl font-mono font-bold drop-shadow-md">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-sm uppercase tracking-wider text-purple-200">{label}</span>
    </div>
  );
}

function EventCard({ event, onOpen }: { event: Event; onOpen: () => void }) {
  return (
    <div
      onClick={onOpen}
      className="cursor-pointer bg-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition"
    >
      {event.videoSrc ? (
        <div className="w-full h-48 bg-black flex items-center justify-center text-white">
          🎥 Video Preview
        </div>
      ) : (
        <Image
          src={event.flyerSrc!}
          alt={event.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h4 className="text-xl font-semibold mb-2">{event.title}</h4>
        <p className="text-purple-100 text-sm">{event.description}</p>
      </div>
    </div>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white text-black rounded-xl p-6 max-w-full sm:max-w-lg w-full relative overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-black"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

function GetInTouchForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({ name: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Message sent!');
        setFormData({ name: '', phone: '', subject: '', message: '' });
        onClose();
      } else {
        alert('Failed to send message.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-xl text-black">
      <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>

      <label className="block font-semibold">Name</label>
      <input
        name="name"
        required
        value={formData.name}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3"
        disabled={loading}
      />

      <label className="block font-semibold">Phone Number</label>
      <input
        name="phone"
        required
        value={formData.phone}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3"
        disabled={loading}
      />

      <label className="block font-semibold">Subject</label>
      <input
        name="subject"
        required
        value={formData.subject}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3"
        disabled={loading}
      />

      <label className="block font-semibold">Message</label>
      <textarea
        name="message"
        required
        rows={4}
        value={formData.message}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3"
        disabled={loading}
      ></textarea>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 rounded-md ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
