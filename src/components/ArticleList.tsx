import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Tag } from 'lucide-react';
import type { Article } from '../types';

const ArticleList: React.FC<{ articles: Article[] }> = ({ articles }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {articles.map((article, index) => (
        <motion.article
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="mb-12"
        >
          <Link to={`/article/${article.id}`}>
            <h2 className="text-2xl font-semibold text-gray-900 hover:text-gray-600 transition-colors">
              {article.title}
            </h2>
          </Link>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              {article.date}
            </div>
            <div className="flex items-center space-x-2">
              <Tag size={16} />
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-4 text-gray-600 line-clamp-3">{article.excerpt}</p>
          <Link
            to={`/article/${article.id}`}
            className="inline-block mt-4 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
          >
            Read more →
          </Link>
        </motion.article>
      ))}
    </div>
  );
};

export default ArticleList;