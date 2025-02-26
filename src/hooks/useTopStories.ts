import { useState, useEffect } from "react";
import { fetchSectionsAPI, fetchTopStoriesNewsAPI, fetchTopStoriesNewYorkTimes } from "../services/newsService";

// Define the shape of an individual article
interface Article {
  author: string;
  id?: string;
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  urlToImage?: string;
  media?: string;
  publishedAt?: string;
  date?: string;
  sourceProvider?: string;
}

// Define the shape of the hook's return value
interface UseFormattedNewsResult {
  news: Article[];
  loading: boolean;
  error: Error | null;
}

const useTopNews = (): UseFormattedNewsResult => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchSectionsAPI();
    const fetchNews = async () => {
      try {
        setLoading(true);
        const [newsAPI, nytAPI] = await Promise.all([
          fetchTopStoriesNewsAPI(),
          fetchTopStoriesNewYorkTimes(),
        ]);

        // Adding sourceProvider dynamically
        const formattedNewsAPI = newsAPI.map((article: Article) => ({
          ...article,
          sourceProvider: "newsapiorg",
        }));

        const formattedNYTAPI = nytAPI.map((article: Article) => ({
          ...article,
          sourceProvider: "newyorktimes",
        }));

        setNews([...formattedNewsAPI, ...formattedNYTAPI]);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { news, loading, error };
};

export default useTopNews;
