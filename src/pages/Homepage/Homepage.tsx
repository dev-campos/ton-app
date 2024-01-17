import { useEffect } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectPairs } from "../../features/pairsSlice";
import { useGetLatestPriceQuery } from "../../services/owlsApiSlice";
import { skipToken } from "@reduxjs/toolkit/query/react";

export const Homepage = () => {
    const pairs = useAppSelector(selectPairs);

    const { data: currentPrice, refetch: refetchCurrentPrice } =
        useGetLatestPriceQuery(
            pairs.activePair
                ? {
                      baseAsset: pairs.activePair.baseAsset,
                      quoteAsset: pairs.activePair.quotaAsset,
                  }
                : skipToken,
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
            <p>{pairs.activePair && pairs.activePair.name}</p>
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
