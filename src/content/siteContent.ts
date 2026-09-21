/**
 * =========================================================================
 * 📝 SITE CONTENT & TEXT CONFIGURATION
 * =========================================================================
 * 
 * Edit any text on the website directly in this file.
 * Changes here are immediately reflected across all pages and components.
 * 
 * TABLE OF CONTENTS:
 * 1. brand       - Global brand info, social media, contact details
 * 2. navigation  - Header menu links and buttons
 * 3. home        - Homepage hero, portfolio teaser, about/features, and contact form
 * 4. portfolio   - Portfolio listing and detail page texts
 * 5. blog        - Journal/blog listing and detail page texts
 * 6. footer      - Footer texts, copyright, and signature
 * 7. notFound    - 404 page texts
 * =========================================================================
 */

export const siteContent = {
  // ==========================================
  // 1. BRAND & GLOBAL CONTACT
  // ==========================================
  brand: {
    name: "Marcos Alex",
    tagline: "Visual storytelling to add value to your brand",
    email: "marcosalexov@gmail.com",
    phone: "+55 41 98421-6095",
    whatsappUrl:
      "https://wa.me/5541984216095?text=Ol%C3%A1%20Marcos,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20solicitar%20uma%20proposta%20audiovisual.",
    whatsappCtaText: "Whatsapp (+55 41 98421-6095)",
    location: "CwB/PR - Brazil",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/marcos-alex/",
      instagram: "https://www.instagram.com/marcos_lex1",
    },
    // Envio direto do formulário (sem abrir aplicativo de e-mail / mailto):
    // Obtenha sua chave gratuita em https://web3forms.com inserindo seu e-mail:
    web3FormsAccessKey: "", // Cole sua chave Web3Forms aqui
    formspreeUrl: "", // Ou insira a URL do seu Formspree aqui se preferir
  },

  // ==========================================
  // 2. NAVIGATION (HEADER & FULLSCREEN MENU)
  // ==========================================
  navigation: {
    menuButtonText: "Menu",
    closeAriaLabel: "Fechar menu e voltar para a home page",
    homeAriaLabel: "Voltar para a página inicial",
    links: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "About", href: "/#about" },
      { label: "Journal", href: "/blog" },
      { label: "Contact", href: "/#contact" },
    ],
  },

  // ==========================================
  // 3. HOMEPAGE (src/pages/Index.tsx)
  // ==========================================
  home: {
    // Top Hero Section
    hero: {
      badge: "FILMMAKER & FOTÓGRAFO",
      headingLine1: "Marcos Alex",
      headingLine2: "", // Optional 2nd animated line
      ctaButton: "All Projects",
      ctaHref: "/portfolio",
    },

    // Selected Work / Portfolio Slider section
    portfolioSection: {
      badge: "Selected Work",
      title: "Portfolio",
      viewAllButton: "View All",
      viewAllHref: "/portfolio",
      emptyState: "No portfolio items yet. Add some in Lovable Cloud.",
    },

    // About Marcos Alex & Storytelling features
    aboutSection: {
      badge: "ABOUT",
      title: "Marcos Alex",
      carouselImages: [
        { alt: "Marcos Alex fotografando durante um evento corporativo" },
        { alt: "Marcos Alex capturando fotografia ao ar livre" },
        { alt: "Marcos Alex operando uma câmera de cinema profissional" },
        { alt: "Marcos Alex em gravação com estabilizador gimbal" },
      ],
      features: [
        {
          id: "storytelling",
          badge: "STORYTELLING",
          title: "Visual Storytelling",
          description:
            "Capturing moments isn’t just about keeping the quality; the story behind is what truly captures the eyes.",
        },
        {
          id: "impact",
          badge: "IMPACT",
          title: "Brand Impact",
          description:
            "Every brand has its own way, and every production should follow it. Creative direction tailored to the brand essence.",
        },
        {
          id: "filmmaking",
          badge: "FILMMAKING",
          title: "Uncompromising Quality",
          description:
            "From documentaries to high-energy aftermovies. The cinematic language adapts, always with purpose and aligned with client goals.",
        },
        {
          id: "photography",
          badge: "PHOTOGRAPHY",
          title: "Moments to be Remembered",
          description:
            "Extensive experience in corporate events, executive portraits, and international travel photography.",
        },
      ],
    },

    // Contact & Inquiry Section
    contactSection: {
      badge: "GET IN TOUCH",
      title: "Let's Connect",
      whatsappButtonText: "Whatsapp (+55 41 98421-6095)",
      form: {
        nameLabel: "Name",
        namePlaceholder: "Who you are",
        nameError: "Name is required",

        emailLabel: "Email",
        emailPlaceholder: "Your best email",
        emailErrorEmpty: "Email is required",
        emailErrorInvalid: "Please enter a valid email",

        projectTypeLabel: "Project Type",
        projectTypePlaceholder: "Event, Video, Photography, Content creation",

        messageLabel: "Message",
        messagePlaceholder: "Tell me more about your project",
        messageError: "Message is required",

        submitButton: "Send Message",
        submittingButton: "Sending...",
        successTitle: "Message Sent!",
        successDescription:
          "Thank you for reaching out. I'll get back to you as soon as possible.",
        resetButton: "Send Another Message",
      },
    },
  },

  // ==========================================
  // 4. PORTFOLIO PAGES (Portfolio.tsx & Detail)
  // ==========================================
  portfolioPage: {
    badge: "Our Work",
    title: "Successful Projects",
    description: "Capturing moments that captivate and connect with audiences.",
    emptyTitle: "No Projects Yet",
    emptyDescription: "Portfolio items will appear here once added through Lovable Cloud.",
    errorMessage: "Error loading portfolio. Please try again later.",
    detail: {
      backButton: "Back to Projects",
      clientLabel: "Client",
      roleLabel: "Role",
      yearLabel: "Year",
      servicesLabel: "Services",
      aboutHeading: "About the Project",
      videosTab: "Watch Videos",
      photosTab: "Photo Gallery",
      emptyMedia: "No media uploaded for this project yet.",
    },
  },

  // ==========================================
  // 5. BLOG / JOURNAL PAGES (Blog.tsx & Detail)
  // ==========================================
  blogPage: {
    badge: "Stories",
    title: "Our Insights",
    description:
      "Stories alredy told",
    emptyTitle: "No Posts Yet",
    emptyDescription: "Blog posts will appear here once added through Lovable Cloud.",
    errorMessage: "Error loading blog posts. Please try again later.",
    detail: {
      backButton: "Back to Journal",
      readingTimeSuffix: "min read",
    },
  },

  // ==========================================
  // 6. FOOTER (Footer.tsx)
  // ==========================================
  footer: {
    brandName: "Marcos Alex",
    tagline: "Visual storytelling to add value to your brand",
    exploreHeading: "Explore",
    connectHeading: "Connect",
    portfolioLinkLabel: "Portfolio",
    blogLinkLabel: "Blog",
    email: "marcosalexov@gmail.com",
    location: "CwB/PR - Brazil",
    copyrightSuffix: "All rights reserved.",
    signature: "Crafted with intention",
  },

  // ==========================================
  // 7. NOT FOUND (404 Page)
  // ==========================================
  notFound: {
    title: "404",
    subtitle: "Oops! Page not found",
    returnHomeButton: "Return to Home",
  },
} as const;

export type SiteContent = typeof siteContent;
export default siteContent;
