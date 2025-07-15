import React from 'react';
import { NewsArticleI } from '../../_utils/types';
import { getSimilarNews } from '@/actions/news';
import SmallNewsCard from '../news-cards/small-news-card';
import { Separator } from '@/components/ui/separator';
import { similarNewsHardCoded } from '../../_utils/config';

const RelatedNews = async({article}: {article: NewsArticleI}) => {
    // const {meta: paginationDetails, data: relatedNews}: {meta: any, data: NewsArticleI[]} = await getSimilarNews(article.uuid);

    const relatedNews: NewsArticleI[] = await new Promise((resolve, reject) => {
        resolve(similarNewsHardCoded);
    })
    
    return (
        <aside className='md:col-span-1 sm:bg-muted/30 sm:p-4 rounded-lg' aria-labelledby='related-news'>
            <div className='flex flex-col gap-4'>
                <h2 className='text-2xl px-4 pt-4 gradient-title' id='related-news'>Related News</h2>
                <Separator />
                
                {relatedNews.length > 0 ? (
                <div className='grid grid-cols justify-center gap-4 h-fit'>
                    {
                        relatedNews?.map((article: NewsArticleI, articleIndex: number) => (
                            <div key={article.uuid} className='h-fit flex flex-col gap-4'>
                                <SmallNewsCard item={article} />
                                {articleIndex < relatedNews.length - 1 && <Separator />}
                            </div>
                        ))
                    }
                </div>
                ) : (
                    <p className='text-center text-muted-foreground my-8'>No related news found</p>
                )}
            </div>
        </aside>
    )
}

export default RelatedNews;
