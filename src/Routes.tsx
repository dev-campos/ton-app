import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Homepage } from "./pages/Homepage/Homepage";
import { Testroute } from "./pages/Testroute/Testroute";

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
                path: "/testRoute",
                element: <Testroute />,
            },
        ],
    },
]);

export default Routes;
