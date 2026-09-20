import { Link } from "react-router-dom";
import { Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link to="/" className="font-bold tracking-tight text-lg">
              Marcos Alex
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              Visual storytelling to add value to your brand
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <nav className="flex flex-col gap-3">
              <Link
                to="/portfolio"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Portfolio
              </Link>
              <Link
                to="/blog"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex flex-col gap-3 text-muted-foreground">
              {/* Social Media Icons */}
              <div className="flex items-center gap-4 mb-1">
                <a
                  href="https://www.linkedin.com/in/marcos-alex/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-white transition-colors duration-300 focus:outline-none"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 stroke-[1.5]" />
                </a>
                <a
                  href="https://www.instagram.com/marcos_lex1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-white transition-colors duration-300 focus:outline-none"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 stroke-[1.5]" />
                </a>
              </div>

              <a
                href="mailto:marcosalexov@gmail.com"
                className="hover:text-foreground transition-colors"
              >
                marcosalexov@gmail.com
              </a>
              <span>CwB/PR - Brazil</span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Marcos Alex. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Crafted with intention</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;