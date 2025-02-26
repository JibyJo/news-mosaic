import { useState, useEffect } from "react";
import {
  fetchSectionsAPI,
  fetchTopStoriesNewsAPI,
  fetchTopStoriesNewYorkTimes,
} from "../services/newsService";

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
        const results = await Promise.allSettled([
          fetchTopStoriesNewsAPI(),
          fetchTopStoriesNewYorkTimes(),
        ]);

        const formattedResults = results.flatMap((result, index) => {
          if (result.status === "fulfilled") {
            return result.value.map((article: Article) => ({
              ...article,
              sourceProvider: index === 0 ? "newsapiorg" : "newyorktimes",
            }));
          }
          return [];
        });

        setNews(formattedResults);
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
