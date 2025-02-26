import Footer from "../layout/Footer";
import Header from "../layout/Header";
import NewsList from "./NewsList";
import SearchWithFilters from "./SearchWithFilters";
import TopStories from "./TopStories";

const Home = () => {
  return (
    <>
      <TopStories />
      <SearchWithFilters />
      <NewsList />
    </>
  );
};

export default Home;
