type NavLink = {
    label: string
    href: string
}

type HeaderProps = {
    title: string
    links: NavLink[]
}

function Header({title, links}: HeaderProps) {
    return (
        <header className="header">
            <div className="header-div">
                <div className="header-title-div">
                    { title }
                </div>
                
                <nav className="header-nav">
                    {links.map((link) => (
                        <a key={link.href} href={link.href} className="header-nav-link">
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    )
}

export default Header
