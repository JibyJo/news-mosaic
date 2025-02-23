import useNews from "../hooks/useNews";

const NewsList: React.FC = () => {
  const { news, loading, error } = useNews();

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-3 gap-6 p-4">
      {news?.map((article, index) => (
        <div key={index} className="border p-4 rounded shadow">
          <h3 className="font-bold">{article.title}</h3>
          <p>{article.description || "No description available."}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
