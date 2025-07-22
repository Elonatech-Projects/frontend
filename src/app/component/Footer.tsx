'use client';

import Image from 'next/image';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaThreads, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-neutral-900 text-gray-300 px-6 md:px-20 py-14">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 justify-center items-start text-center md:text-left">

        {/* Logo + Name + Socials */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="flex items-center space-x-3">
            <div className="relative w-[100px] h-[100px]">
              <Image
                src="/logo.png"
                alt="GAANET Logo"
                fill
                className="object-contain"
              />
            </div>
            <h4 className="font-bold -ml-5 text-white text-3xl">GAANET</h4>
          </div>

          <p className="text-sm text-white ml-5 max-w-xs">
            Building Structure, Building People and Building Nations.
          </p>

          {/* Socials */}
          <div>
            <h5 className="text-white font-semibold ml-5 mb-2">Follow Us</h5>
            <div className="flex justify-center ml-5 md:justify-start space-x-4 text-2xl">
              <a href="https://facebook.com/GAANETI" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook className="hover:text-purple-400 transition" />
              </a>
              <a href="https://instagram.com/gaaneti" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="hover:text-purple-400 transition" />
              </a>
              <a href="https://x.com/gaanet1" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaXTwitter className="hover:text-purple-400 transition" />
              </a>
              <a href="https://threads.com/gaaneti" target="_blank" rel="noopener noreferrer" aria-label="Threads">
                <FaThreads className="hover:text-purple-400 transition" />
              </a>
              <a href="https://youtube.com/@GAANETI" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FaYoutube className="hover:text-purple-400 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 text-sm">
          <h5 className="text-white  text-xl font-semibold mb-2">Contact Us</h5>

          <p>
            <span className="font-extrabold">Email:</span>{' '}
            <a href="mailto:info@gaanet.org" className="hover:text-purple-400 transition">info@gaanet.org</a>,{' '}
            <a href="mailto:secreteriat@gaanet.org" className="hover:text-purple-400 transition">secreteriat@gaanet.org</a>
          </p>

          <p>
            <span className="font-extrabold">Phone:</span>{' '}
            <a href="tel:+2348033183107" className="hover:text-purple-400 transition">+234 803 318 3107</a>,{' '}
            <a href="tel:+2348034746173" className="hover:text-purple-400 transition">+234 803 474 6173</a>, <br/>{' '}
            <a href="tel:+2348131129234" className="hover:text-purple-400 transition">+234 813 112 9234</a>,{' '}
            <a href="tel:+2348072697533" className="hover:text-purple-400 transition">+234 807 269 7533</a>,{' '}
            <a href="tel:+2349054551723" className="hover:text-purple-400 transition">+234 905 455 1723</a>
          </p>

          <p>
            <span className="font-extrabold">Headquarters:</span> The Home-Builders Christian Centre,<br />
            Gilgal City Shepherds Hill, 1-5 Iyesi Road, IYESI,<br />
            Off Oko-Afo Bus stop, Iyesi Bale, Ilogbo-Eremi,<br />
            Badagry LGA, Lagos State, Nigeria.
          </p>
        </div>
      </div>

      <div className="mt-12 border-t border-neutral-700 pt-6 text-center text-xs text-gray-500">
        &copy; {currentYear} GAANET. All rights reserved.
      </div>
    </footer>
  );
}
