import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import profileImage from '../assets/1000190228.jpg';

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* reduced opacity so starfield behind is visible */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 dark:from-blue-600/10 dark:to-cyan-600/10 rounded-full blur-3xl animate-pulse opacity-30 dark:opacity-20"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-400/20 to-cyan-400/20 dark:from-blue-600/10 dark:to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000 opacity-30 dark:opacity-20"></div>
      </div>


  <div className="relative z-10 px-4 w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-12 md:gap-16 lg:gap-20">
          {/* Profile Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotate: -10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              type: "spring", 
              stiffness: 100,
              delay: 0.2
            }}
            whileHover={{ 
              scale: 1.05, 
              rotate: [0, -2, 2, -2, 0],
              transition: { duration: 0.6 }
            }}
            className="flex-shrink-0 order-1 md:order-1 mr-0 md:mr-12 lg:mr-20 md:ml-8 lg:ml-16"
          >
            <div className="relative group">
              {/* Ambient shadow glow with animation */}
              <motion.div 
                className="absolute -inset-2 bg-gradient-to-r from-indian-saffron via-indian-blue to-indian-green rounded-full blur-2xl opacity-30 group-hover:opacity-70"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              ></motion.div>
              
              {/* Main profile image with clean gradient border and shadow */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="rounded-full bg-gradient-to-br from-indian-saffron via-indian-blue to-indian-green p-[3px] shadow-2xl shadow-gray-400/50 dark:shadow-gray-900/80"
                  animate={{
                    boxShadow: [
                      "0 25px 50px -12px rgba(255, 153, 51, 0.5)",
                      "0 25px 50px -12px rgba(19, 136, 8, 0.5)",
                      "0 25px 50px -12px rgba(0, 102, 204, 0.5)",
                      "0 25px 50px -12px rgba(255, 153, 51, 0.5)",
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <img
                    src={profileImage}
                    alt="Pavan Lambole"
                    className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 object-cover rounded-full bg-white dark:bg-gray-900"
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              duration: 1, 
              type: "spring", 
              stiffness: 80,
              delay: 0.4
            }}
            className="flex-1 text-center md:text-left order-2 md:order-2 md:pl-6 lg:pl-12"
          >
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1, x: 10 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-4"
            >
              Hi, I'm
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ 
                delay: 0.8, 
                duration: 1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0px 0px 20px rgba(255,153,51,0.8)"
              }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 break-words"
            >
              <motion.span 
                className="bg-gradient-to-r from-indian-saffron via-indian-blue to-indian-green bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Pavan Lambole
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.05, letterSpacing: "0.05em" }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-8 font-light"
            >
              Developer | Innovator | Tech Explorer
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start"
            >
              <motion.button
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    const navbarHeight = 64;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: [0, -3, 3, 0],
                  boxShadow: "0 20px 40px rgba(255,153,51,0.6)"
                }}
                whileTap={{ scale: 0.95, rotate: 0 }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-indian-saffron to-indian-orange text-white rounded-lg font-medium shadow-lg shadow-orange-500/50 text-sm sm:text-base"
              >
                Get In Touch
              </motion.button>
              <motion.button
                onClick={() => {
                  const element = document.getElementById('projects');
                  if (element) {
                    const navbarHeight = 64;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, 3, -3, 0],
                  borderColor: "#138808",
                  backgroundColor: "#138808",
                  color: "#ffffff",
                  boxShadow: "0 20px 40px rgba(19,136,8,0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
                }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 border-2 border-indian-green text-indian-green dark:text-indian-green rounded-lg font-medium text-sm sm:text-base"
              >
                View Projects
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, y: { repeat: Infinity, duration: 1.5 } }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 dark:text-gray-400 hover:text-indian-orange dark:hover:text-indian-green transition-colors cursor-pointer"
      >
        <ChevronDown size={40} />
      </motion.button>
    </section>
  );
};

export default Hero;
