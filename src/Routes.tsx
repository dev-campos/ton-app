import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Homepage } from "./pages/Homepage/Homepage";
import { LatestPrice } from "./pages/LatestPrice/LatestPrice";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Homepage />,
            },
            {
                path: "/LatestPrice",
                element: <LatestPrice />,
            },
        ],
    },
]);

export default Routes;
