export interface GreentechVideoItem {
  id: string;
  ingredientId: string;
  videoId: string;
  youtubeUrl: string;
  thumbnail: string;
  fallbackThumbnail: string;
  title: string;
  subtitle: string;
  claim: string;
  dosage: string;
}

export const GREENTECH_VIDEOS: GreentechVideoItem[] = [
  {
    id: 'expozen',
    ingredientId: 'expozen',
    videoId: 'aC2KDsURwYc',
    youtubeUrl: 'https://youtu.be/aC2KDsURwYc',
    thumbnail: '/videos/greentech-expozen-thumb.jpg',
    fallbackThumbnail: 'https://img.youtube.com/vi/aC2KDsURwYc/maxresdefault.jpg',
    title: 'EXPOZEN®',
    subtitle: 'Anti-Exposome & Neuro-Sensory Soothing',
    claim: '-23% facial redness · -67% stinging (28d)',
    dosage: '1–2%',
  },
  {
    id: 'letilys',
    ingredientId: 'letilys',
    videoId: 'Wt-qi288jno',
    youtubeUrl: 'https://youtu.be/Wt-qi288jno',
    thumbnail: '/videos/greentech-letilys-thumb.jpg',
    fallbackThumbnail: 'https://img.youtube.com/vi/Wt-qi288jno/maxresdefault.jpg',
    title: 'LETILYS®',
    subtitle: 'Radiance Modulation & Micro-Relief Glow',
    claim: 'Smooths texture & boosts uniform luminosity',
    dosage: '1–3%',
  },
  {
    id: 'myralys',
    ingredientId: 'myralys',
    videoId: 'Mg3NT4CXX3k',
    youtubeUrl: 'https://youtu.be/Mg3NT4CXX3k',
    thumbnail: '/videos/greentech-myralys-thumb.jpg',
    fallbackThumbnail: 'https://img.youtube.com/vi/Mg3NT4CXX3k/maxresdefault.jpg',
    title: 'MYRALYS®',
    subtitle: 'Upper Eyelid Lift & Eye Contour Care',
    claim: '+12% eyelid lift · -18% eye bag volume',
    dosage: '0.5–2%',
  },
  {
    id: 'reverskin',
    ingredientId: 'reverskin',
    videoId: 'KdFLlIAE1rE',
    youtubeUrl: 'https://youtu.be/KdFLlIAE1rE',
    thumbnail: '/videos/greentech-reverskin-thumb.jpg',
    fallbackThumbnail: 'https://img.youtube.com/vi/KdFLlIAE1rE/hqdefault.jpg',
    title: 'REVERSKIN®',
    subtitle: 'Epidermal Volumator & DEJ Firming',
    claim: '+15% epidermal thickness · +22% elasticity',
    dosage: '1–2%',
  },
  {
    id: 'arcolys',
    ingredientId: 'arcolys',
    videoId: 'cF7rNuaV_bE',
    youtubeUrl: 'https://youtu.be/cF7rNuaV_bE',
    thumbnail: '/videos/greentech-arcolys-thumb.jpg',
    fallbackThumbnail: 'https://img.youtube.com/vi/cF7rNuaV_bE/sddefault.jpg',
    title: 'ARCOLYS®',
    subtitle: 'Natural Anti-Greying & Melanogenesis',
    claim: '+31% repigmentation · -19% grey density',
    dosage: '1–2%',
  },
  {
    id: 'timelys',
    ingredientId: 'timelys',
    videoId: '-eZkTAJktFA',
    youtubeUrl: 'https://youtu.be/-eZkTAJktFA',
    thumbnail: '/videos/greentech-timelys-thumb.jpg',
    fallbackThumbnail: 'https://img.youtube.com/vi/-eZkTAJktFA/maxresdefault.jpg',
    title: 'TIMELYS®',
    subtitle: 'Skin Longevity & Epigenetic Vitality',
    claim: 'Protects cellular longevity & micro-relief',
    dosage: '1%',
  },
  {
    id: 'hairiline',
    ingredientId: 'hairiline',
    videoId: '3aa3iMw0ahU',
    youtubeUrl: 'https://youtube.com/watch?v=3aa3iMw0ahU&feature=shared',
    thumbnail: '/videos/greentech-hairiline-thumb-16x9.jpg',
    fallbackThumbnail: 'https://img.youtube.com/vi/3aa3iMw0ahU/sddefault.jpg',
    title: 'HAIRILINE®',
    subtitle: 'Anti-Hair Loss & Scalp Microbiota',
    claim: '+34% Anagen/Telogen ratio · -41% hair fall',
    dosage: '0.5–1%',
  },
];

export function extractYouTubeVideoId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtube-nocookie\.com\/embed\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export function getVideoThumbnailForUrl(url?: string): { primary: string; fallback: string } {
  const id = extractYouTubeVideoId(url);
  if (!id) {
    return {
      primary: '/videos/greentech-hairiline-thumb-16x9.jpg',
      fallback: 'https://img.youtube.com/vi/3aa3iMw0ahU/sddefault.jpg',
    };
  }
  const matched = GREENTECH_VIDEOS.find((v) => v.videoId === id);
  if (matched) {
    return { primary: matched.thumbnail, fallback: matched.fallbackThumbnail };
  }
  return {
    primary: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    fallback: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
  };
}
