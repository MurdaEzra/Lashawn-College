import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white">
      {/* Green accent top border */}
      <div className="h-1 bg-brand-green"></div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <img
              src="https://res.cloudinary.com/dgfmhyebp/image/upload/v1774090550/Logo_cmr1we.png"
              alt="Lashawn Driving & Computer College"
              className="h-20 md:h-60 lg:h-100 w-auto object-contain mb-5 brightness-0 invert" />
            
            <p className="font-body text-gray-400 leading-relaxed">
              Professional driving and computer instruction in a friendly,
              safety-first environment. Learn with experts and build valuable
              skills for your future.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://facebook.com"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Facebook">
                
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Instagram">
                
                <Instagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Twitter">
                
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3 font-accent text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors">
                  
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/driving-courses"
                  className="text-gray-400 hover:text-white transition-colors">
                  
                  Driving Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/computer-courses"
                  className="text-gray-400 hover:text-white transition-colors">
                  
                  Computer Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-white transition-colors">
                  
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/fees"
                  className="text-gray-400 hover:text-white transition-colors">
                  
                  Fee Structure
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-gray-400 hover:text-white transition-colors">
                  
                  Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white mb-5">
              Company
            </h3>
            <ul className="space-y-3 font-accent text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors">
                  
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-white transition-colors">
                  
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors">
                  
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white mb-5">
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin
                  className="mr-3 mt-0.5 flex-shrink-0 text-brand-green"
                  size={16} />
                
                <span className="font-body text-sm text-gray-400">
                  Along Eldoret Roadblock — Opposite Khetias Supermarket
                </span>
              </div>
              <div className="flex items-center">
                <Phone
                  className="mr-3 flex-shrink-0 text-brand-green"
                  size={16} />
                
                <a
                  href="tel:+254117564318"
                  className="font-accent text-sm text-gray-400 hover:text-white transition-colors">
                  
                  +254 117 564 318
                </a>
              </div>
              <div className="flex items-center">
                <Mail
                  className="mr-3 flex-shrink-0 text-brand-green"
                  size={16} />
                
                <a
                  href="mailto:lashawnlimited@gmail.com"
                  className="font-body text-sm text-gray-400 hover:text-white transition-colors">
                  
                  lashawnlimited@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between">
          <p className="font-accent text-xs text-gray-500">
            © {new Date().getFullYear()} Lashawn Driving &amp; Computer
            College. All rights reserved.
          </p>
          <p className="font-accent text-xs text-gray-600 mt-2 md:mt-0">
            Eldoret, Kenya
          </p>
        </div>
      </div>
    </footer>);

}