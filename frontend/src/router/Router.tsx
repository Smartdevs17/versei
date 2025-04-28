import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
import Home from "../pages/home/Home";
import Marketplace from "../pages/home/Marketplace";
  
  // LAYOUTS
  
  // PAGES
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">

        {/* LANDING PAGE */}
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/governance" element={<Home />} />

  
        {/* EVERY OTHER PAGE ROUTING SHOULD BE DONE IN HERE */}
        <Route path="pharos" element={<h1>hi</h1>}>
          {/* TO NAVIGATE TO THIS ROUTE JUST GO TO: /flexi/example  */}
        <Route path="marketplace" element={<h1>Marketplace Page</h1>} />
        {/* <Route path="governance" element={<h1>Governance Page</h1>} /> */}
        </Route>
      </Route>
    )
  );
  
  const Router = () => {
    return <RouterProvider router={router} />;
  };
  
  export default Router;