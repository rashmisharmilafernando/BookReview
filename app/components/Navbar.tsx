"use client";
import { useState } from 'react';
import Link from 'next/link';
import logo from '../assets/logo.jpg';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    return (
        <header className="fixed   justify-between w-full bg-white shadow-md z-50">
            <button
                type="button"
                className="md:hidden p-2"
                onClick={toggleMobileMenu}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
            <nav className={`md:flex md:justify-between md:items-center text-sm p-3 ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
                <Link href="/">
                    <img src={logo.src} alt="Logo" width={50} height={50} />
                </Link><br></br>
                
            </nav>
        </header>
    );
}