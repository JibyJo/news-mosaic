import { Filters, FormattedArticle } from "../services/newsService";
import { BASE_URLS } from "./constants";

const personalFeed = async (filters: Filters) => {
  const MAX_ITEMS = 10;

  if (filters.category) {
    let existingCategories = localStorage.getItem("category");
    let categoryList = existingCategories ? existingCategories.split(",") : [];

    if (!categoryList.includes(filters.category)) {
      categoryList.push(filters.category);
    }

    if (categoryList.length > MAX_ITEMS) {
      categoryList = categoryList.slice(-MAX_ITEMS);
    }

    localStorage.setItem("category", categoryList.join(","));
  }

  if (filters.searchQuery) {
    let existingQueries = localStorage.getItem("searchQuery");
    let queryList = existingQueries ? existingQueries.split(",") : [];

    if (!queryList.includes(filters.searchQuery)) {
      queryList.push(filters.searchQuery);
    }

    if (queryList.length > MAX_ITEMS) {
      queryList = queryList.slice(-MAX_ITEMS);
    }

    localStorage.setItem("searchQuery", queryList.join(","));
  }
};

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
        ? article.multimedia[0].url[0] === "i"
          ? BASE_URLS.nytAPIImage + article.multimedia[0].url
          : article.multimedia[0].url
        : article.urlToImage || article.media || "/news_mosaic.webp",
    publishedAt: article.publishedAt || article.date || "Unknown date",
    sourceProvider,
    author: article.byline || article.author || sourceProvider,
  }));
export { personalFeed, normalizeNews };
