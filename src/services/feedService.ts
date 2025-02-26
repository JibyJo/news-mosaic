import { toast } from "react-toastify";
import { API_KEYS, BASE_URLS } from "../utils/constants";
import { normalizeNews } from "../utils/helperFunctions";

export const fetchNYTNews = async (
  queries: string[],
  categories: string[]
): Promise<any[]> => {
  try {
    let dataResults: any[] = [];

    if (queries.length > 0) {
      const params = new URLSearchParams({
        "api-key": API_KEYS.nytAPI,
        q: queries.join(" OR "),
        sort: "newest",
      });
      const response = await fetch(`${BASE_URLS.nytAPI}?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        if (data.response?.docs) {
          dataResults = [...dataResults, ...data.response.docs];
        }
      }
    }

    if (categories.length > 0) {
      const params = new URLSearchParams({
        "api-key": API_KEYS.nytAPI,
        fq: `section_name:(${categories.join(" OR ")})`,
        sort: "newest",
      });
      const response = await fetch(`${BASE_URLS.nytAPI}?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        if (data.response?.docs) {
          dataResults = [...dataResults, ...data.response.docs];
        }
      }
    }

    return dataResults;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    toast.error(errorMessage);
    console.error("Error fetching NYT news:", error);
    return [];
  }
};

export const fetchNewsAPI = async (
  queries: string[],
  categories: string[]
): Promise<any[]> => {
  try {
    const queriesStr = queries.join(" OR ");
    const categoriesStr = categories.join("OR");
    const queryString = queriesStr + " OR " + categoriesStr;
    const params = new URLSearchParams({
      apiKey: API_KEYS.newsAPI,
      q: queryString,
    });
    const response = await fetch(`${BASE_URLS.newsAPI}?${params.toString()}`);
    if (response.status == 429)
      throw new Error("Rate Limit exceeded NewsAPI Org");
    if (!response.ok) throw new Error("Failed to fetch NewsAPI news");
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    toast.error(errorMessage);
    console.error("Error fetching NewsAPI news:", error);
    return [];
  }
};

export const fetchGuardianNews = async (
  queries: string[],
  categories: string[]
): Promise<any[]> => {
  try {
    let dataResults: any[] = [];

    if (queries.length > 0) {
      const params = new URLSearchParams({
        "api-key": API_KEYS.guardianAPI,
        q: queries.join(" OR "),
      });
      const response = await fetch(
        `${BASE_URLS.guardianAPI}?${params.toString()}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.response?.results) {
          dataResults = [...dataResults, ...data.response.results];
        }
      }
    }

    if (categories.length > 0) {
      const params = new URLSearchParams({
        "api-key": API_KEYS.guardianAPI,
        section: categories.join(","),
      });
      const response = await fetch(
        `${BASE_URLS.guardianAPI}?${params.toString()}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.response?.results) {
          dataResults = [...dataResults, ...data.response.results];
        }
      }
    }

    return dataResults;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    toast.error(errorMessage);
    console.error("Error fetching Guardian news:", error);
    return [];
  }
};

export const fetchPersonalisedNews = async (): Promise<any[]> => {
  try {
    const queries = (localStorage.getItem("searchQuery") || "")
      .split(",")
      .slice(-10)
      .reverse();
    const categories = (localStorage.getItem("category") || "")
      .split(",")
      .slice(-10)
      .reverse();
    const results = await Promise.allSettled([
      fetchNYTNews(queries, categories),
      fetchNewsAPI(queries, categories),
      fetchGuardianNews(queries, categories),
    ]);

    const fulfilledResults = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => (result as PromiseFulfilledResult<any[]>).value)
      .flat();

    return normalizeNews(fulfilledResults, "Your Feed");
  } catch (error) {
    console.error("Error fetching personalized news:", error);
    return [];
  }
};
