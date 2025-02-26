import Footer from "../Footer";
import Header from "../Header";
import NewsList from "../NewsList";
import SearchWithFilters from "../SearchWithFilters";
import TopStories from "../TopStories";

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
