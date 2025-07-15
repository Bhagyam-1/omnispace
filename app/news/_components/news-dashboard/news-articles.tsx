import React from 'react'
import { NewsArticleI } from '@/app/news/_utils/types'
import NewsCard from '../news-cards/news-card'

const NewsArticles = ({newsArticles}: {newsArticles: NewsArticleI[]}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] items-center gap-8 w-full h-fit">
        {
        newsArticles?.map((article: NewsArticleI, index: number) => (
            <NewsCard key={article.uuid} item={article} />
        ))
        }
    </div>
  )
}

export default NewsArticles
