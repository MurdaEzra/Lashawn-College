import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import logo from '../logo/Logo.png'; 

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="Lashawn Driving and Computer College Logo" 
              className="h-20 w-auto object-contain" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><Link to="/" className="text-gray-700 hover:text-[#2E8B57]">Home</Link></li>
              <li><Link to="/driving-courses" className="text-gray-700 hover:text-[#2E8B57]">Driving Courses</Link></li>
              <li><Link to="/computer-courses" className="text-gray-700 hover:text-[#2E8B57]">Computer Courses</Link></li>
              <li><Link to="/services" className="text-gray-700 hover:text-[#2E8B57]">Services</Link></li>
              <li><Link to="/fees" className="text-gray-700 hover:text-[#2E8B57]">Fees</Link></li>
              <li><Link to="/about" className="text-gray-700 hover:text-[#2E8B57]">About</Link></li>
              <li><Link to="/faq" className="text-gray-700 hover:text-[#2E8B57]">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-700 hover:text-[#2E8B57]">Contact</Link></li>
            </ul>
          </nav>

          {/* Call Button */}
          <div className="hidden md:block">
            <a
              href="tel:+254117564318"
              className="flex items-center rounded-full bg-[#D7263D] px-4 py-2 text-white transition-colors hover:bg-[#c01c31]"
            >
              <Phone size={16} className="mr-2" />
              <span>+254 117 564 318</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="block md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-white px-4 py-2 md:hidden">
          <nav>
            <ul className="space-y-3 pb-3">
              <li><Link to="/" className="block py-2 text-gray-700 hover:text-[#2E8B57]" onClick={toggleMenu}>Home</Link></li>
              <li><Link to="/driving-courses" className="block py-2 text-gray-700 hover:text-[#2E8B57]" onClick={toggleMenu}>Driving Courses</Link></li>
              <li><Link to="/computer-courses" className="block py-2 text-gray-700 hover:text-[#2E8B57]" onClick={toggleMenu}>Computer Courses</Link></li>
              <li><Link to="/services" className="block py-2 text-gray-700 hover:text-[#2E8B57]" onClick={toggleMenu}>Services</Link></li>
              <li><Link to="/fees" className="block py-2 text-gray-700 hover:text-[#2E8B57]" onClick={toggleMenu}>Fees</Link></li>
              <li><Link to="/about" className="block py-2 text-gray-700 hover:text-[#2E8B57]" onClick={toggleMenu}>About</Link></li>
              <li><Link to="/faq" className="block py-2 text-gray-700 hover:text-[#2E8B57]" onClick={toggleMenu}>FAQ</Link></li>
              <li><Link to="/contact" className="block py-2 text-gray-700 hover:text-[#2E8B57]" onClick={toggleMenu}>Contact</Link></li>
            </ul>
            <div className="border-t border-gray-200 pt-3 pb-4">
              <a
                href="tel:+254117564318"
                className="flex items-center justify-center rounded-md bg-[#D7263D] px-4 py-2 text-white"
                onClick={toggleMenu}
              >
                <Phone size={16} className="mr-2" />
                <span>Call Us</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}