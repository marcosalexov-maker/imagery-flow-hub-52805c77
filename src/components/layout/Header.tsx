import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const NAV_LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/#about" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const linkClass = (active: boolean) =>
  `text-xs md:text-sm font-medium tracking-[0.2em] uppercase leading-none transition-colors duration-300 ${
    active ? "text-white" : "text-white/60 hover:text-white"
  }`;

const isActive = (href: string, pathname: string) => {
  if (href === "/portfolio") return pathname.startsWith("/portfolio");
  if (href === "/blog") return pathname.startsWith("/blog");
  return false;
};

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomepage = location.pathname === "/";

  // Smooth-scroll to section anchors (e.g. /#about, /#contact)
  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return <>
      <header className={`absolute top-0 left-0 right-0 z-50 transition-colors duration-300 ${isHomepage ? "bg-transparent" : "bg-black"}`}>
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold tracking-tight leading-none transition-colors duration-300 text-white">Marcos Alex</Link>

          {/* Desktop: direct navigation links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={linkClass(isActive(link.href, location.pathname))}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile: menu button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden font-medium tracking-[0.2em] uppercase text-sm leading-none text-white/60 hover:text-white transition-colors duration-300"
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu (mobile) */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {/* Dark Overlay Background */}
        <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />

        {/* Menu Content */}
        <div className={`relative z-10 h-full flex flex-col transition-transform duration-500 ease-out ${isMenuOpen ? "translate-y-0" : "-translate-y-8"}`}>
          {/* Menu Header */}
          <div className="container flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold tracking-tight text-white" onClick={() => setIsMenuOpen(false)}>
              Marcos Alex
            </Link>

            <button onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-white font-medium tracking-wide uppercase text-sm hover:opacity-70 transition-opacity" aria-label="Close menu">
              <span>Close</span>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 flex items-center justify-center">
            <ul className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, index) => <li key={link.href} className={`transition-all duration-500 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{
              transitionDelay: isMenuOpen ? `${index * 100 + 200}ms` : "0ms"
            }}>
                  <Link to={link.href} onClick={() => setIsMenuOpen(false)} className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight transition-colors duration-300 ${isActive(link.href, location.pathname) ? "text-white" : "text-white/50 hover:text-white"}`}>
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </nav>
        </div>
      </div>
    </>;
};
export default Header;