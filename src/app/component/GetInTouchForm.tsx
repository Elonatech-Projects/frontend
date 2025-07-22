 'use client';

import { useState } from 'react';

export default function GetInTouchForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.email && !isValidEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowSuccess(true);
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });

        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 2500);
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
    <div className="relative">
      <form onSubmit={handleSubmit} className="space-y-2 p-4 rounded-xl text-white max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-2">Get in Touch</h2>

        <label className="block font-semibold text-sm mb-0.5">Name</label>
        <input
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-white text-sm bg-transparent"
          disabled={loading}
        />

        <label className="block font-semibold text-sm mb-0.5">Phone Number</label>
        <input
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-white text-sm bg-transparent"
          disabled={loading}
        />

        <label className="block font-semibold text-sm mb-0.5">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-white text-sm bg-transparent"
          disabled={loading}
          placeholder="you@example.com"
        />

        <label className="block font-semibold text-sm mb-0.5">Subject</label>
        <input
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-white text-sm bg-transparent"
          disabled={loading}
        />

        <label className="block font-semibold text-sm mb-0.5">Message</label>
        <textarea
          name="message"
          required
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-6 py-5 text-white text-sm bg-transparent resize-none"
          disabled={loading}
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 rounded-md text-sm ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {showSuccess && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-purple-600 text-white px-6 py-4 rounded-xl shadow-lg animate-bounce text-sm">
            Message sent successfully!
          </div>
        </div>
      )}
    </div>
  );
}