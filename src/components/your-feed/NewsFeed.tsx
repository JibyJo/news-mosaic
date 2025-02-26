import { useEffect, useState } from "react";
import { fetchPersonalisedNews } from "../../services/feedService";

const NewsFeed = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const categories = (localStorage.getItem("category") || "")
    .split(",")
    .slice(-10);
  const searchQueries = (localStorage.getItem("searchQuery") || "")
    .split(",")
    .slice(-10);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const newsData = await fetchPersonalisedNews();
      setNews(newsData);
      setLoading(false);
    };
    if (categories.length > 0 || searchQueries.length > 0) loadNews();
    else setNews([]);
  }, []);

  if (loading) {
    return <p>Loading news...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-36">
      <h1 className="text-2xl font-bold mb-4">Personalized News</h1>
      <div className="mb-6 flex flex-wrap gap-3">
        {categories?.length > 0 &&
          categories.map(
            (category, index) =>
              category && (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {category}
                </span>
              )
          )}
        {searchQueries?.length > 0 &&
          searchQueries.map(
            (query, index) =>
              query && (
                <span
                  key={index}
                  className="bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm"
                >
                  {query}
                </span>
              )
          )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {news?.length > 0 ? (
          news.map((article, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              {article.imageUrl && (
                <img
                  src={article.imageUrl}
                  alt={article.title || "News Image"}
                  className="w-full aspect-video object-cover rounded-lg mb-2"
                />
              )}
              <h2 className="text-lg font-semibold mb-2">
                {article.title || article.headline?.main}
              </h2>
              <p className="text-sm text-gray-600">
                {article.abstract || article.description}
              </p>
              {article.url && (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Read more
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No preferences found</p>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
