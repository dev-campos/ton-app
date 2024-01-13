import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { RouterProvider } from "react-router-dom";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import Routes from "./Routes";
import "./index.css";
import WebApp from "@twa-dev/sdk";

WebApp.ready();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <TonConnectUIProvider
                manifestUrl="https://campos-tonapp-21787ac31b01.herokuapp.com/tonconnect-manifest.json"
                uiPreferences={{ theme: THEME.DARK }}
                actionsConfiguration={{
                    twaReturnUrl: "https://t.me/campos_tonbot",
                }}>
                <RouterProvider router={Routes} />
            </TonConnectUIProvider>
        </Provider>
    </React.StrictMode>
);
