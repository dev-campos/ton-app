import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { RouterProvider } from "react-router-dom";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import Routes from "./Routes";
import "./index.css";
import WebApp from "@twa-dev/sdk";
import ReactGA from "react-ga4";

ReactGA.initialize("G-42GW283TMT");

WebApp.ready();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <TonConnectUIProvider
                manifestUrl="https://ton-app.vercel.app/tonconnect-manifest.json"
                uiPreferences={{ theme: THEME.DARK }}
                actionsConfiguration={{
                    twaReturnUrl: "https://t.me/twinowls_bot",
                }}>
                <RouterProvider router={Routes} />
            </TonConnectUIProvider>
        </Provider>
    </React.StrictMode>
);
