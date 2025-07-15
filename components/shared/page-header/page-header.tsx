import { ArrowLeft } from 'lucide-react';
import { Button } from '../../ui/button';
import Link from 'next/link';

type PageHeaderProps = {
    backTo: string;
    backToLink: string;
}

const PageHeader = ({
    backTo,
    backToLink
}: PageHeaderProps) => {
  return (
      <Link href={backToLink} className='w-full flex mb-12'>
        <Button variant="outline" size="lg" className='cursor-pointer'>
            <ArrowLeft className="h-4 w-4" />
            Back to {backTo}
        </Button>
      </Link>
  )
}

export default PageHeader;