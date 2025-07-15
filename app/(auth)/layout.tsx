import Logo from "@/components/layout/logo";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="flex flex-col items-center min-h-screen gap-16 p-8">
            <header className="flex items-center w-full px-4">
                <Logo />
            </header>
            
            <main>
                {children}
            </main>
        </div>
    )
};

export default AuthLayout;