import styles from "./Homepage.module.scss";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectPairs } from "../../features/pairsSlice";
import {
    useGetActiveOptionLedgersQuery,
    useGetLatestAssetPriceQuery,
    useGetLiveOptionLedgersQuery,
} from "../../services/owlsApiSlice";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { Modal } from "../../components/Modal/Modal";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import BigNumber from "bignumber.js";
import TradingView from "../../components/TradingView/TradingView";
import { LiveOption } from "../../components/LiveOption/LiveOption";
import { ActiveOption } from "../../components/ActiveOption/ActiveOption";

export const Homepage = () => {
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const pairs = useAppSelector(selectPairs);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // TODO: Refactor this to use a real pair
    const { data: currentPrice, refetch: refetchCurrentPrice } =
        useGetLatestAssetPriceQuery(
            pairs.activePair
                ? {
                      BaseAsset: "BTC",
                      QuoteAsset: "USDT",
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

    const { data: currentActiveLedgers, refetch: refetchCurrentActiveLedgers } =
        useGetActiveOptionLedgersQuery(null, { pollingInterval: 5000 });

    const { data: currentLiveLedgers, refetch: refetchCurrentLiveLedgers } =
        useGetLiveOptionLedgersQuery(null, { pollingInterval: 5000 });

    useEffect(() => {
        refetchCurrentActiveLedgers();
    }, [refetchCurrentActiveLedgers]);

    useEffect(() => {
        refetchCurrentLiveLedgers();
    }, [refetchCurrentLiveLedgers]);

    const current =
        currentPrice && currentPrice.data.price
            ? new BigNumber(currentPrice.data.price)
            : null;

    const liveLedger = currentLiveLedgers ? currentLiveLedgers.data[0] : null;
    const activeLedger = currentActiveLedgers
        ? currentActiveLedgers.data[0]
        : null;

    return (
        <div className={styles.homepage}>
            <div className={styles.selectionCharts}>
                <div>Market {pairs.activePair && pairs.activePair.name}</div>
                <div>
                    <Button
                        label={"Chart"}
                        onClick={openModal}
                        buttonType={"chartButton"}
                    />
                </div>
            </div>
            <Card>
                <LiveOption
                    currentPrice={current}
                    currentLiveLedger={liveLedger}
                />
            </Card>
            <Card>
                <ActiveOption currentActiveLedger={activeLedger} />
            </Card>
            <Card>
                <div className={styles.activePosition}>
                    <h4>Active Position</h4>
                    <div className={styles.info}>
                        <div>
                            <span className={styles.yellow}>Direction</span>{" "}
                            DOWN
                        </div>
                        <div>
                            <span className={styles.yellow}>Locked Price</span>{" "}
                            $43,055.2
                        </div>
                        <div>
                            <span className={styles.yellow}>Amount</span> 10 TON
                        </div>
                        <div>
                            <span className={styles.yellow}>Amount to win</span>{" "}
                            35.11 TON
                        </div>
                        <div>
                            <span className={styles.yellow}>
                                Current status
                            </span>{" "}
                            <span className={styles.positive}>$14.0</span>{" "}
                            <span className={styles.losing}>LOSING</span>
                        </div>
                        <div>
                            <span className={styles.yellow}>Time till end</span>{" "}
                            03:26
                        </div>
                    </div>
                </div>
            </Card>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <TradingView />
            </Modal>
        </div>
    );
};
