import type { PortfolioProject, PortfolioMedia } from "./types";

// Imagens locais (src/assets/roma). Para trocar, substitua o arquivo ou o import.
import roma199 from "@/assets/roma/Roma-199.jpg";
import roma836 from "@/assets/roma/Roma-836.jpg";
import roma837 from "@/assets/roma/Roma-837.jpg";
import roma809 from "@/assets/roma/Roma-809.jpg";
import roma438 from "@/assets/roma/Roma-438.jpg";
import roma224 from "@/assets/roma/Roma-224.jpg";
import roma195 from "@/assets/roma/Roma-195.jpg";
import roma153 from "@/assets/roma/Roma-153.jpg";
import roma53 from "@/assets/roma/Roma-53.jpg";

// Imagens locais (src/assets/granprix).
import gp1 from "@/assets/granprix/gp-1.jpg";
import gp2 from "@/assets/granprix/gp-2.jpg";
import gp3 from "@/assets/granprix/gp-3.jpg";
import gp4 from "@/assets/granprix/gp-4.jpg";
import gp5 from "@/assets/granprix/gp-5.jpg";
import gp6 from "@/assets/granprix/gp-6.jpg";
import gp7 from "@/assets/granprix/gp-7.jpg";
import gp8 from "@/assets/granprix/gp-8.jpg";
import gp9 from "@/assets/granprix/gp-9.jpg";
import gp10 from "@/assets/granprix/gp-10.jpg";

// Capas otimizadas para carregamento rápido dos cards (Home e Portfólio)
import roma199Cover from "@/assets/covers/roma-199-cover.jpg";
import gp1Cover from "@/assets/covers/gp-1-cover.jpg";

const ROMA_ID = "roma-la-conquista";
const GP_ID = "gran-prix-ademicon";
const NOW = "2026-08-22T23:56:48.756Z";

export const portfolioProjects: PortfolioProject[] = [
  {
    id: ROMA_ID,
    title: "Roma - La Conquista",
    slug: "roma-la-conquista",
    category: "VIDEO & PHOTOGRAPHY",
    description:
      'Registro fotográfico e em vídeo da campanha de incentivo "La Conquista", uma viagem realizada pela maior administradora de consórcios do Brasil, "Ademicon Consórcio e Investimento". A viagem, que teve como destino principal a capital da Itália, também passou por Firenze e pelo Vaticano.',
    year: 2026,
    preview_image_1: roma199Cover,
    preview_image_2: roma836,
    preview_image_3: roma438,
    preview_image_4: roma224,
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: GP_ID,
    title: "Gran Prix Ademicon",
    slug: "gran-prix-ademicon",
    category: "VIDEO & PHOTOGRAPHY",
    description:
      'A campanha de incentivo "Gran Prix Ademicon", levou os melhores vendedores para Montevidéu, Uruguai. Desde cenários urbanos impressionantes até momentos de grande emoção e velocidade com participação no evento de corrida da TCR South America. A essência da corrida juntamente aos representantes da marca é relembrada nas fotos e no registro em vídeo da viagem.',
    year: 2025,
    preview_image_1: gp1Cover,
    preview_image_2: gp3,
    preview_image_3: gp8,
    preview_image_4: gp10,
    created_at: NOW,
    updated_at: NOW,
  },
];

const makeMedia = (project_id: string) => (
  id: string,
  media_type: PortfolioMedia["media_type"],
  url: string,
  sort_order: number,
  title: string | null,
  caption: string | null,
): PortfolioMedia => ({
  id,
  project_id,
  media_type,
  url,
  poster_url: null,
  title,
  caption,
  sort_order,
  created_at: NOW,
  updated_at: NOW,
});

const media = makeMedia(ROMA_ID);
const gpMedia = makeMedia(GP_ID);


export const portfolioMedia: PortfolioMedia[] = [
  media("roma-1", "image", roma199, 1, null, "A cúpula da Basílica de São Pedro iluminada pelo pôr do sol"),
  media("roma-2", "image", roma836, 2, null, "Audiência com o Papa Leão XIV"),
  media("roma-3", "image", roma837, 3, null, "Benção do Papa à Hadassa, filha de um casal participante da viagem"),
  media("roma-4", "image", roma809, 4, null, "As estátuas dos santos que coroam a fachada da basílica"),
  media("roma-5", "image", roma438, 5, null, "Retrato em frente ao Coliseu, símbolo eterno de Roma"),
  media("roma-6", "image", roma224, 6, null, "O grupo da campanha La Conquista reunido diante do Coliseu"),
  media("roma-7", "image", roma195, 7, null, "Vista panorâmica de Roma com o Vaticano ao entardecer"),
  media("roma-8", "image", roma153, 8, null, "Contemplando o fim de tarde sobre os telhados da cidade"),
  media("roma-9", "image", roma53, 9, null, "Ruas estreitas e bandeiras: o cotidiano italiano"),
  media(
    "roma-video-1",
    "youtube",
    "https://www.youtube.com/watch?v=9iGeZ5ksCIk",
    10,
    "Roma - La Conquista (Filme Oficial)",
    "Documentário completo da campanha La Conquista, registrando os momentos mais marcantes da viagem pela Itália.",
  ),
  media(
    "roma-video-2",
    "youtube",
    "https://www.youtube.com/watch?v=4z_ke3tCy20",
    11,
    "Highlights da Viagem (Teaser)",
    "Os melhores momentos da viagem em um vídeo dinâmico com os destaques da experiência.",
  ),

  gpMedia("gp-1", "image", gp1, 1, null, "Montevidéu ao amanhecer: a rambla emergindo da névoa sobre o Rio da Prata"),
  gpMedia("gp-2", "image", gp2, 2, null, "Concentração nos boxes antes da largada"),
  gpMedia("gp-3", "image", gp3, 3, null, "O grupo Ademicon reunido na pista, com as bandeiras das marcas parceiras"),
  gpMedia("gp-4", "image", gp4, 4, null, "Entrevista à beira da pista durante o fim de semana de corrida"),
  gpMedia("gp-5", "image", gp5, 5, null, "Preparação para a largada"),
  gpMedia("gp-6", "image", gp6, 6, null, "Disputa acirrada entre os carros do TCR South America"),
  gpMedia("gp-7", "image", gp7, 7, null, "A bandeira do Brasil no retrovisor, orgulho da equipe em solo uruguaio"),
  gpMedia("gp-8", "image", gp8, 8, null, "A celebração do pódio com a bandeira brasileira erguida"),
  gpMedia("gp-9", "image", gp9, 9, null, "As ruas históricas de Montevidéu"),
  gpMedia("gp-10", "image", gp10, 10, null, "O sol nascendo sobre a cidade coberta pela neblina"),
  gpMedia(
    "gp-video-1",
    "youtube",
    "https://www.youtube.com/watch?v=ee6tLrVsUC0",
    11,
    "Gran Prix Ademicon (Filme Oficial)",
    "Experiência completa da campanha Gran Prix Ademicon com a TCR South America.",
  ),
  gpMedia(
    "gp-video-2",
    "youtube",
    "https://www.youtube.com/shorts/xe-5BJlNVnI",
    12,
    "Gran Prix (Cortes Verticais / Social Media)",
    "Registro dinâmico em formato vertical planejado para reels e engajamento em redes sociais.",
  ),
];

