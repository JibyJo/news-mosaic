import axios from "axios";
import {
  API_KEYS,
  BASE_URLS,
  guardianEquivalents,
  nytEquivalents,
} from "../utils/constants";
import { normalizeNews, personalFeed } from "../utils/helperFunctions";

export interface Filters {
  dateSort?: string;
  fromDate?: string | null;
  toDate?: string | null;
  searchQuery?: string;
  category?: string;
  source?: string;
}

export interface FormattedArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  sourceProvider: string;
  author: string;
}

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
      ...(filters.category && filters.searchQuery
        ? { q: `"${filters.category}" AND "${filters.searchQuery}"` }
        : filters.category
        ? { q: `"${filters.category}"` }
        : { q: "home" }),
      ...(filters.searchQuery && !filters.category
        ? { q: `"${filters.searchQuery}"` }
        : {}),
    });

    const response = await axios.get(`${BASE_URLS.newsAPI}?${params}`);
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

    const response = await axios.get(`${BASE_URLS.guardianAPI}?${params}`);
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

    const response = await axios.get(`${BASE_URLS.nytAPI}?${params}`);
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
    personalFeed(filters);
    if (!filters.source) {
      const results = await Promise.allSettled([
        fetchNewsAPI(filters),
        fetchGuardianNews(filters),
        fetchNYTNews(filters),
      ]);

      return results
        .filter((result) => result.status === "fulfilled")
        .map(
          (result) =>
            (result as PromiseFulfilledResult<FormattedArticle[]>).value
        )
        .flat();
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

export const fetchRegionNews = async (
  region: string,
  page: number = 0
): Promise<{ articles: any[] }> => {
  try {
    const params = new URLSearchParams({
      "api-key": API_KEYS.nytAPI,
      sort: "newest",
      page: page.toString(),
      ...(region ? { fq: `section_name:(\"${region}\")` } : {}),
    });

    const response = await fetch(`${BASE_URLS.nytAPI}?${params.toString()}`);
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
