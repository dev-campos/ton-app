import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Homepage } from "./pages/Homepage/Homepage";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Homepage />,
            },
        ],
    },
]);

export default Routes;
