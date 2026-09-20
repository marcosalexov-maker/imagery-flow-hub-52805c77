import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const NAV_LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/#about" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const isActive = (href: string, pathname: string) => {
  if (href === "/portfolio") return pathname.startsWith("/portfolio");
  if (href === "/blog") return pathname.startsWith("/blog");
  return false;
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when fullscreen menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key to return home and close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleReturnHome();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleReturnHome = () => {
    setIsOpen(false);
    if (location.pathname !== "/" || location.hash) {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/#")) {
      const hash = href.replace("/", "");
      if (location.pathname === "/") {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      <header
        className={`absolute top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isHomepage ? "bg-transparent" : "bg-black"
        }`}
      >
        <div className="container flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight leading-none transition-colors duration-300 text-white"
          >
            Marcos Alex
          </Link>

          {/* Clean Menu Button: pure text, no background, no icon lines */}
          <button
            onClick={() => setIsOpen(true)}
            className="font-medium tracking-[0.2em] uppercase text-xs md:text-sm text-white/70 hover:text-white transition-colors duration-300 focus:outline-none"
            aria-label="Abrir menu"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Fullscreen Pop-up Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-black transition-all duration-500 flex flex-col ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        {/* Top bar with close 'X' button returning to home */}
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={handleReturnHome}
            className="text-2xl font-bold tracking-tight leading-none text-white hover:opacity-80 transition-opacity focus:outline-none"
            aria-label="Voltar para a página inicial"
          >
            Marcos Alex
          </button>

          <button
            onClick={handleReturnHome}
            className="p-2 text-white/80 hover:text-white hover:rotate-90 transition-all duration-300 focus:outline-none"
            aria-label="Fechar menu e retornar à página inicial"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>

        {/* Centered Navigation Options */}
        <nav className="flex-1 flex flex-col items-center justify-center -mt-16">
          <ul className="flex flex-col items-center gap-7 sm:gap-9 md:gap-11">
            {NAV_LINKS.map((link, index) => {
              const active = isActive(link.href, location.pathname);
              return (
                <li
                  key={link.href}
                  className={`transition-all duration-500 ease-out ${
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 80 + 100}ms` : "0ms",
                  }}
                >
                  <Link
                    to={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`block text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center transition-all duration-300 hover:scale-105 ${
                      active ? "text-white" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;