import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Product } from '../_utils/types';
import Link from 'next/link';
import * as Icons from 'lucide-react';

const ProductCard = ({product}: {product: Product}) => {
  const Icon = Icons[product.icon as keyof typeof Icons] as React.ElementType;

  return (
    <Link href={product.link}>
      <Card key={product.id} className="hover:shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
          <CardHeader className='flex flex-col gap-3'>
              <div className='p-3 bg-secondary-background/20 rounded-lg'>
              {
                Icon && 
                <Icon
                  aria-label={product.name}
                  className="h-7 w-7 text-secondary-foreground" 
                />
              }
              </div>
              <CardTitle className='text-xl font-bold'>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
              <p className='text-muted-foreground'>{product.description}</p>
          </CardContent>
      </Card>
    </Link>
  )
}

export default ProductCard;
