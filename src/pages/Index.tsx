import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Eye, Sparkles, Clapperboard, Camera, MessageCircle, Send, CheckCircle, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { usePortfolioList } from "@/hooks/usePortfolio";
import PortfolioSlider from "@/components/portfolio/PortfolioSlider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

import { HeroContent, HeroItem, FadeUp, SectionHeader, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import { TypingHeading } from "@/components/ui/typing-heading";
import HeroSlider from "@/components/HeroSlider";
import AboutCarousel from "@/components/AboutCarousel";
import siteContent from "@/content/siteContent";

const CONTACT_EMAIL = siteContent.brand.email;

const ContactFormCard = () => {
  const { toast } = useToast();
  const formCopy = siteContent.home.contactSection.form;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
    website: "", // Honeypot field - should remain empty
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = formCopy.nameError;
    }
    if (!formData.email.trim()) {
      newErrors.email = formCopy.emailErrorEmpty;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = formCopy.emailErrorInvalid;
    }
    if (!formData.message.trim()) {
      newErrors.message = formCopy.messageError;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (formData.website) return; // Honeypot filled by bot

    const subject = `New project inquiry — ${formData.projectType.trim() || "General"}`;
    const accessKey = siteContent.brand.web3FormsAccessKey?.trim();
    const formspreeUrl = siteContent.brand.formspreeUrl?.trim();

    // Direct asynchronous submission via Web3Forms or Formspree webhook:
    if (accessKey || formspreeUrl) {
      setIsSubmitting(true);
      try {
        const endpoint = formspreeUrl || "https://api.web3forms.com/submit";
        const payload = accessKey
          ? {
              access_key: accessKey,
              subject,
              from_name: `${formData.name.trim()} (Marcos Alex Portfolio)`,
              name: formData.name.trim(),
              email: formData.email.trim(),
              project_type: formData.projectType.trim() || "—",
              message: formData.message.trim(),
              botcheck: "",
            }
          : {
              name: formData.name.trim(),
              email: formData.email.trim(),
              projectType: formData.projectType.trim() || "—",
              message: formData.message.trim(),
              _subject: subject,
            };

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && data.success !== false) {
          setIsSubmitted(true);
          toast({
            title: formCopy.successTitle,
            description: formCopy.successDescription,
          });
          return;
        } else {
          throw new Error(data.message || "Failed to submit form");
        }
      } catch (error) {
        console.error("Direct form submission error:", error);
        // Fallback to mailto if webhook fails
        const body = `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\nProject Type: ${formData.projectType.trim() || "—"}\n\n${formData.message.trim()}`;
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        toast({
          title: "Notice",
          description: "Could not send automatically. Opening your email client instead.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Default fallback when no webhook access key is configured yet
      const body = `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\nProject Type: ${formData.projectType.trim() || "—"}\n\n${formData.message.trim()}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      setIsSubmitted(true);
      toast({
        title: "Message ready!",
        description: "Your email client has been opened with your message.",
      });
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", projectType: "", message: "", website: "" });
    setErrors({});
    setIsSubmitted(false);
  };

  const inputClass = (field: string) =>
    `rounded-xl h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30 focus-visible:ring-offset-0 ${errors[field] ? "border-red-400/70" : ""}`;

  return (
    <div className="w-full max-w-2xl rounded-4xl bg-white/5 border border-white/10 p-6 md:p-8 text-left">
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-xl font-normal mb-2">{formCopy.successTitle}</h3>
          <p className="text-white/60 text-sm max-w-sm">
            {formCopy.successDescription}
          </p>
          <button
            type="button"
            onClick={resetForm}
            className="mt-6 inline-flex items-center justify-center gap-2 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 px-8 py-3.5"
          >
            {formCopy.resetButton}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
          {/* Honeypot field - hidden from users, bots will fill it */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="cta-website">Website</label>
            <input
              type="text"
              id="cta-website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="cta-name" className="text-sm font-medium text-white/80">
                {formCopy.nameLabel}
              </label>
              <Input
                id="cta-name"
                name="name"
                placeholder={formCopy.namePlaceholder}
                value={formData.name}
                onChange={handleChange}
                maxLength={200}
                className={inputClass("name")}
              />
              {errors.name && <p className="text-sm text-red-300/90">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="cta-email" className="text-sm font-medium text-white/80">
                {formCopy.emailLabel}
              </label>
              <Input
                id="cta-email"
                name="email"
                type="email"
                placeholder={formCopy.emailPlaceholder}
                value={formData.email}
                onChange={handleChange}
                maxLength={254}
                className={inputClass("email")}
              />
              {errors.email && <p className="text-sm text-red-300/90">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="cta-project-type" className="text-sm font-medium text-white/80">
              {formCopy.projectTypeLabel}
            </label>
            <Input
              id="cta-project-type"
              name="projectType"
              placeholder={formCopy.projectTypePlaceholder}
              value={formData.projectType}
              onChange={handleChange}
              maxLength={200}
              className={inputClass("projectType")}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="cta-message" className="text-sm font-medium text-white/80">
              {formCopy.messageLabel}
            </label>
            <Textarea
              id="cta-message"
              name="message"
              placeholder={formCopy.messagePlaceholder}
              rows={5}
              value={formData.message}
              onChange={handleChange}
              maxLength={10000}
              className={`rounded-xl resize-none bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30 focus-visible:ring-offset-0 ${errors.message ? "border-red-400/70" : ""}`}
            />
            {errors.message && <p className="text-sm text-red-300/90">{errors.message}</p>}
          </div>

          <div className="flex justify-center pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300 px-8 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{formCopy.submittingButton || "Sending..."}</span>
                </>
              ) : (
                <>
                  <span>{formCopy.submitButton}</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const Index = () => {
  const {
    data: portfolio,
    isLoading: portfolioLoading
  } = usePortfolioList();
  const featuredPortfolio = portfolio?.slice(0, 6) || [];
  const { home, brand } = siteContent;
  const FEATURE_ICONS = [Eye, Sparkles, Clapperboard, Camera];

  return <Layout hasHero>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Slider */}
        <HeroSlider />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        
        {/* Content */}
        <div className="container relative z-10 text-center">
          <HeroContent className="flex flex-col gap-[12px] max-w-5xl mx-auto items-center">
            {/* Text Group */}
            <div className="flex flex-col gap-[12px]">
              <HeroItem>
                <p className="text-sm font-medium tracking-[0.3em] uppercase text-white/70">
                  {home.hero.badge}
                </p>
              </HeroItem>
              <HeroItem>
                <TypingHeading />
              </HeroItem>
            </div>
            {/* Button */}
            <HeroItem>
              <Link to={home.hero.ctaHref} className="inline-flex items-center gap-2 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300 hover:gap-4 px-8 py-3.5">
                {home.hero.ctaButton}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </HeroItem>
          </HeroContent>
        </div>
      </section>

      {/* Featured Portfolio */}
      <section className="bg-black text-white pt-12 md:pt-16 pb-10 md:pb-12">
        <div className="container">
          <FadeUp>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-sm font-medium tracking-[0.2em] uppercase text-white/60 mb-2">
                  {home.portfolioSection.badge}
                </p>
                <h2 className="text-3xl md:text-4xl tracking-tight font-normal">
                  {home.portfolioSection.title}
                </h2>
              </div>
              <Link to={home.portfolioSection.viewAllHref} className="text-sm font-medium tracking-wide uppercase text-white/70 hover:text-white transition-colors">
                {home.portfolioSection.viewAllButton}
              </Link>
            </div>
          </FadeUp>

          {portfolioLoading ? <div className="aspect-[4/5] w-[65%] sm:w-[48%] lg:w-[38%] xl:w-[32%] rounded-3xl bg-white/10 animate-pulse" /> : featuredPortfolio.length > 0 ? <FadeUp>
              <PortfolioSlider projects={featuredPortfolio} />
            </FadeUp> : <div className="text-center py-20 text-white/60">
              <p>{home.portfolioSection.emptyState}</p>
            </div>}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="pt-8 md:pt-10 pb-12 md:pb-16 bg-black text-white">
        <div className="container">
          {/* Section Header */}
          <SectionHeader className="text-center mb-8">
            {/* Lightning Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-white/60 mb-3">
              {home.aboutSection.badge}
            </p>
            <h2 className="text-4xl md:text-5xl tracking-tight mb-3 font-normal lg:text-4xl">
              {home.aboutSection.title}
            </h2>
          </SectionHeader>

          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
            <FadeUp>
              <AboutCarousel />
            </FadeUp>

            {/* Features List - scrollable, matching the carousel height */}
            <div className="md:h-[480px] md:overflow-hidden">
              <div className="no-scrollbar flex h-full flex-col overflow-y-auto">
                <StaggerContainer className="my-auto grid grid-cols-1 gap-5">
                  {home.aboutSection.features.map((feature, idx) => {
                    const IconComponent = FEATURE_ICONS[idx % FEATURE_ICONS.length];
                    return (
                      <StaggerItem key={feature.id}>
                        <div className="group p-6 rounded-4xl bg-white/5 hover:bg-white/10 transition-all duration-500">
                          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-xs font-medium tracking-wider uppercase text-white/50 mb-2 block">
                            {feature.badge}
                          </span>
                          <h3 className="text-xl mb-2 font-normal">{feature.title}</h3>
                          <p className="text-white/60 text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="pt-8 md:pt-10 pb-12 md:pb-16 bg-black text-white">
        <div className="container">
          <FadeUp>
            <div className="flex flex-col items-center text-center gap-6">
              <p className="text-sm font-medium tracking-[0.3em] uppercase text-white/60">
                {home.contactSection.badge}
              </p>
              <h2 className="text-4xl md:text-5xl tracking-tight font-normal">
                {home.contactSection.title}
              </h2>
              <a
                href={brand.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300 px-8 py-3.5"
              >
                <MessageCircle className="w-5 h-5" />
                {home.contactSection.whatsappButtonText}
              </a>
              <ContactFormCard />
            </div>
          </FadeUp>
        </div>
      </section>
    </Layout>;
};
export default Index;
