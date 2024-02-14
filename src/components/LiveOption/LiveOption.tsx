import React from "react";
import styles from "./LiveOption.module.scss";
import BigNumber from "bignumber.js";
import { Live } from "../../types/optionsLedger/live";

interface LiveOptionProps {
    currentPrice: BigNumber | null;
    currentLiveLedger: Live | null;
}

export const LiveOption: React.FC<LiveOptionProps> = ({
    currentPrice,
    currentLiveLedger,
}) => {
    const locked = currentLiveLedger
        ? new BigNumber(currentLiveLedger.price)
        : null;
    const difference =
        currentPrice && locked ? currentPrice.minus(locked) : null;

    return (
        <div className={styles.live}>
            <h4>Market Live</h4>

            <div className={styles.last}>
                <h5>Last Price:</h5>
                {currentPrice && difference ? (
                    <div className={styles.price}>
                        <div>${currentPrice.toFormat(4)}</div>
                        <div
                            className={
                                typeof difference !== "undefined" &&
                                difference.gte(0)
                                    ? styles.positive
                                    : styles.negative
                            }>
                            ${difference.toFormat(4)}
                        </div>
                    </div>
                ) : (
                    <div className={styles.last}>Loading...</div>
                )}
            </div>

            {locked && (
                <div className={styles.locked}>
                    <span>Locked price</span> ${locked.toFormat(4)}
                </div>
            )}
        </div>
    );
};
