  'use client';

import { useState } from 'react';

type FormData = {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  ministry: string;
  location: string;
  days: string[];
  consent: boolean;
};

export default function GetInTouchForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    ministry: '',
    location: '',
    days: [],
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, checked } = target;

    if (name === 'days') {
      setFormData((prev) => ({
        ...prev,
        days: checked
          ? [...prev.days, value]
          : prev.days.filter((day) => day !== value),
      }));
    } else if (name === 'consent') {
      setFormData((prev) => ({ ...prev, consent: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.email && !isValidEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!formData.consent) {
      alert('You must agree to be contacted.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        setShowSuccess(true);
        setFormData({
          name: '',
          phone: '',
          whatsapp: '',
          email: '',
          ministry: '',
          location: '',
          days: [],
          consent: false,
        });

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
      {/* 🖼️ Event Banner Image */}
      <div className="w-full max-w-md mx-auto mb-4">
        <img
          src="/ganet.jpg"
          alt="Event Banner"
          className="rounded-md w-full object-cover"
        />
      </div>

      {/* 📋 Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 rounded-xl text-white max-w-md mx-auto"
      >
        <h2 className="text-xl font-bold text-center text-purple-400 mb-2">
          Event Registration
        </h2>

        <div>
          <label className="text-sm font-semibold">Name *</label>
          <input
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 bg-transparent text-white px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Phone Number *</label>
          <input
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 bg-transparent text-white px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">WhatsApp Phone No.</label>
          <input
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 bg-transparent text-white px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 bg-transparent text-white px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Ministry *</label>
          <input
            name="ministry"
            required
            value={formData.ministry}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 bg-transparent text-white px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Location *</label>
          <input
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 bg-transparent text-white px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">
            Number of Days to Attend *
          </label>
          <div className="flex gap-4 mt-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="days"
                value="Friday"
                checked={formData.days.includes('Friday')}
                onChange={handleChange}
                disabled={loading}
                className="mr-2"
              />
              Friday
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="days"
                value="Saturday"
                checked={formData.days.includes('Saturday')}
                onChange={handleChange}
                disabled={loading}
                className="mr-2"
              />
              Saturday
            </label>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">
            I understand that I can be contacted for future programs *
          </label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                disabled={loading}
                className="mr-2"
              />
              Yes
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 rounded-md text-sm ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Submitting...' : 'Submit'}
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
