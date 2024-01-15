import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectPairs } from "../../features/pairsSlice";
import { useGetLatestPriceQuery } from "../../services/owlsApiSlice";
import Loader from "../../components/Loader/Loader";

export const LatestPrice = () => {
    const pairs = useAppSelector(selectPairs);

    const { data: currentPrice, refetch: refetchCurrentPrice } =
        useGetLatestPriceQuery(
            pairs.activePair
                ? {
                      baseAsset: pairs.activePair.baseAsset,
                      quoteAsset: pairs.activePair.quotaAsset,
                  }
                : !pairs.activePair,
            {
                pollingInterval: 5000,
            }
        );

    useEffect(() => {
        if (pairs.activePair) {
            refetchCurrentPrice();
        }
        pairs;
    }, [pairs.activePair, refetchCurrentPrice]);

    return (
        <div>
            <Link to="/">Homepage</Link>
            <div>
                {currentPrice ? (
                    <p>Latest Price: {currentPrice.data.price}</p>
                ) : (
                    <p>Loading latest price...</p>
                )}
            </div>
        </div>
    );
};
