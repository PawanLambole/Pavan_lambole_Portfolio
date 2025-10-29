import { motion } from 'framer-motion';
import { Code2, Server, Database, Wrench } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: Code2,
      color: 'from-indian-saffron to-orange-500',
      skills: ['React', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS']
    },
    {
      title: 'Backend',
      icon: Server,
      color: 'from-indian-green to-green-600',
      skills: ['Node.js', 'Express.js', 'ASP.NET MVC', 'C#']
    },
    {
      title: 'Database',
      icon: Database,
      color: 'from-indian-blue to-blue-600',
      skills: ['MongoDB', 'MySQL', 'SQL Server', 'Supabase']
    },
    {
      title: 'Tools',
      icon: Wrench,
      color: 'from-orange-600 to-indian-saffron',
      skills: ['Git', 'GitHub', 'Firebase', 'VS Code', 'Expo']
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section
      id="skills"
      className="min-h-screen py-12 sm:py-16 md:py-20 px-4 bg-gray-50 dark:bg-gray-800 w-full overflow-hidden"
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
            Technical <span className="bg-gradient-to-r from-indian-saffron to-indian-green bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-indian-saffron via-white to-indian-green mx-auto rounded-full"></div>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 px-4">
            Technologies and tools I work with
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 mx-auto`}>
                  <Icon className="text-white" size={32} />
                </div>

                <h3 className="text-xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                  {category.title}
                </h3>

                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: skillIndex * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`}></div>
                      <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16 bg-gradient-to-r from-indian-saffron via-white to-indian-green rounded-xl p-6 sm:p-8 text-gray-900"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">Additional Expertise</h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {['Python', 'C++', 'IoT', 'MQTT', 'React Native', 'Entity Framework', 'ESP32'].map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-medium"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
