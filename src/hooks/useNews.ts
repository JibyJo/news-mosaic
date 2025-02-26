import { useState, useEffect } from "react";
import { fetchAllNews } from "../services/newsService";
import { useFilters } from "../context/FilterContext";

interface NewsArticle {
  title: string;
  description?: string;
  url: string;
  source?: string;
  imageUrl?: string;
}

const useNews = () => {
  console.log("useNews triggered"); // Debugging purpose
  const { filters } = useFilters();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        const articles = await fetchAllNews(filters);
        setNews(articles);
      } catch (err) {
        setError("Failed to fetch news. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [JSON.stringify(filters)]); // <-- Ensures changes trigger re-fetch

  return { news, loading, error };
};

export default useNews;
