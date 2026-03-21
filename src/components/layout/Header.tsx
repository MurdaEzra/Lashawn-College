import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src="https://res.cloudinary.com/dgfmhyebp/image/upload/v1774090550/Logo_cmr1we.png"
              alt="Lashawn Driving & Computer College"
              className="h-20 md:h-60 lg:h-100 w-auto object-contain" />
            
          </Link>

          <nav className="hidden lg:block flex-1 mx-8">
            <ul className="flex items-center justify-between font-accent text-base font-semibold tracking-wide">
              <li>
                <Link
                  to="/"
                  className="text-brand-charcoal hover:text-brand-green transition-colors">
                  
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/driving-courses"
                  className="text-brand-charcoal hover:text-brand-green transition-colors">
                  
                  Driving
                </Link>
              </li>
              <li>
                <Link
                  to="/computer-courses"
                  className="text-brand-charcoal hover:text-brand-green transition-colors">
                  
                  Computer
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-brand-charcoal hover:text-brand-green transition-colors">
                  
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/fees"
                  className="text-brand-charcoal hover:text-brand-green transition-colors">
                  
                  Fees
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-brand-green font-bold hover:text-brand-green-dark transition-colors">
                  
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-brand-charcoal hover:text-brand-green transition-colors">
                  
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-brand-charcoal hover:text-brand-green transition-colors">
                  
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-brand-charcoal hover:text-brand-green transition-colors">
                  
                  Contact
                </Link>
              </li>
              <li className="border-l border-gray-200 pl-6">
                <Link
                  to="/admin/login"
                  className="text-gray-400 hover:text-brand-green transition-colors text-xs uppercase tracking-widest">
                  
                  Admin
                </Link>
              </li>
            </ul>
          </nav>

          <div className="hidden md:block lg:hidden xl:block flex-shrink-0">
            <a
              href="tel:+254117564318"
              className="flex items-center rounded-full bg-brand-red px-5 py-2.5 font-accent text-sm font-semibold text-white tracking-wide transition-colors hover:bg-brand-red-dark">
              
              <Phone size={15} className="mr-2" />
              +254 117 564 318
            </a>
          </div>

          <button
            className="block lg:hidden ml-4 relative z-50"
            onClick={toggleMenu}
            aria-label="Toggle menu">
            
            {isMenuOpen ?
            <X size={26} className="text-brand-charcoal" /> :

            <Menu size={26} className="text-brand-charcoal" />
            }
          </button>
        </div>
      </div>
      <div className="h-[3px] bg-brand-green"></div>

      {isMenuOpen &&
      <>
          <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={toggleMenu} />
        
          <div className="absolute left-0 right-0 top-full z-40 lg:hidden">
            <div className="mx-4 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <nav className="p-4">
                <ul className="space-y-1 font-accent text-base">
                  <li>
                    <Link
                    to="/"
                    className="block px-4 py-3 text-brand-charcoal hover:text-brand-green hover:bg-brand-cream rounded-xl transition-colors font-semibold"
                    onClick={toggleMenu}>
                    
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                    to="/driving-courses"
                    className="block px-4 py-3 text-brand-charcoal hover:text-brand-green hover:bg-brand-cream rounded-xl transition-colors font-semibold"
                    onClick={toggleMenu}>
                    
                      Driving Courses
                    </Link>
                  </li>
                  <li>
                    <Link
                    to="/computer-courses"
                    className="block px-4 py-3 text-brand-charcoal hover:text-brand-green hover:bg-brand-cream rounded-xl transition-colors font-semibold"
                    onClick={toggleMenu}>
                    
                      Computer Courses
                    </Link>
                  </li>
                  <li>
                    <Link
                    to="/services"
                    className="block px-4 py-3 text-brand-charcoal hover:text-brand-green hover:bg-brand-cream rounded-xl transition-colors font-semibold"
                    onClick={toggleMenu}>
                    
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                    to="/fees"
                    className="block px-4 py-3 text-brand-charcoal hover:text-brand-green hover:bg-brand-cream rounded-xl transition-colors font-semibold"
                    onClick={toggleMenu}>
                    
                      Fees
                    </Link>
                  </li>
                  <li>
                    <Link
                    to="/register"
                    className="block px-4 py-3 text-brand-green hover:bg-brand-cream rounded-xl transition-colors font-bold"
                    onClick={toggleMenu}>
                    
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                    to="/about"
                    className="block px-4 py-3 text-brand-charcoal hover:text-brand-green hover:bg-brand-cream rounded-xl transition-colors font-semibold"
                    onClick={toggleMenu}>
                    
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                    to="/faq"
                    className="block px-4 py-3 text-brand-charcoal hover:text-brand-green hover:bg-brand-cream rounded-xl transition-colors font-semibold"
                    onClick={toggleMenu}>
                    
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                    to="/contact"
                    className="block px-4 py-3 text-brand-charcoal hover:text-brand-green hover:bg-brand-cream rounded-xl transition-colors font-semibold"
                    onClick={toggleMenu}>
                    
                      Contact
                    </Link>
                  </li>
                </ul>
                <div className="border-t border-gray-100 mt-3 pt-3">
                  <Link
                  to="/admin/login"
                  className="block text-center px-4 py-2.5 text-sm text-gray-400 hover:text-brand-green border border-gray-200 rounded-xl transition-colors font-accent"
                  onClick={toggleMenu}>
                  
                    Admin Portal
                  </Link>
                </div>
                <a
                href="tel:+254117564318"
                className="flex items-center justify-center mt-3 rounded-xl bg-brand-red px-4 py-3 text-white font-accent font-semibold"
                onClick={toggleMenu}>
                
                  <Phone size={16} className="mr-2" />
                  Call Us
                </a>
              </nav>
            </div>
          </div>
        </>
      }
    </header>);

}