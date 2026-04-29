"use client"

import { useState, useEffect } from "react";
import { HumbergerIcon, CloseIcon } from "@/src/icons";
import Logo from "@/public/icons/logo";
import Link from "next/link";
import Button from "./button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      <Link href="/" className="flex items-center gap-2.5 shrink-0 animate-fade-in">
        <Logo width={30} height={30}/>
        <span className="font-bold text-title text-base tracking-tight">TRI-ACE<span className="text-primary"> BOOKING</span></span>
      </Link>

      <nav className="hidden md:flex items-center gap-7">
        <Link href="/" className="nav-link text-sm font-semibold text-primary">Sewa Lapangan</Link>
        <Link href="/booking" className="nav-link text-sm font-medium text-body hover:text-title transition-colors">Booking Saya</Link>
      </nav>

      <div className="hidden md:flex items-center gap-2.5 animate-fade-in">
        <Button variant="secondary" size="md" href="/login">
          Masuk
        </Button>
        <Button variant="primary" size="md" href="/register">
          Daftar
        </Button>
      </div>

      {/* mobile menu */}
      <div className="md:hidden">
        {/* Toggle Button */}
        <button
          className="relative z-50 p-2 rounded-lg hover:bg-surface transition-colors cursor-pointer"
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          {isOpen ? <CloseIcon className="w-6 h-6 text-primary" /> : <HumbergerIcon className="w-6 h-6 text-primary"/>}
        </button>

        {/* overlay */}
        <div className={`fixed top-0 right-0 h-dvh w-64 sm:w-72 bg-white z-40 transform transition-transform duration-300 ease-in-out shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full pt-20 pb-6 px-5 overflow-y-auto">
            <ul className="flex flex-col gap-2 text-base font-medium text-title">
              <li>
                <Link href="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-primary-light hover:text-primary-dark transition-colors">
                  Sewa Lapangan
                </Link>
              </li>

              <li>
                <Link href="/booking" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-primary-light hover:text-primary-dark transition-colors">
                  Booking Saya
                </Link>
              </li>
              
              <li className="mt-6 pt-6 border-t border-border flex flex-col gap-3">
                <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center px-4 py-2 rounded-btn border-2 border-primary text-sm text-primary font-semibold hover:bg-primary-light transition-colors duration-200">
                  Masuk
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="flex items-center justify-center px-4 py-2 rounded-btn bg-primary text-sm text-white font-semibold shadow-md shadow-primary/30 hover:bg-primary-dark transition-colors duration-200">
                  Daftar
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
}
