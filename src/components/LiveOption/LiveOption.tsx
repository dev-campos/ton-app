import React, { useEffect, useState } from "react";
import styles from "./LiveOption.module.scss";
import BigNumber from "bignumber.js";
import { Live } from "../../types/optionsLedger/live";
import { format } from "date-fns";

interface LiveOptionProps {
    currentPrice: BigNumber | null;
    currentLiveLedger: Live | null;
}

export const LiveOption: React.FC<LiveOptionProps> = ({
    currentPrice,
    currentLiveLedger,
}) => {
    const [countdown, setCountdown] = useState<number>(0);

    const locked = currentLiveLedger
        ? new BigNumber(currentLiveLedger.price)
        : null;
    const difference =
        currentPrice && locked ? currentPrice.minus(locked) : null;

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const expirationTime = new Date(
                currentLiveLedger?.lifetimeExpired || ""
            ).getTime();
            const remainingTime = Math.max(0, expirationTime - currentTime);

            setCountdown(remainingTime);

            if (remainingTime === 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [currentLiveLedger]);

    return (
        <div className={styles.live}>
            <h4>Market Live</h4>

            <div className={styles.countdown}>
                <h5>Time Remaining</h5>
                <div className={styles.time}>
                    {countdown ? format(countdown, "HH:mm:ss") : "Loading..."}
                </div>
            </div>

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
