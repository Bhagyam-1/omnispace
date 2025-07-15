import ModeToggle from './mode-toggle';
import Logo from './logo';
import AuthBtns from './auth-btns';
import { SidebarTrigger } from '@/components/ui/sidebar';

type HeaderProps = {
  showSidebar?: boolean;
}

const Header = (
  {
    showSidebar = false
  }: HeaderProps
) => {
    return (
      <header className="sticky top-0 w-full border-b bg-background/80 backdrop-blur-md z-10 supports-[backdrop-filter]:bg-background/60">
          <nav className="flex flex-1 justify-between items-center gap-2 sm:gap-4 px-2 sm:px-4 md:px-8 py-4">
            {
              showSidebar ?
              <>
                <SidebarTrigger className='w-9 h-9 text-xl block md:hidden' /> 
                <Logo showSidebar={true} /> 
              </> :
              <Logo /> 
            }
            <div className='flex justify-end items-center gap-2 sm:gap-4 md:gap-6'>
              <ModeToggle />
              <AuthBtns />
            </div>
          </nav>
      </header>
    )
}

export default Header;