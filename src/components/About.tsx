import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <img
          src="src/image/animal.jpeg"
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Jade Liang</h1>
        <p className="text-xl text-gray-600">Software Engineer & Writer</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="prose prose-lg mx-auto"
      >
        <p>
          Hello! I'm a software engineer with a passion for creating elegant solutions to complex problems. I specialize in web development and enjoy writing about technology, programming, and personal growth.
        </p>

        <h2>Experience</h2>
        <ul>
          <li>Frontend Developer at Publisher (2023-Present)</li>
        </ul>

        <h2>Skills</h2>
        <div className="flex flex-wrap gap-2 not-prose">
          {['JavaScript', 'TypeScript', 'React', 'Vue', 'Node.js', 'Python'].map((skill) => (
            <span
              key={skill}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 flex justify-center space-x-6"
      >
        {[
          { icon: Github, href: 'https://github.com/lattely' },
          { icon: Twitter, href: 'https://twitter.com' },
          { icon: Linkedin, href: 'https://linkedin.com' },
          { icon: Mail, href: 'mailto:ylianggeom@foxmail.com' },
        ].map(({ icon: Icon, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            <Icon size={24} />
          </a>
        ))}
      </motion.div>
    </div>
  );
};

export default About;