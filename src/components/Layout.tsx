import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow min-h-[80vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
