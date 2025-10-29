import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import profileImage from '../assets/1000190228.jpg';

const About = () => {
  const handleDownloadCV = () => {
    window.open('https://drive.google.com/file/d/17BQYhZmUCfEpL_MzEbqdjkJZVLzQP6s9/view?usp=sharing', '_blank');
  };

  return (
    <section
      id="about"
      className="min-h-screen py-12 sm:py-16 md:py-20 px-4 bg-white dark:bg-gray-900 w-full overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white px-4">
              About <span className="bg-gradient-to-r from-indian-saffron to-indian-green bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-indian-saffron via-white to-indian-green mx-auto rounded-full"></div>
          </motion.div>        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indian-saffron via-white to-indian-green rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Pavan Lambole"
                  className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-2xl"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Passionate Computer Engineering Student
            </h3>

            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I'm Pavan Lambole, a passionate developer exploring the frontiers of technology.
              Currently pursuing B.Tech in Computer Engineering at SVKM's Institute of Technology,
              Dhule, I have hands-on experience in full-stack development.
            </p>

            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              My journey in tech is driven by curiosity and innovation. I specialize in building
              modern web applications using React, Node.js, and various cutting-edge technologies.
              From developing bidding platforms to creating IoT-based solutions, I love turning
              ideas into reality.
            </p>

            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              When I'm not coding, you'll find me contributing to tech communities as Membership
              Chair at ACM Student Chapter or exploring robotics at e-Yantra Robotics Club.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4">
              <motion.button
                onClick={handleDownloadCV}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indian-saffron to-indian-orange text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 text-sm sm:text-base"
              >
                <Download size={18} />
                Download CV
              </motion.button>

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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 py-3 border-2 border-indian-green dark:border-indian-green text-indian-green dark:text-indian-green rounded-lg font-medium hover:bg-indian-green hover:text-white dark:hover:bg-indian-green dark:hover:text-white transition-all duration-300 text-sm sm:text-base"
              >
                Contact Me
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
