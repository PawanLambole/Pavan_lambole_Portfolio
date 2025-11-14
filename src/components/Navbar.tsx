import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navbar = ({ isDark, toggleTheme }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showProjectsMenu, setShowProjectsMenu] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 64; // Height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      // Close menu first
      setIsMobileMenuOpen(false);
      
      // Then scroll after a short delay
      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg sm:text-xl md:text-2xl font-bold"
          >
            <span className="bg-gradient-to-r from-indian-saffron via-blue-500 to-indian-green bg-clip-text text-transparent">
              Pavan Lambole
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors relative ${
                  activeSection === item.id
                    ? 'text-indian-saffron dark:text-indian-green'
                    : 'text-gray-700 dark:text-gray-300 hover:text-indian-saffron dark:hover:text-indian-green'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indian-saffron to-indian-green"
                  />
                )}
              </button>
            ))}
            <div className="relative" onMouseLeave={() => setShowProjectsMenu(false)}>
              <button onMouseEnter={() => setShowProjectsMenu(true)} className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indian-saffron dark:hover:text-indian-green">
                Project Pages ▾
              </button>
              <AnimatePresence>
                {showProjectsMenu && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-2 z-50">
                    {[
                      { label: 'Codebidder', to: '/projects/codebidder' },
                      { label: 'HAJI Fitness', to: '/projects/haji-fitness' },
                      { label: 'Project Anwaya', to: '/projects/project-anwaya' },
                      { label: 'StudyGenie', to: '/projects/studygenie' },
                      { label: 'CMD Helper', to: '/projects/cmd-helper' },
                    ].map((p) => (
                      <Link key={p.to} to={p.to} className="block px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        {p.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    scrollToSection(item.id);
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-orange-50 dark:bg-gray-800 text-indian-saffron dark:text-indian-green font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                <div className="px-4 py-2 text-xs uppercase tracking-wide text-gray-500">Project Pages</div>
                {[
                  { label: 'Codebidder', to: '/projects/codebidder' },
                  { label: 'HAJI Fitness', to: '/projects/haji-fitness' },
                  { label: 'Project Anwaya', to: '/projects/project-anwaya' },
                  { label: 'StudyGenie', to: '/projects/studygenie' },
                  { label: 'CMD Helper', to: '/projects/cmd-helper' },
                ].map((p) => (
                  <Link key={p.to} to={p.to} className="block w-full text-left px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
