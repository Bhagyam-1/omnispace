import React from 'react'
import { NewsArticleI } from '../../_utils/types';
import { getTopNews } from '@/actions/omninews/news';
import { Separator } from '@/components/ui/separator';
import SmallNewsCard from '../news-cards/small-news-card';
// import { tempTopNews } from '../../_utils/config';

const TopNews = async() => {
    const {data: topNews}: {data: NewsArticleI[]} = await getTopNews();
    
    // const topNews: NewsArticleI[] = await new Promise((resolve, reject) => {
    //     resolve(tempTopNews);
    // })

  return (
        topNews.length > 0 ? (
            <section className='w-full my-8 lg:col-span-3' aria-labelledby='top-news'>
                <div className='flex flex-col gap-4'>
                    <h2 className='text-2xl px-4 pt-4 gradient-title' id='top-news'>Top News</h2>
                    <Separator className='mx-4' />
                    
                    <div className='grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] justify-center gap-8 h-fit'>
                        {
                            topNews?.map((article: NewsArticleI) => (
                                <SmallNewsCard key={article.uuid} item={article} />
                            ))
                        }
                    </div>
                </div>
            </section>
        ) : (
            <></>
        )
  )
}

export default TopNews
