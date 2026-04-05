export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export interface Project {
  name: string;
  description: string;
  url: string;
  tech: string[];
  stars?: number;
  featured?: boolean;
}

export interface CPStat {
  platform: string;
  username: string;
  url: string;
  stats: { label: string; value: string }[];
  color: string;
}
