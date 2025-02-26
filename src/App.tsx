import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/Routes";

import { FilterProvider } from "./context/FilterContext";
import ToastProvider from "./toast/ToastProvider";

function App() {
  return (
    <FilterProvider>
      <ToastProvider />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </FilterProvider>
  );
}

export default App;
