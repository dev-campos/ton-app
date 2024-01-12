import { useState } from "react";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { Header } from "./components/Header/Header";
import "./App.css";

import WebApp from "@twa-dev/sdk";

function App() {
    const [count, setCount] = useState(0);

    return (
        <TonConnectUIProvider
            manifestUrl="https://dev-campos.github.io/ton-app/tonconnect-manifest.json"
            uiPreferences={{ theme: THEME.DARK }}
            actionsConfiguration={{
                twaReturnUrl: "https://t.me/campos_tonbot",
            }}>
            <div className="app">
                <Header />
                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </button>
                </div>
                {/* Here we add our button with alert callback */}
                <div className="card">
                    <button
                        onClick={() =>
                            WebApp.showAlert(
                                `Hello World! Current count is ${count}`
                            )
                        }>
                        Show Alert
                    </button>
                </div>
            </div>
        </TonConnectUIProvider>
    );
}

export default App;
