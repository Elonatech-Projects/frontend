'use client';

import GetInTouchForm from '../component/GetInTouchForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-800 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white/10 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Get in Touch</h1>
        <GetInTouchForm onClose={() => {}} />
      </div>
    </div>
  );
}
