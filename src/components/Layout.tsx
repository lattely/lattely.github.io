import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Home, Calendar, User, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Articles' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/about', icon: User, label: 'About' },
    { path: '/contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-semibold text-gray-900">
                Rach
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === item.path
                        ? 'text-black'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-900"
              >
                <Menu size={24} />
              </button>
              {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white shadow-md rounded-md py-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium ${
                          location.pathname === item.path
                            ? 'text-black'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-white border-gray-100 mt-10"></header>

              
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="pt-16"
      >
        {children}
      </motion.div>

      <footer className="bg-white border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Jade Liang. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;