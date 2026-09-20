import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "@/data/types";

interface PortfolioCardProps {
  project: PortfolioProject;
}

const PortfolioCard = ({ project }: PortfolioCardProps) => {
  const categoryLabels: Record<string, string> = {
    fashion: "Fashion",
    editorial: "Editorial",
    portrait: "Portrait",
    commercial: "Commercial",
    lifestyle: "Lifestyle",
    fine_art: "Fine Art",
  };

  // Use year from database, fallback to created_at year
  const displayYear = project.year || new Date(project.created_at).getFullYear();

  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className="group block relative overflow-hidden rounded-3xl aspect-[4/5]"
    >
      <img
        src={project.preview_image_1}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowUpRight className="w-4 h-4 text-white" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <span className="block text-[11px] font-medium tracking-[0.2em] uppercase text-white/70 mb-1.5">
          {categoryLabels[project.category] || project.category} · {displayYear}
        </span>
        <h3 className="text-lg md:text-xl text-white tracking-tight font-normal">
          {project.title}
        </h3>
      </div>
    </Link>
  );
};

export default PortfolioCard;
