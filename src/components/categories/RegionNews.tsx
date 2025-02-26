import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRegionNews } from "../../services/newsService";

const RegionNews = () => {
  const { category: region } = useParams<{ category: string }>();
  const [news, setNews] = useState<any[]>([]);
  console.log("dwdw", region);
  useEffect(() => {
    if (region) {
      fetchRegionNews(region).then((data) => setNews(data.articles));
    }
  }, [region]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">News from {region}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((article, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
            <p className="text-sm text-gray-600">{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionNews;
