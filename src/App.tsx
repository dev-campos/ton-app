import styles from "./App.module.scss";
import { useEffect } from "react";
import { Header } from "./components/Layout/Header/Header";
import { useAppDispatch } from "./hooks/reduxHooks";

import { Outlet } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import { useGetActivePairsQuery } from "./services/owlsApiSlice";
import { changeActivePair, changePairs } from "./features/pairsSlice";

function App() {
    const dispatch = useAppDispatch();
    const { data: pairsData, isLoading: pairsIsLoading } =
        useGetActivePairsQuery(null);

    useEffect(() => {
        if (pairsData) {
            dispatch(changeActivePair(pairsData.data[0]));
            dispatch(changePairs(pairsData.data));
        }
    }, [dispatch, pairsData]);

    return (
        <div className={styles.app}>
            <Header />
            {pairsIsLoading ? <Loader /> : <Outlet />}
        </div>
    );
}

export default App;
