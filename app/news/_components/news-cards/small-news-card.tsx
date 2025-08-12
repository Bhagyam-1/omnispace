import Link from 'next/link';
import { NewsArticleI } from '../../_utils/types';
import Image from 'next/image';

const SmallNewsCard = ({item}: {item: NewsArticleI}) => {
  return (
    <Link href={`/news/${item.uuid}`}>
      <div 
        className='min-h-max h-full w-fit flex flex-col gap-4 border border-transparent 
          hover:border-border hover:bg-muted/30 p-4 rounded-lg 
          transition-colors transition-background duration-300'
      >
        <h3 className='text-lg font-semibold line-clamp-1 sm:line-clamp-2'>
            {item.title}
        </h3>
        {
          item.image_url ? (
            <img
                src={item.image_url}
                height="80px"
                width="80px"
                alt={item.title}
                className="object-cover h-full max-h-32 sm:max-h-44 w-full rounded-md"
            /> ) : (
            <Image src="/newspaper.png"
                height={200}
                width={200}
                alt={item.title}
                className="object-cover h-44 sm:h-50 w-full rounded-md"
            />
          )
        }
      </div>
    </Link>
  )
}

export default SmallNewsCard;