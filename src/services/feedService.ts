import { toast } from "react-toastify";
import { API_KEYS, BASE_URLS } from "../utils/constants";
import { normalizeNews } from "../utils/helperFunctions";

interface NewsResponse {
  response?: { docs?: any[]; results?: any[] };
  articles?: any[];
}

const fetchNewsFromAPI = async (
  url: string,
  params: URLSearchParams,
  errorMessage: string
): Promise<NewsResponse | null> => {
  try {
    const response = await fetch(`${url}?${params.toString()}`);
    if (!response.ok) throw new Error(errorMessage);
    return await response.json();
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
    console.error(errorMessage, error);
    return null;
  }
};

const fetchNYTNews = async (
  queries: string[],
  categories: string[]
): Promise<any[]> => {
  let dataResults: any[] = [];

  const fetchData = async (paramOptions: Record<string, string>) => {
    const params = new URLSearchParams({
      "api-key": API_KEYS.nytAPI,
      ...paramOptions,
    });
    const data = await fetchNewsFromAPI(
      BASE_URLS.nytAPI,
      params,
      "Error fetching NYT news"
    );
    if (data?.response?.docs) dataResults.push(...data.response.docs);
  };

  if (queries.length)
    await fetchData({ q: queries.join(" OR "), sort: "newest" });
  if (categories.length)
    await fetchData({
      fq: `section_name:(${categories.join(" OR ")})`,
      sort: "newest",
    });

  return dataResults;
};

const fetchNewsAPI = async (
  queries: string[],
  categories: string[]
): Promise<any[]> => {
  const params = new URLSearchParams({
    apiKey: API_KEYS.newsAPI,
    q: [...queries, ...categories].join(" OR "),
  });
  const data = await fetchNewsFromAPI(
    BASE_URLS.newsAPI,
    params,
    "Error fetching NewsAPI news"
  );
  return data?.articles || [];
};

const fetchGuardianNews = async (
  queries: string[],
  categories: string[]
): Promise<any[]> => {
  let dataResults: any[] = [];

  const fetchData = async (paramOptions: Record<string, string>) => {
    const params = new URLSearchParams({
      "api-key": API_KEYS.guardianAPI,
      ...paramOptions,
    });
    const data = await fetchNewsFromAPI(
      BASE_URLS.guardianAPI,
      params,
      "Error fetching Guardian news"
    );
    if (data?.response?.results) dataResults.push(...data.response.results);
  };

  if (queries.length) await fetchData({ q: queries.join(" OR ") });
  if (categories.length) await fetchData({ section: categories.join(",") });

  return dataResults;
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

    return normalizeNews(
      results
        .filter(
          (result): result is PromiseFulfilledResult<any[]> =>
            result.status === "fulfilled"
        )
        .flatMap((result) => result.value),
      "Your Feed"
    );
  } catch (error) {
    console.error("Error fetching personalized news:", error);
    return [];
  }
};
