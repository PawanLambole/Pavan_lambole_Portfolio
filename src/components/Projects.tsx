import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Codebidder Platform',
      description: 'A comprehensive client-developer bidding platform built with ASP.NET MVC. Features include requirement uploads, quotation management, admin panel for user management, authentication system, notifications, and project tracking.',
      tech: ['ASP.NET MVC', 'C#', 'Entity Framework', 'SQL Server'],
      gradient: 'from-indian-saffron to-orange-500',
      github: '#'
    },
    {
      title: 'HAJI Fitness Point',
      description: 'Mobile gym management application built with React Native and Expo. Manages gym members, payment details, and statistics with real-time data storage using Supabase. Features WhatsApp alerts, member search, dashboard, and analytics.',
      tech: ['React Native', 'TypeScript', 'Expo', 'Supabase'],
      gradient: 'from-indian-green to-green-600',
      github: '#'
    },
    {
      title: 'Swamitra',
      description: 'ASP.NET MVC-based project bidding site that connects clients with developers. Features comprehensive project management, bidding system, and workflow automation.',
      tech: ['ASP.NET MVC', 'C#', 'SQL Server'],
      gradient: 'from-indian-blue to-blue-600',
      github: '#'
    },
    {
      title: 'Garbage Classifier Module',
      description: 'IoT-based garbage classification system using ESP32-CAM. Captures images and sends data over MQTT to PC for classification using Python. Results displayed on OLED display for real-time feedback.',
      tech: ['ESP32-CAM', 'C++', 'MQTT', 'Python'],
      gradient: 'from-orange-600 to-indian-saffron',
      github: '#'
    },
    {
      title: 'Student Adda Nashik',
      description: 'React Native mobile application built with Firebase for student community. Provides platform for students to connect, share resources, and collaborate on projects.',
      tech: ['React Native', 'Firebase', 'JavaScript'],
      gradient: 'from-indian-green to-emerald-600',
      github: '#'
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
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>

              <div className="p-6">
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-4`}>
                  <span className="text-2xl text-white font-bold">
                    {project.title.charAt(0)}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {project.title}
                </h3>

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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <Github size={20} />
                    <span className="text-sm font-medium">Code</span>
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
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
