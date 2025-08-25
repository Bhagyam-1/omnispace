'use client';

import React from 'react'
import IntersectionTrigger from './intersection-trigger';
import { getDashboardNews } from '@/actions/omninews/news';
import { NewsArticleI } from '../../_utils/types';
import { useState } from 'react';
import NewsArticles from './news-articles';

const LoadMoreTrigger = ({page, region, language, categories, search}: {page: number, region: string, language: string, categories: string, search: string}) => {
    const [newsArticle, setNewsArticle] = useState<NewsArticleI[]>([]);
    const [currentPage, setCurrentPage] = useState(page);
    
    
    const handleIntersect = async() => {
      const news = Array.from({length: 1}, (_, i) => getDashboardNews(region, language, categories, search, currentPage + i));
      
      const results = await Promise.all(news);
      // const results = similarNewsHardCoded;

      setNewsArticle(newsArticle => [...newsArticle, ...results.flat()]);
      setCurrentPage(currentPage => currentPage + 1);
    }

  return (
    <>
      <NewsArticles newsArticles={newsArticle}/>
      <IntersectionTrigger onIntersect={handleIntersect} />
    </>
  )
}

export default LoadMoreTrigger;