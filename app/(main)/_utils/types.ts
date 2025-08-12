import * as Icons from 'lucide-react';

export type Product = {
    id: number;
    name: string;
    description: string;
    icon: keyof typeof Icons;
    link: string;
}