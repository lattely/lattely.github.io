import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ArrowUp, Menu as MenuIcon, Calendar, Tag, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { articles } from '../data/articles';

const ArticleView: React.FC = () => {
  const { id } = useParams();
  const [showToc, setShowToc] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  const article = articles.find(a => a.id === id);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);

      // Update active heading based on scroll position
      const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const scrollPosition = window.scrollY + 100;

      for (const heading of Array.from(headingElements).reverse()) {
        if (heading.getBoundingClientRect().top + window.scrollY <= scrollPosition) {
          const id = heading.getAttribute('id');
          if (id) {
            setActiveHeading(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (article) {
      const extractedHeadings = article.content.split('\n')
        .filter(line => line.startsWith('#'))
        .map(line => {
          const level = line.match(/^#+/)?.[0].length || 1;
          const text = line.replace(/^#+\s+/, '');
          const id = text.toLowerCase().replace(/[^\w]+/g, '-');
          return { id, text, level };
        });
      setHeadings(extractedHeadings);
    }
  }, [article]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto mb-12 pt-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            {format(new Date(article.date), 'MMMM d, yyyy')}
          </div>
          <div className="flex items-center gap-2">
            <Tag size={16} />
            <div className="flex gap-2">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-gray-100 px-2 py-0.5 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            {Math.ceil(article.content.split(' ').length / 200)} min read
          </div>
        </div>
      </motion.header>

      <div>
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`prose prose-lg mx-auto prose-headings:scroll-mt-24 ${
            showToc ? 'lg:mr-[320px]' : ''
          } transition-all duration-300 flex-1`}
          style={{ maxWidth: '100%', overflowX: 'hidden' }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <div className="relative bg-gray-100 p-5">
              <button
              onClick={(event) => {
                navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                const button = event.currentTarget as HTMLButtonElement;
                button.textContent = '✅';
                setTimeout(() => {
                button.textContent = 'Copy';
                }, 2000);
              }}
              className="absolute top-1 right-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded p-1 text-xs"
              >
              Copy
              </button>
              <SyntaxHighlighter
              style={oneLight}
              language={match[1]}
              PreTag="div"
              wrapLongLines={true}
              {...props}
              >
              {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
              },
              h1: ({ children, ...props }) => {
          const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
          return <h1 id={id} {...props} className="break-words">{children}</h1>;
              },
              h2: ({ children, ...props }) => {
          const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
          return <h2 id={id} {...props} className="break-words">{children}</h2>;
              },
              h3: ({ children, ...props }) => {
          const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
          return <h3 id={id} {...props} className="break-words">{children}</h3>;
              },
            }}
          >
            {article.content}
          </ReactMarkdown>
        </motion.article>

        <AnimatePresence>
          {showToc && (
        <motion.aside
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className="fixed top-20 right-8 w-[280px] h-[calc(100vh-6rem)] overflow-y-auto hidden lg:block"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">Table of Contents</h3>
          <button
            onClick={() => setShowToc(false)}
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            <MenuIcon size={20} />
          </button>
            </div>
            <nav className="space-y-1">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`w-full text-left py-1 text-sm transition-colors
            ${heading.level === 1 ? 'pl-0' : `pl-${(heading.level - 1) * 4}`}
            ${activeHeading === heading.id
              ? 'text-black font-medium'
              : 'text-gray-600 hover:text-gray-900'
            }`}
            >
              {heading.text}
            </button>
          ))}
            </nav>
          </div>
        </motion.aside>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!showToc && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowToc(true)}
            className="fixed top-20 right-8 p-2 bg-white rounded-full shadow-sm border border-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <MenuIcon size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArticleView;