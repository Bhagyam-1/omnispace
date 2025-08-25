import { NewsArticleI } from './_utils/types';
import SearchNews from './_components/news-dashboard/search-news';
import LoadMoreTrigger from './_components/news-dashboard/load-more-trigger';
import NewsArticles from './_components/news-dashboard/news-articles';
import { getDashboardNews } from '@/actions/omninews/news';

// const news = await new Promise((resolve, reject) => {
//   resolve(temp)
// });

const NewsPage = async({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) => {
  let page = 1;
  const newsArticles: NewsArticleI[] = [];
  const {categories, region, language, search} = await searchParams;

  const fetchNews = async () => {
    const promises = Array.from({ length: 2 }, (_, i) =>
      getDashboardNews(region as string, language as string, categories as string, search as string, page + i)
    );
    
    const results = await Promise.all(promises);
    newsArticles.push(...results.flat());
    page += 2;

    if(page < 5) await fetchNews();
  };
  
  await fetchNews();

  return (
    <section className="flex flex-col gap-8 w-full my-8">
      <SearchNews />
      <div  className="sm:bg-muted/30 p-0 sm:p-2 md:p-4 rounded-lg">
        <NewsArticles newsArticles={newsArticles}/>
        <LoadMoreTrigger 
          page={page} 
          region={region as string} 
          language={language as string} 
          categories={categories as string} 
          search={search as string}
        />
      </div>
    </section>
  )
}

export default NewsPage;