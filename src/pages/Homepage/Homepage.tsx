import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectPairs } from "../../features/pairsSlice";

export const Homepage = () => {
    const pairs = useAppSelector(selectPairs);
    console.log(pairs);

    return (
        <div>
            <Link to="/LatestPrice">LatestPrice</Link>
            <p>{pairs.activePair && pairs.activePair.name}</p>
        </div>
    );
};
