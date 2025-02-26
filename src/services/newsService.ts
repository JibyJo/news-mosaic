import axios from "axios";
import { guardianEquivalents, nytEquivalents } from "../utils/constants";

const API_KEYS = {
  newsAPI: import.meta.env.VITE_NEWSAPI_ORG_KEY,
  guardianAPI: import.meta.env.VITE_GUARDIAN_KEY,
  nytAPI: import.meta.env.VITE_NYT_KEY,
};

interface Filters {
  dateSort?: string;
  fromDate?: string | null;
  toDate?: string | null;
  searchQuery?: string;
  category?: string;
  source?: string;
}

interface FormattedArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  sourceProvider: string;
  author: string;
}

const normalizeNews = (
  rawNews: any[],
  sourceProvider: string
): FormattedArticle[] =>
  rawNews.map((article, index) => ({
    id: article.id || `news-${sourceProvider}-${index}`,
    title:
      article.title ||
      article.webTitle ||
      article.headline?.main ||
      "No title available",
    description:
      article.description ||
      article.abstract ||
      article.sectionName ||
      "No description available",
    url: article.url || "#",
    imageUrl:
      article.multimedia?.length > 0
        ? article.multimedia[0].url
        : article.urlToImage || article.media || "/news_mosaic.webp",
    publishedAt: article.publishedAt || article.date || "Unknown date",
    sourceProvider,
    author: article.byline || article.author || sourceProvider,
  }));

export const fetchSectionsAPI = async (): Promise<
  { value: string; name: string }[]
> => {
  try {
    const response = await axios.get(
      `https://content.guardianapis.com/sections?api-key=${API_KEYS.guardianAPI}`
    );
    return response.data.response.results.map(
      (section: { id: string; webTitle: string }) => ({
        value: section.id,
        name: section.webTitle,
      })
    );
  } catch (error) {
    console.error("Error fetching Guardian sections:", error);
    throw error;
  }
};

export const fetchTopStoriesNewsAPI = async (): Promise<FormattedArticle[]> => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEYS.newsAPI}`
    );
    return normalizeNews(response.data.articles, "News API");
  } catch (error) {
    console.error("Error fetching top stories from NewsAPI:", error);
    throw error;
  }
};

export const fetchTopStoriesNewYorkTimes = async (): Promise<
  FormattedArticle[]
> => {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEYS.nytAPI}`
    );
    return normalizeNews(response.data.results, "New York Times");
  } catch (error) {
    console.error("Error fetching top stories from NYT:", error);
    throw error;
  }
};

const fetchNewsAPI = async (filters: Filters): Promise<FormattedArticle[]> => {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEYS.newsAPI,
      ...(filters.dateSort === "custom"
        ? { from: filters.fromDate || "", to: filters.toDate || "" }
        : { sortBy: nytEquivalents[filters.dateSort || "mostRecent"] }),
      ...(filters.searchQuery ? { q: `"${filters.searchQuery}"` } : {}),
      ...(filters.category && filters.searchQuery
        ? { q: `"${filters.category}" AND "${filters.searchQuery}"` }
        : filters.category
        ? { q: `"${filters.category}"` }
        : { q: "home" }),
    });

    const response = await axios.get(
      `https://newsapi.org/v2/everything?${params}`
    );
    return normalizeNews(response.data.articles, "News API");
  } catch (error) {
    console.error("Error fetching NewsAPI data:", error);
    throw error;
  }
};

const fetchGuardianNews = async (
  filters: Filters
): Promise<FormattedArticle[]> => {
  try {
    const params = new URLSearchParams({
      "api-key": API_KEYS.guardianAPI,
      ...(filters.dateSort === "custom"
        ? {
            "from-date": filters.fromDate || "",
            "to-date": filters.toDate || "",
          }
        : {
            "order-by": guardianEquivalents[filters.dateSort || "mostRecent"],
          }),
      ...(filters.category ? { section: filters.category } : {}),
      ...(filters.searchQuery ? { q: filters.searchQuery } : {}),
    });

    const response = await axios.get(
      `https://content.guardianapis.com/search?${params}`
    );
    return normalizeNews(response.data.response.results, "The Guardian");
  } catch (error) {
    console.error("Error fetching Guardian news:", error);
    throw error;
  }
};

const fetchNYTNews = async (filters: Filters): Promise<FormattedArticle[]> => {
  try {
    const params = new URLSearchParams({
      "api-key": API_KEYS.nytAPI,
      ...(filters.searchQuery ? { q: filters.searchQuery } : {}),
      ...(filters.category ? { fq: `section_name:${filters.category}` } : {}),
      ...(filters.dateSort === "custom"
        ? { begin_date: filters.fromDate || "", end_date: filters.toDate || "" }
        : { sort: guardianEquivalents[filters.dateSort || "mostRecent"] }),
    });

    const response = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?${params}`
    );
    return normalizeNews(response.data.response.docs, "New York Times");
  } catch (error) {
    console.error("Error fetching NYT news:", error);
    throw error;
  }
};

export const fetchAllNews = async (
  filters: Filters
): Promise<FormattedArticle[]> => {
  try {
    if (!filters.source) {
      const [newsAPI, guardian, nyt] = await Promise.all([
        fetchNewsAPI(filters),
        fetchGuardianNews(filters),
        fetchNYTNews(filters),
      ]);
      return [...newsAPI, ...guardian, ...nyt];
    } else {
      switch (filters.source) {
        case "newsapi":
          return fetchNewsAPI(filters);
        case "guardian":
          return fetchGuardianNews(filters);
        case "nyt":
          return fetchNYTNews(filters);
        default:
          return [];
      }
    }
  } catch (error) {
    console.error("Error fetching all news:", error);
    throw error;
  }
};
const NYT_SEARCH_BASE_URL =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json";

export const fetchRegionNews = async (
  region: string
): Promise<{ articles: any[] }> => {
  try {
    const params = new URLSearchParams({
      "api-key": API_KEYS.nytAPI,
      sort: "newest",
      ...(region ? { fq: `section_name:${region}` } : {}),
    });

    const response = await fetch(`${NYT_SEARCH_BASE_URL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }
    const data = await response.json();
    return { articles: normalizeNews(data.response.docs, "New York Times") };
  } catch (error) {
    console.error("Error fetching regional news:", error);
    return { articles: [] };
  }
};
