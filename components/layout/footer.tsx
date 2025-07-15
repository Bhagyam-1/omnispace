import { Hash, Linkedin, UserRound } from "lucide-react";

const Footer = () => {
    const footerLinks = [
        {
            title: "Portfolio",
            href: "https://portfolio-zeta-six-10.vercel.app",
            icon: <UserRound className="w-8 h-8 p-2 rounded-lg bg-input" />
        },
        {
            title: "Linkedin",
            href: "https://www.linkedin.com/in/bhagyam-pandey-869669192/",
            icon: <Linkedin className="w-8 h-8 p-2 rounded-lg bg-input" />
        },
    ]
    return (
        <footer className="mx-8 mt-20 py-16 border-t">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-neutral-content">
                <aside className="flex items-center gap-2">
                    <Hash className="h-6 w-6" />
                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </aside>

                <nav className="flex items-center gap-4">
                    {footerLinks.map((link) => (
                        <a
                            key={link.title}
                            title={link.title}
                            aria-label={link.title}
                            target="_blank"
                            rel="noopener noreferrer"
                            href={link.href}
                        >
                            {link.icon}
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    )
}

export default Footer;