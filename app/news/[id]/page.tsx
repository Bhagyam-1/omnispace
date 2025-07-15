import React from 'react'
import { temp } from '../_utils/config';
import { NewsArticleI } from '../_utils/types';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import SimilarNews from '../_components/related-news/related-news';
import TopNews from '../_components/top-news/top-news';
import { getNewsById } from '@/actions/news';
import PageHeader from '@/components/shared/page-header/page-header';

const ArticlePage = async({params}: {params: Promise<{id: string}>}) => {
    const article: NewsArticleI = await new Promise((resolve, reject) => {
        resolve(temp[1]);
    })

    // const {id} = await params;
    // const article: NewsArticleI = await getNewsById(id);

  return (
    <section className='w-full my-16' aria-labelledby='article'>
        <PageHeader backTo="News" backToLink="/news" />
        <div className='grid grid-cols lg:grid-cols-3 gap-4 justify-center'>
            <div 
                className='lg:col-span-2 flex flex-col gap-4 w-fit sm:bg-muted/30 sm:p-7 rounded-lg'
            >
                <div className='flex flex-col gap-2'>
                    <h1 className='text-4xl font-bold pb-2' id='article'>{article.title}</h1>
                    <Separator />
                    <p className='text-muted-foreground'>{new Date(article.published_at).toDateString()}</p>
                </div>
                <p className='text-muted-foreground mt-4'>{article.description}</p>
                <img
                    src={article.image_url} 
                    height="400px" 
                    width="400px" 
                    alt={article.title} 
                    className='w-11/12 h-64 md:h-96 2xl:h-[600px] object-cover rounded-lg my-4'
                />
                <span className='mt-4 text-muted-foreground'>
                    <span>
                        {article.snippet}&nbsp; 
                        <Link href={article.url} target="_blank" rel="noopener noreferrer" className='inline-flex items-center gap-1 text-md'>Read more
                            <ExternalLink className='inline-flex size-4' />
                        </Link>
                    </span>
                </span>
            </div>
            
            <SimilarNews article={article} />
            
            <TopNews />
        </div>
    </section>
  )
}

export default ArticlePage;