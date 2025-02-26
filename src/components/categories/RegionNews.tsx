import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRegionNews } from "../../services/newsService";
import InfiniteScroll from "react-infinite-scroll-component";

const RegionNews = () => {
  const { category: region } = useParams<{ category: string }>();
  const [news, setNews] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (region) {
      setNews([]);
      setPage(0);
      setHasMore(true);
    }
  }, [region]);

  useEffect(() => {
    if (region) {
      fetchRegionNews(region, page)
        .then((data) => {
          if (data.articles.length === 0) {
            setHasMore(false);
          } else {
            setNews((prevNews) => [...prevNews, ...data.articles]);
          }
        })
        .catch((error) => {
          console.error("Error fetching news:", error);
        });
    }
  }, [region, page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mx-auto px-4 py-30">
      <h1 className="text-2xl font-bold mb-4">News from {region}</h1>
      <InfiniteScroll
        dataLength={news.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((article, index) => (
            <div
              key={`${article.id}${index}`}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              {article.imageUrl && (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
              )}
              <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
              <p className="text-sm text-gray-600">{article.description}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default RegionNews;
