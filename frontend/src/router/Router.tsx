import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
import Home from "../pages/home/Home";
  
  // LAYOUTS
  
  // PAGES
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">

        {/* LANDING PAGE */}
        <Route path="/" element={<Home />} />

  
        {/* EVERY OTHER PAGE ROUTING SHOULD BE DONE IN HERE */}
        <Route path="pharos" element={<h1>hi</h1>}>
          {/* TO NAVIGATE TO THIS ROUTE JUST GO TO: /flexi/example  */}
        </Route>
      </Route>
    )
  );
  
  const Router = () => {
    return <RouterProvider router={router} />;
  };
  
  export default Router;