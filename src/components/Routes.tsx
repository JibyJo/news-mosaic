import { Routes, Route, Navigate } from "react-router-dom";
// import NewsDetail from "./components/NewsDetail";
// import RegionNews from "./pages/RegionNews";
import Home from "./home";
import Layout from "./layout/Layout";
import NotFound from "./NotFound";
import PrivacyPolicy from "./about/PrivacyPolicy";
import WhoWeAre from "./about/WhoWeAre";
import Terms from "./about/TermsAndConditions";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="news/:id" element={<NewsDetail />} /> */}

        {/* Region routes */}
        {/* <Route path="africa" element={<RegionNews region="africa" />} />
        <Route path="asia" element={<RegionNews region="asia" />} />
        <Route path="europe" element={<RegionNews region="europe" />} />
        <Route
          path="middle-east"
          element={<RegionNews region="middle-east" />}
        />
        <Route
          path="north-america"
          element={<RegionNews region="north-america" />}
        /> */}

        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="who-we-are" element={<WhoWeAre />} />
        <Route path="terms-of-service" element={<Terms />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
