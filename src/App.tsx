import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/Routes";

import { FilterProvider } from "./context/FilterContext";

function App() {
  return (
    <FilterProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </FilterProvider>
  );
}

export default App;
