import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { RouterProvider } from "react-router-dom";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Routes from "./Routes";
import "./index.css";
import WebApp from "@twa-dev/sdk";

WebApp.ready();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <TonConnectUIProvider
                manifestUrl="https://ton-app.vercel.app/tonconnect-manifest.json"
                actionsConfiguration={{
                    twaReturnUrl: "https://t.me/twinowls_bot",
                }}>
                <RouterProvider router={Routes} />
            </TonConnectUIProvider>
        </Provider>
    </React.StrictMode>
);
