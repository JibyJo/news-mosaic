import { useState, useEffect } from "react";
import { fetchAllNews } from "../services/newsService";

interface NewsArticle {
  title: string;
  description?: string;
  url: string;
  source?: string;
}

const useNews = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        const articles = await fetchAllNews();
        setNews(articles);
      } catch (err) {
        setError("Failed to fetch news. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, []);

  return { news, loading, error };
};

export default useNews;
