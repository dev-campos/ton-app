import styles from "./Homepage.module.scss";
import { useEffect } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectPairs } from "../../features/pairsSlice";
import { useGetLatestPriceQuery } from "../../services/owlsApiSlice";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import WebApp from "@twa-dev/sdk";
import BigNumber from "bignumber.js";

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

    const locked = new BigNumber(43055.2344);
    const current = currentPrice.data.price
        ? new BigNumber(currentPrice.data.price)
        : null;
    const difference = current ? current.minus(locked) : null;

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
                <div className={styles.live}>
                    <h4>Market Live</h4>

                    {current && difference ? (
                        <div className={styles.last}>
                            <h5>Last Price:</h5>
                            <div className={styles.price}>
                                <div>${current.toFormat(4)}</div>
                                <div
                                    className={
                                        difference.gte(0)
                                            ? styles.positive
                                            : styles.negative
                                    }>
                                    ${difference.toFormat(4)}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}

                    {locked && (
                        <div className={styles.locked}>
                            <span>Locked price:</span> ${locked.toFormat(4)}
                        </div>
                    )}
                </div>
            </Card>
            <Card>
                <div className={styles.side}>
                    <h4>Take Your Side</h4>
                    <div className={styles.form}>
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
