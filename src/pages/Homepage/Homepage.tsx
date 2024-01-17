import styles from "./Homepage.module.scss";
import { useEffect } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectPairs } from "../../features/pairsSlice";
import { useGetLatestPriceQuery } from "../../services/owlsApiSlice";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import WebApp from "@twa-dev/sdk";

export const Homepage = () => {
    const pairs = useAppSelector(selectPairs);

    const handleChartClick = () => WebApp.showAlert("Chart clicked");
    const handleUpClick = () => WebApp.showAlert("Up clicked");
    const handleDownClick = () => WebApp.showAlert("Down clicked");

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
        <div className={styles.homepage}>
            <div className={styles.selectionCharts}>
                <div>Market {pairs.activePair && pairs.activePair.name}</div>
                <div>
                    <Button
                        label={"Chart"}
                        onClick={handleChartClick}
                        buttonType={"chartButton"}
                    />
                </div>
            </div>
            <Card>
                <div className={styles.liveMarket}>
                    <h4>Market Live</h4>
                    {currentPrice ? (
                        <div>Latest Price: {currentPrice.data.price}</div>
                    ) : (
                        <div>Loading latest price...</div>
                    )}
                </div>
            </Card>
            <Card>
                <div>
                    <h4>Take Your Side</h4>
                    <div className={styles.buttons}>
                        <Button
                            label="Enter UP"
                            buttonType="upButton"
                            onClick={handleUpClick}
                        />
                        <Button
                            label="Enter DOWN"
                            buttonType="downButton"
                            onClick={handleDownClick}
                        />
                    </div>
                </div>
            </Card>
            <Card>
                <div className={styles.activePosition}>
                    <h4>Active Position</h4>
                    <div>Direction: DOWN</div>
                    <div>Locked Price: $43,055.2</div>
                    <div>Amount: 10 TON</div>
                    <div>Amount to win: 35.11 TON</div>
                    <div>Current status: $14.0 LOSING</div>
                    <div>Time till end: 03:26</div>
                </div>
            </Card>
        </div>
    );
};
