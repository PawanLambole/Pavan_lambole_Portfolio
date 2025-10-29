import { motion } from 'framer-motion';
import { Briefcase, Award, Users, Cpu } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Membership Chair',
      organization: 'ACM Student Chapter at SVKMIOT',
      location: 'Dhule',
      period: '2023 - Present',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      description: [
        'Organizing chapter initiatives, technical events, workshops, and coding challenges',
        'Facilitated industry collaborations and tech talks',
        'Promoting student development and learning through various events'
      ]
    },
    {
      title: 'Member',
      organization: 'e-Yantra Robotics Club at SVKMIOT',
      location: 'Dhule',
      period: '2023 - Present',
      icon: Cpu,
      color: 'from-green-500 to-emerald-500',
      description: [
        'Led and instructed hands-on robotics workshops',
        'Enhanced participants practical skills in robotics and automation',
        'Collaborated on innovative projects for cutting-edge robotic solutions'
      ]
    },
    {
      title: 'Software Developer Intern',
      organization: 'Codsoft',
      location: 'Remote',
      period: '2024',
      icon: Briefcase,
      color: 'from-orange-500 to-red-500',
      description: [
        'Focused on Java Programming fundamentals',
        'Developed practical applications and projects',
        'Gained industry experience in software development'
      ]
    },
    {
      title: 'Innovision Project Competition Winner',
      organization: 'SVKM Institute of Technology',
      location: 'Dhule',
      period: '2025',
      icon: Award,
      color: 'from-violet-500 to-purple-500',
      description: [
        'First place in institutional project competition',
        'Presented innovative technical solution',
        'Demonstrated excellence in project development'
      ]
    }
  ];

  return (
    <section
      id="experience"
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
            Experience & <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Achievements</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 px-4">
            My journey and milestones
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-cyan-600 hidden lg:block"></div>

          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col lg:flex-row gap-6 sm:gap-8 items-center ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-white dark:bg-gray-900 rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                    >
                      <div className={`flex items-center gap-3 mb-3 ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${exp.color} flex items-center justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                          <Icon className="text-white" size={20} />
                        </div>
                        <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                            {exp.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            {exp.period}
                          </p>
                        </div>
                      </div>

                      <p className="text-base sm:text-lg font-semibold text-blue-600 dark:text-cyan-400 mb-2">
                        {exp.organization}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mb-4">
                        {exp.location}
                      </p>

                      <ul className={`space-y-2 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-gray-700 dark:text-gray-300 text-sm flex items-start gap-2">
                            <span className={`${isEven ? 'lg:order-2' : 'lg:order-1'} flex-1`}>{item}</span>
                            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${exp.color} mt-2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}></span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  <div className="hidden lg:flex w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 items-center justify-center shadow-lg z-10">
                    <div className="w-4 h-4 rounded-full bg-white dark:bg-gray-900"></div>
                  </div>

                  <div className="flex-1"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 sm:p-8 text-white text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Certifications</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 w-full sm:min-w-[200px] sm:w-auto">
              <p className="font-semibold">Programming in Python</p>
              <p className="text-sm opacity-90">NPTEL Online Certification</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
