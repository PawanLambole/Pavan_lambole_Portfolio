import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const projects = [
    {
      title: 'Codebidder Platform',
      description: 'A comprehensive client-developer bidding platform built with ASP.NET MVC. Features include requirement uploads, quotation management, admin panel for user management, authentication system, notifications, and project tracking.',
      tech: ['ASP.NET MVC', 'C#', 'Entity Framework', 'SQL Server'],
      gradient: 'from-indian-saffron to-orange-500',
      github: 'https://github.com/PawanLambole/codebidder',
      route: '/projects/codebidder'
    },
    {
      title: 'HAJI Fitness Point',
      description: 'Mobile gym management application built with React Native and Expo. Manages gym members, payment details, and statistics with real-time data storage using Supabase. Features WhatsApp alerts, member search, dashboard, and analytics.',
      tech: ['React Native', 'TypeScript', 'Expo', 'Supabase'],
      gradient: 'from-indian-green to-green-600',
      github: 'https://github.com/PawanLambole/haji-fitness-point',
      route: '/projects/haji-fitness'
    },
    {
      title: 'Project Anwaya',
      description: 'Indian Sign Language to Marathi translation system with real-time gesture recognition. Built using LSTM neural networks and MediaPipe for accurate hand tracking and gesture classification with high-performance translation capabilities.',
      tech: ['Python', 'LSTM', 'MediaPipe', 'TensorFlow', 'OpenCV'],
      gradient: 'from-orange-600 to-indian-saffron',
      github: 'https://github.com/PawanLambole/Project-Anwaya',
      route: '/projects/project-anwaya'
    },
    {
      title: 'StudyGenie',
      description: 'AI-powered study toolkit featuring intelligent flashcards, interactive quizzes, and an AI tutor assistant. Built with React, TypeScript, and Vite for a seamless learning experience with adaptive study recommendations.',
      tech: ['React', 'TypeScript', 'Vite', 'AI/ML'],
      gradient: 'from-indian-green to-emerald-600',
      github: 'https://github.com/PawanLambole/studygenie',
      route: '/projects/studygenie'
    },
    {
      title: 'CMD Helper',
      description: 'A collection of simple Windows command-line utilities and automation scripts. Streamlines everyday tasks like counting files in subfolders, listing directory structures, and automating repetitive command-line operations.',
      tech: ['Batch Script', 'Windows CMD', 'Shell Scripting'],
      gradient: 'from-blue-600 to-indian-blue',
      github: 'https://github.com/PawanLambole/cmd-helper',
      route: '/projects/cmd-helper'
    },
    {
      title: 'Student Adda Nashik',
      description: 'React Native mobile application built with Firebase for student community. Provides platform for students to connect, share resources, and collaborate on projects.',
      tech: ['React Native', 'Firebase', 'JavaScript'],
      gradient: 'from-purple-600 to-pink-600',
      github: 'https://github.com/PawanLambole/Student-Adda-Nashik',
      route: '/projects/student-adda'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const navigate = useNavigate();

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
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              onClick={() => project.route && navigate(project.route)}
              variants={itemVariants}
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
                ]
              }}
              transition={{
                boxShadow: { duration: 3, repeat: Infinity }
              }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
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
      </div>
    </section>
  );
};

export default Projects;
