import { Link } from "react-router-dom";
import { Linkedin, Instagram } from "lucide-react";
import siteContent from "@/content/siteContent";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { footer, brand } = siteContent;

  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link to="/" className="font-bold tracking-tight text-lg">
              {footer.brandName}
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              {footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{footer.exploreHeading}</h4>
            <nav className="flex flex-col gap-3">
              <Link
                to="/portfolio"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {footer.portfolioLinkLabel}
              </Link>
              <Link
                to="/blog"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {footer.blogLinkLabel}
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{footer.connectHeading}</h4>
            <div className="flex flex-col gap-3 text-muted-foreground">
              {/* Social Media Icons */}
              <div className="flex items-center gap-4 mb-1">
                <a
                  href={brand.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-white transition-colors duration-300 focus:outline-none"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 stroke-[1.5]" />
                </a>
                <a
                  href={brand.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-white transition-colors duration-300 focus:outline-none"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 stroke-[1.5]" />
                </a>
              </div>

              <a
                href={`mailto:${footer.email}`}
                className="hover:text-foreground transition-colors"
              >
                {footer.email}
              </a>
              <span>{footer.location}</span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {footer.brandName}. {footer.copyrightSuffix}
          </p>
          <p className="text-sm text-muted-foreground">{footer.signature}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;