export interface Article {
  id: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  tags: string[];
}

export interface Comment {
  id: string;
  user: {
    login: string;
    avatar_url: string;
  };
  content: string;
  createdAt: string;
}

export interface VisitorStats {
  total: number;
  locations: {
    country: string;
    count: number;
  }[];
}