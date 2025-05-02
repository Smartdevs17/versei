import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "../pages/home/Home";
import Marketplace from "../pages/home/Marketplace";
import AssetsSection from "../components/marketplaceCards/AssetsSection";
import AssetDetails from "../pages/home/AssetDetails";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";

// LAYOUTS

// PAGES

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* LANDING PAGE */}
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/governance" element={<Home />} />
      <Route path="/" element={<AssetsSection />} />
      <Route path="/asset/:title" element={<AssetDetails />} />

      {/* EVERY OTHER PAGE ROUTING SHOULD BE DONE IN HERE */}
      <Route path="dashboard" element={<DashboardLayout />}>
        {/* TO NAVIGATE TO THIS ROUTE JUST GO TO: /flexi/example  */}
        <Route path="" element={<Dashboard />} />
      </Route>
    </Route>
  )
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
