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

export default function RegisterPage() {
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

    if (!formData.consent || formData.days.length === 0) {
      alert('You must select days and agree to be contacted.');
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
    <div className="min-h-screen bg-[#fcefdc] text-black py-2 px-2 flex flex-col items-center font-sans">
      <div className="w-full max-w-lg mx-auto mb-4">
        <img
          src="/ganet.jpg"
          alt="Event Banner"
          className="w-full rounded-md object-cover"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg p-4 sm:p-6 rounded-md shadow border border-gray-200"
      >
        <h2 className="text-xl font-medium text-black text-left mb-1">
          Event Registration
        </h2>

        <p className="text-[13px] leading-snug mb-4">
          <strong>Event Date:</strong> August 31st, 2024<br />
          <strong>Event Time:</strong> 10:30AM<br />
          <strong>Event Address:</strong> The Covenant Place, Beside National Arts Theatre, Iganmu, Lagos, Nigeria.<br />
          Contact us at: (+234) 915 584 9219 or pfnlagosstate@gmail.com
        </p>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 px-3 py-[6px] text-sm rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Phone Number *</label>
          <input
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 px-3 py-[6px] text-sm rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">WhatsApp Phone No.</label>
          <input
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 px-3 py-[6px] text-sm rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 px-3 py-[6px] text-sm rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Ministry *</label>
          <input
            name="ministry"
            required
            value={formData.ministry}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 px-3 py-[6px] text-sm rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Location *</label>
          <input
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 px-3 py-[6px] text-sm rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Number of Days to Attend *</label>
          <div className="flex flex-col gap-1 text-sm">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="days"
                value="Friday"
                required={formData.days.length === 0}
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
                required={formData.days.length === 0}
                checked={formData.days.includes('Saturday')}
                onChange={handleChange}
                disabled={loading}
                className="mr-2"
              />
              Saturday
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 italic">
            I understand that I can be contacted with the details provided for future PFN programs *
          </label>
          <label className="inline-flex items-center text-sm">
            <input
              type="checkbox"
              name="consent"
              required
              checked={formData.consent}
              onChange={handleChange}
              disabled={loading}
              className="mr-2"
            />
            Yes
          </label>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#f4b400] text-white text-sm font-semibold px-4 py-2 rounded shadow-sm hover:bg-[#d99a00] transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          <span className="text-xs text-gray-500 italic">Clear form</span>
        </div>
      </form>

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-600 text-white px-6 py-4 rounded shadow-md animate-bounce text-sm">
            Message sent successfully!
          </div>
        </div>
      )}
    </div>
  );
}
