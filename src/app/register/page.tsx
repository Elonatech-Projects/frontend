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
    <div className="min-h-screen bg-gradient-to-b from-purple-900  text-white py-6 px-4 flex flex-col items-center font-sans">
      <div className="w-full max-w-2xl mx-auto mb-6 text-center">
        <img
          src="/ganet.jpg"
          alt="Event Banner"
          className="w-full rounded-lg object-cover shadow-lg"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-sm bg-white/5 border border-purple-800 w-full max-w-2xl p-6 sm:p-10 rounded-xl shadow-2xl text-white"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-400">Event Registration</h2>

        {['name', 'phone', 'whatsapp', 'email', 'ministry', 'location'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-sm font-medium mb-1 capitalize">{field} {['name','phone','ministry','location'].includes(field) ? '*' : ''}</label>
            <input
              name={field}
              required={['name','phone','ministry','location'].includes(field)}
              value={typeof formData[field as keyof FormData] === 'string' ? formData[field as keyof FormData] as string : ''}

              onChange={handleChange}
              disabled={loading}
              className="w-full border border-gray-600 bg-black/30 text-white px-3 py-[8px] text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Number of Days to Attend *</label>
          <div className="flex gap-6 text-sm">
            {['Friday', 'Saturday'].map((day) => (
              <label key={day} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="days"
                  value={day}
                  required={formData.days.length === 0}
                  checked={formData.days.includes(day)}
                  onChange={handleChange}
                  disabled={loading}
                  className="mr-2"
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 italic">
            I understand that I can be contacted with the details provided for future Gaanet programs *
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

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-sm font-semibold px-6 py-2 rounded-lg shadow-md transition duration-200 ease-in-out ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
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