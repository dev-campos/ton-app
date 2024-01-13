import { Header } from "./components/Header/Header";

import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <>
            <div className="app">
                <Header />
                <Outlet />
            </div>
        </>
    );
}

export default App;
