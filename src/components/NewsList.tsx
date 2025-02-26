import useNews from "../hooks/useNews";
import { useState } from "react";

const NewsList: React.FC = () => {
  const { news, loading } = useNews();
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});

  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <>
      {(loading || (!loading && news?.length === 0)) && (
        <div className="min-h-[60vh] min-w-full flex flex-col items-center justify-center p-4">
          {loading ? (
            <p className="text-lg font-semibold">Loading news...</p>
          ) : (
            <div className="text-center">
              <p className="text-lg font-semibold mb-4">No news found.</p>
              <img
                src="/news_mosaic.webp"
                alt="No news available"
                className="mx-auto object-contain max-w-xs rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      )}

      {!loading && news?.length > 0 && (
        <div className="w-full flex flex-col items-center justify-center p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {news.map((article, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                {article.imageUrl && !imageError[index] ? (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                    onError={() => handleImageError(index)}
                  />
                ) : (
                  <img
                    src="/news_mosaic.webp"
                    alt="News placeholder"
                    className="w-full h-48 object-cover bg-gray-200"
                  />
                )}
                <div className="p-4 flex-grow">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {article.description || "No description available."}
                  </p>
                  <div className="mt-auto pt-2">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NewsList;
