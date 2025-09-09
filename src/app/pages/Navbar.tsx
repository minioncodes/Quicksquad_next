"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { FaFacebookF, FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { FaSearch } from "react-icons/fa"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-blue-500 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="">
         <Image
  src="/images/logo.png"
  alt="QuickSquad Logo"
  width={200}
  height={60}
  className="h-auto max-w-[150px] md:max-w-[200px]"
  priority
/>

        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="hover:text-gray-200">HOME</Link>
          <Link href="/about" className="hover:text-gray-200">ABOUT</Link>
          <Link href="/blog" className="hover:text-gray-200">BLOG</Link>
          <Link href="/contact" className="hover:text-gray-200">CONTACT</Link>
          <Link href="/pricing" className="hover:text-gray-200">PRICING</Link>
          <FaSearch className="cursor-pointer hover:text-gray-200" />

          <div className="flex items-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button title="fd"
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-blue-600 px-6 py-4 space-y-4">
          <Link href="/" className="block">HOME</Link>
          <Link href="/about" className="block">ABOUT</Link>
          <Link href="/blog" className="block">BLOG</Link>
          <Link href="/contact" className="block">CONTACT</Link>
          <Link href="/pricing" className="block">PRICING</Link>
          <div className="flex space-x-4 mt-2">
            <FaFacebookF />
            <FaInstagram />
            <FaXTwitter />
          </div>
        </nav>
      )}
    </header>
  )
}
