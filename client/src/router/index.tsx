import { createBrowserRouter } from "react-router-dom";
import BlankLayout from "../components/Layouts/BlankLayout";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import { routes } from "./routes";


const finalRoutes = routes.map((route) => {
  //block routes

  if (
   route.layout === "blank"
  
  ) {
    return {
      ...route,
      element: <BlankLayout>{route.element}</BlankLayout>,
    };
  } else {
    return {
      ...route,
      element: (
      
          <DefaultLayout>{route.element}</DefaultLayout>
       
      ),
    };
  }
});

const router = createBrowserRouter(finalRoutes);

export default router;

