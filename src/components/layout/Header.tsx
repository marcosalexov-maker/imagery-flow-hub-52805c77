import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Portfolio", href: "/portfolio", number: "01" },
  { label: "About", href: "/#about", number: "02" },
  { label: "Journal", href: "/blog", number: "03" },
  { label: "Contact", href: "/#contact", number: "04" },
];

const isActive = (href: string, pathname: string) => {
  if (href === "/portfolio") return pathname.startsWith("/portfolio");
  if (href === "/blog") return pathname.startsWith("/blog");
  return false;
};

const Header = () => {
  const location = useLocation();
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

  // Close popover on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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

          {/* Stacked Menu Pop-up on the right */}
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 font-medium tracking-[0.2em] uppercase text-xs md:text-sm",
                  isOpen
                    ? "bg-white text-black border-white shadow-lg"
                    : "bg-black/50 border-white/20 text-white/80 hover:text-white hover:border-white/50 hover:bg-black/80 backdrop-blur-md"
                )}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <span>{isOpen ? "Close" : "Menu"}</span>
                {isOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              sideOffset={12}
              className="z-50 w-64 md:w-72 p-2.5 rounded-2xl border border-white/15 bg-black/95 backdrop-blur-xl shadow-2xl text-white outline-none"
            >
              <div className="px-3 pt-1.5 pb-2 text-[10px] uppercase tracking-[0.25em] text-white/40 font-semibold border-b border-white/10 mb-2">
                Navigation
              </div>

              {/* Stacked navigation buttons */}
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href, location.pathname);
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={cn(
                        "group flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-300",
                        active
                          ? "bg-white/15 text-white font-medium"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <span className="font-medium tracking-[0.2em] uppercase text-xs md:text-sm">
                        {link.label}
                      </span>
                      <span className="text-[10px] tracking-widest text-white/30 group-hover:text-white/70 transition-colors">
                        {link.number}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-2 mt-2 border-t border-white/10 px-3 pb-1 flex items-center justify-between text-[10px] text-white/40 tracking-wider">
                <span>marcosalexov@gmail.com</span>
                <span>CwB / BR</span>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      {/* Subtle backdrop overlay when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;