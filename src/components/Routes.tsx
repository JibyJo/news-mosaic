import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Layout from "./layout/Layout";
import NotFound from "./NotFound";
import PrivacyPolicy from "./about/PrivacyPolicy";
import WhoWeAre from "./about/WhoWeAre";
import Terms from "./about/TermsAndConditions";
import RegionNews from "./categories/RegionNews";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="/category/:category" element={<RegionNews />} />

        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="who-we-are" element={<WhoWeAre />} />
        <Route path="terms-of-service" element={<Terms />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
