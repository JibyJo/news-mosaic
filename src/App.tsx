import Footer from "./components/Footer";
import Header from "./components/Header";
import NewsList from "./components/NewsList";
import SearchWithFilters from "./components/SearchWithFilters";
import TopStories from "./components/TopStories";
import { FilterProvider } from "./context/FilterContext";

function App() {
  return (
    
      <FilterProvider>
        <Header />
        <TopStories />
        <SearchWithFilters />
        <NewsList />
        <Footer />
      </FilterProvider>
    
  );
}

export default App;
