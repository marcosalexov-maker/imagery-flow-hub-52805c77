import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import aboutImage1 from "@/assets/about/about-1.webp";
import aboutImage2 from "@/assets/about/about-2.webp";
import aboutImage3 from "@/assets/about/about-3.webp";
import aboutImage4 from "@/assets/about/about-4.webp";
import siteContent from "@/content/siteContent";

const rawImages = [aboutImage1, aboutImage2, aboutImage3, aboutImage4];
const fallbackAlts = [
  "Marcos Alex fotografando durante um evento corporativo",
  "Marcos Alex capturando fotografia ao ar livre",
  "Marcos Alex operando uma câmera de cinema profissional",
  "Marcos Alex em gravação com estabilizador gimbal",
];

const ABOUT_IMAGES = rawImages.map((src, index) => ({
  src,
  alt:
    siteContent.home.aboutSection.carouselImages?.[index]?.alt ||
    fallbackAlts[index] ||
    "Marcos Alex em produção audiovisual",
}));

const AboutCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setCurrentImage((previous) => (previous + 1) % ABOUT_IMAGES.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  const image = ABOUT_IMAGES[currentImage];

  return (
    <div className="relative aspect-[4/5] w-full md:aspect-auto md:h-[480px] overflow-hidden rounded-3xl bg-white/5">
      <AnimatePresence initial={false} mode="sync">
        <motion.img
          key={image.src}
          src={image.src}
          alt={image.alt}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1.1, ease: "easeInOut" }}
          loading={currentImage === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      </AnimatePresence>
    </div>
  );
};

export default AboutCarousel;