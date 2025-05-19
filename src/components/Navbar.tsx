import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { useIsMobile } from '../hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from './ui/sheet';
import { X, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(true); // Set to true by default
  const [sheetOpen, setSheetOpen] = useState(false);
  const { isRTL } = useLanguage();
  const location = useLocation();
  const isMobile = useIsMobile();

  const navItems = [
    { name: isRTL ? 'الرئيسية' : 'Home', path: '/' },
    { name: isRTL ? 'من نحن' : 'About Us', path: '/about' },
    { name: isRTL ? 'خدماتنا' : 'Our Services', path: '/services' },
    { name: isRTL ? 'معرض الصور' : 'Gallery', path: '/gallery' },
    { name: isRTL ? 'آراء العملاء' : 'Testimonials', path: '/testimonials' },
    { name: isRTL ? 'تواصل معنا' : 'Contact Us', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        // Only remove the background when not at the top of the home page
        setIsScrolled(location.pathname === '/' ? true : false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  // Close sheet when route changes
  useEffect(() => {
    setSheetOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom mx-auto flex justify-between items-center">
        <Link to="/" className="text-charcoal hover:text-gold transition-colors duration-300 flex items-center gap-2">
          <img
            src="/Logo_and_identity/logo.png"
            alt={isRTL ? 'هبات أيست' : 'Hebat East'}
            className="w-10 h-10 object-contain"
          />
          <h1 className={`text-2xl font-bold ${isRTL ? 'font-tajawal' : 'font-playfair'}`}>
            {isRTL ? 'هبات أيست' : 'Hebat East'}
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-6`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${location.pathname === item.path ? 'text-gold' : 'text-charcoal'} hover:text-gold transition-colors duration-300`}
            >
              {item.name}
            </Link>
          ))}
          <div className="ml-6">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Navigation with Shadcn Sheet Component */}
        <div className={`lg:hidden flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <LanguageSwitcher />
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button
                className={`${isRTL ? 'mr-4' : 'ml-4'} text-charcoal hover:text-gold transition-colors duration-300 p-2 rounded-md hover:bg-gray-100`}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side={isRTL ? "right" : "left"}
              className={`p-0 w-72 ${isRTL ? 'text-right' : 'text-left'}`}
              closeButton={false}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <img
                    src="/Logo_and_identity/logo.png"
                    alt={isRTL ? 'هبات أيست' : 'Hebat East'}
                    className="w-8 h-8 object-contain"
                  />
                  <h2 className={`text-xl font-bold ${isRTL ? 'font-tajawal' : 'font-playfair'}`}>
                    {isRTL ? 'هبات أيست' : 'Hebat East'}
                  </h2>
                </div>
                <button
                  onClick={() => setSheetOpen(false)}
                  className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="py-6 px-4">
                <div className={`flex flex-col space-y-1 ${isRTL ? 'items-end' : 'items-start'}`}>
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block w-full px-4 py-3 rounded-md transition-colors duration-300
                        ${location.pathname === item.path
                          ? 'bg-gold text-white hover:bg-gold-dark'
                          : 'text-charcoal hover:bg-gold/10 hover:text-gold'
                        }
                        ${isRTL ? 'text-right' : 'text-left'}
                      `}
                      onClick={() => setSheetOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className={`mt-auto p-4 border-t text-sm text-gray-500 ${isRTL ? 'text-right' : 'text-left'}`}>
                <p>{isRTL ? 'هبات أيست - خبرة في الإضاءة منذ 1995' : 'Hebat East - Lighting Expertise Since 1995'}</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;