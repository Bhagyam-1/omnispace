import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NewsArticleI } from "../../_utils/types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

const NewsCard = ({item}: {item: NewsArticleI}) => {

    return (
        <Link href={`/news/${item.uuid}`} className="w-full h-full">
            <Card className="w-full h-full bg-transparent border-transparent hover:bg-card 
                    hover:border-border transition-colors transition-background duration-300">
                <CardHeader>
                    {item.image_url ? (
                        <img src={item.image_url}
                            height="200px"
                            width="200px"
                            alt={item.title}
                            className="object-cover h-44 sm:h-50 w-full rounded-md"
                        />
                    ) : (
                        <Image src="/newspaper.png"
                            height={200}
                            width={200}
                            alt={item.title}
                            className="object-cover h-44 sm:h-50 w-full rounded-md"
                        />
                    )}
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-lg font-semibold line-clamp-2">
                                {item.title}
                            </h2>
                            <p className="text-sm text-muted-foreground line-clamp-3">
                                {item.description}
                            </p>
                        </div>
                        
                        <div className="flex gap-2">
                            {
                                item.categories?.map((category: string) => (
                                    <Badge 
                                        variant="outline"
                                        key={category}
                                        className="text-sm bg-secondary-background/30 text-secondary-foreground"
                                    >
                                        {category}
                                    </Badge>
                                ))
                            }
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default NewsCard;