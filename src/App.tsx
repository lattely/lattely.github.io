import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ArticleList from './components/ArticleList';
import ArticleView from './components/ArticleView';
import Calendar from './components/Calendar';
import About from './components/About';
import { articles } from './data/articles';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ArticleList articles={articles} />} />
          <Route path="/article/:id" element={<ArticleView />} />
          <Route path="/calendar" element={<Calendar articles={articles} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;