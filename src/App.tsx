import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { Header } from "./components/Header/Header";

import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <TonConnectUIProvider
            manifestUrl="https://dev-campos.github.io/ton-app/tonconnect-manifest.json"
            uiPreferences={{ theme: THEME.DARK }}
            actionsConfiguration={{
                twaReturnUrl: "https://t.me/campos_tonbot",
            }}>
            <div className="app">
                <Header />
                <Outlet />
            </div>
        </TonConnectUIProvider>
    );
}

export default App;
