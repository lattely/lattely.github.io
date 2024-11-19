import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { motion } from 'framer-motion';
import type { Article } from '../types';

const Calendar: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const articlesByDate = articles.reduce((acc, article) => {
    const date = format(new Date(article.date), 'yyyy-MM-dd');
    acc[date] = [...(acc[date] || []), article];
    return acc;
  }, {} as Record<string, Article[]>);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
            >
              →
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
          {days.map((day, dayIdx) => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const dayArticles = articlesByDate[dateKey] || [];
            return (
              <motion.div
                key={day.toString()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: dayIdx * 0.02 }}
                className={`min-h-[100px] bg-white p-2 ${
                  dayArticles.length > 0 ? 'cursor-pointer hover:bg-gray-50' : ''
                }`}
              >
                <span className="text-sm text-gray-500">
                  {format(day, 'd')}
                </span>
                {dayArticles.map((article) => (
                  <div
                    key={article.id}
                    className="mt-1 text-xs font-medium text-gray-900 truncate"
                    onClick={() => window.location.href = `/article/${article.id}`}
                  >
                    {article.title}
                  </div>
                  
                ))}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;