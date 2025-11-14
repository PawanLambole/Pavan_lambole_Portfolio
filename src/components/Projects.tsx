import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projects = [
    {
      title: 'Codebidder Platform',
      description: 'A comprehensive client-developer bidding platform built with ASP.NET MVC. Features include requirement uploads, quotation management, admin panel for user management, authentication system, notifications, and project tracking.',
      tech: ['ASP.NET MVC', 'C#', 'Entity Framework', 'SQL Server'],
      gradient: 'from-indian-saffron to-orange-500',
      github: 'https://github.com/PawanLambole/codebidder',
      screenshots: [
        'https://raw.githubusercontent.com/PawanLambole/codebidder/main/images/homepage.jpg',
        'https://raw.githubusercontent.com/PawanLambole/codebidder/main/images/submitproject.jpg',
        'https://raw.githubusercontent.com/PawanLambole/codebidder/main/images/viewquotations.jpg',
        'https://raw.githubusercontent.com/PawanLambole/codebidder/main/images/quotationdetails.jpg',
        'https://raw.githubusercontent.com/PawanLambole/codebidder/main/images/submitquotation.jpg',
        'https://raw.githubusercontent.com/PawanLambole/codebidder/main/images/quatationreport.jpg',
      ]
    },
    {
      title: 'HAJI Fitness Point',
      description: 'Mobile gym management application built with React Native and Expo. Manages gym members, payment details, and statistics with real-time data storage using Supabase. Features WhatsApp alerts, member search, dashboard, and analytics.',
      tech: ['React Native', 'TypeScript', 'Expo', 'Supabase'],
      gradient: 'from-indian-green to-green-600',
      github: 'https://github.com/PawanLambole/haji-fitness-point',
      screenshots: [
        'https://raw.githubusercontent.com/PawanLambole/haji-fitness-point/main/images/splash.jpg',
        'https://raw.githubusercontent.com/PawanLambole/haji-fitness-point/main/images/login.jpg',
        'https://raw.githubusercontent.com/PawanLambole/haji-fitness-point/main/images/dashboard.jpg',
        'https://raw.githubusercontent.com/PawanLambole/haji-fitness-point/main/images/members%20list.jpg',
        'https://raw.githubusercontent.com/PawanLambole/haji-fitness-point/main/images/add%20member.jpg',
        'https://raw.githubusercontent.com/PawanLambole/haji-fitness-point/main/images/edit%20member.jpg',
        'https://raw.githubusercontent.com/PawanLambole/haji-fitness-point/main/images/profile.jpg',
      ]
    },
    {
      title: 'Project Anwaya',
      description: 'Indian Sign Language to Marathi translation system with real-time gesture recognition. Built using LSTM neural networks and MediaPipe for accurate hand tracking and gesture classification with high-performance translation capabilities.',
      tech: ['Python', 'LSTM', 'MediaPipe', 'TensorFlow', 'OpenCV'],
      gradient: 'from-orange-600 to-indian-saffron',
      github: 'https://github.com/PawanLambole/Project-Anwaya',
    },
    {
      title: 'StudyGenie',
      description: 'AI-powered study toolkit featuring intelligent flashcards, interactive quizzes, and an AI tutor assistant. Built with React, TypeScript, and Vite for a seamless learning experience with adaptive study recommendations.',
      tech: ['React', 'TypeScript', 'Vite', 'AI/ML'],
      gradient: 'from-indian-green to-emerald-600',
      github: 'https://github.com/PawanLambole/studygenie',
    },
    {
      title: 'CMD Helper',
      description: 'A collection of simple Windows command-line utilities and automation scripts. Streamlines everyday tasks like counting files in subfolders, listing directory structures, and automating repetitive command-line operations.',
      tech: ['Batch Script', 'Windows CMD', 'Shell Scripting'],
      gradient: 'from-blue-600 to-indian-blue',
      github: 'https://github.com/PawanLambole/cmd-helper',
    },
    {
      title: 'Student Adda Nashik',
      description: 'React Native mobile application built with Firebase for student community. Provides platform for students to connect, share resources, and collaborate on projects.',
      tech: ['React Native', 'Firebase', 'JavaScript'],
      gradient: 'from-purple-600 to-pink-600',
      github: 'https://github.com/PawanLambole/Student-Adda-Nashik',
    }
  ];

  const openProjectDetails = (projectTitle: string) => {
    setExpandedProject(projectTitle);
    setCurrentImageIndex(0);
  };

  const closeProjectDetails = () => {
    setExpandedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = (screenshotCount: number) => {
    setCurrentImageIndex((prev) => (prev + 1) % screenshotCount);
  };

  const prevImage = (screenshotCount: number) => {
    setCurrentImageIndex((prev) => (prev - 1 + screenshotCount) % screenshotCount);
  };

  const expandedProjectData = projects.find(p => p.title === expandedProject);

  return (
    <section
      id="projects"
      className="min-h-screen py-12 sm:py-16 md:py-20 px-4 bg-white dark:bg-gray-900 w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white px-4">
            Featured <span className="bg-gradient-to-r from-indian-saffron to-indian-green bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-indian-saffron via-white to-indian-green mx-auto rounded-full"></div>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 px-4">
            Some of my recent work and contributions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              onClick={() => project.screenshots && openProjectDetails(project.title)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ 
                y: -20, 
                scale: 1.05,
                rotate: [0, -2, 2, 0],
                boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                transition: { duration: 0.4 }
              }}
              whileTap={{ scale: 0.98 }}
              animate={{
                boxShadow: [
                  "0 10px 30px rgba(0,0,0,0.1)",
                  "0 15px 40px rgba(0,0,0,0.15)",
                  "0 10px 30px rgba(0,0,0,0.1)"
                ],
                transition: {
                  boxShadow: { duration: 3, repeat: Infinity }
                }
              }}
              className={`bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 ${project.screenshots ? 'cursor-pointer' : ''}`}
            >
              <motion.div 
                className={`h-2 bg-gradient-to-r ${project.gradient}`}
                whileHover={{ height: "8px" }}
                transition={{ duration: 0.3 }}
              ></motion.div>

              <div className="p-6">
                <motion.div 
                  className={`w-16 h-16 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-4`}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 360,
                    boxShadow: "0 10px 30px rgba(255,153,51,0.5)"
                  }}
                  transition={{ type: "spring", stiffness: 200 }}
                  animate={{
                    rotate: [0, 10, -10, 0],
                    transition: { duration: 4, repeat: Infinity }
                  }}
                >
                  <span className="text-2xl text-white font-bold">
                    {project.title.charAt(0)}
                  </span>
                </motion.div>

                <motion.h3 
                  className="text-xl font-bold mb-3 text-gray-900 dark:text-white"
                  whileHover={{ scale: 1.05, x: 10, color: "#FF9933" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {project.title}
                </motion.h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.15, 
                      x: 5,
                      rotate: [0, -5, 5, 0],
                      color: "#0066CC"
                    }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      y: [0, -3, 0]
                    }}
                    transition={{
                      y: { duration: 2, repeat: Infinity }
                    }}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    <Github size={20} />
                    <span className="text-sm font-medium">Code</span>
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ 
                      scale: 1.15, 
                      x: 5,
                      rotate: [0, 5, -5, 0],
                      color: "#138808"
                    }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      y: [0, -3, 0]
                    }}
                    transition={{
                      y: { duration: 2, repeat: Infinity, delay: 0.5 }
                    }}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    <ExternalLink size={20} />
                    <span className="text-sm font-medium">Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Expandable Project Details Modal */}
        <AnimatePresence>
          {expandedProject && expandedProjectData?.screenshots && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={closeProjectDetails}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {expandedProjectData.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {expandedProjectData.description}
                    </p>
                  </div>
                  <button
                    onClick={closeProjectDetails}
                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {expandedProjectData.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Image Gallery */}
                <div className="relative">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    src={expandedProjectData.screenshots[currentImageIndex]}
                    alt={`${expandedProjectData.title} screenshot ${currentImageIndex + 1}`}
                    className={`w-full rounded-lg shadow-lg ${expandedProjectData.title === 'HAJI Fitness Point' ? 'max-w-md mx-auto aspect-[9/16] object-cover' : 'object-contain max-h-[500px]'}`}
                  />
                  
                  {expandedProjectData.screenshots.length > 1 && (
                    <>
                      <button
                        onClick={() => prevImage(expandedProjectData.screenshots.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={() => nextImage(expandedProjectData.screenshots.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
                      >
                        <ChevronRight size={24} />
                      </button>
                      <div className="flex justify-center gap-2 mt-4">
                        {expandedProjectData.screenshots.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === currentImageIndex
                                ? 'bg-indian-saffron w-8'
                                : 'bg-gray-400 dark:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="flex gap-4 mt-6">
                  <a
                    href={expandedProjectData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:scale-105 transition-transform font-medium"
                  >
                    <Github size={20} />
                    View on GitHub
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
