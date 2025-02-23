
  import axios from "axios";

  const API_KEYS = {
    newsAPI: import.meta.env.VITE_NEWSAPI_ORG_KEY,
    guardianAPI: import.meta.env.VITE_GUARDIAN_KEY,
    nytAPI: import.meta.env.VITE_NYT_KEY,
  };
  
  const fetchNewsAPI = async () => {
    try{
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEYS.newsAPI}`
    );
    return response.data.articles;}
    catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  };
  
  const fetchGuardianNews = async () => {
    try{
    const response = await axios.get(
      `https://content.guardianapis.com/search?api-key=${API_KEYS.guardianAPI}`
    );
    return response.data.response.results;
    }
    catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  };
  
  const fetchNYTNews = async () => {
    const response = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEYS.nytAPI}`
    );
    return response.data.results;
  };
  
  export const fetchAllNews = async () => {
    try {
      const [newsAPI, guardian, nyt] = await Promise.all([
        fetchNewsAPI(),
        fetchGuardianNews(),
        fetchNYTNews(),
      ]);
  
      return [...newsAPI, ...guardian, ...nyt];
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  };
    