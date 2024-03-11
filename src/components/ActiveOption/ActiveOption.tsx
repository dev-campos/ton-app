import React, { useState, useEffect } from "react";
import styles from "./ActiveOption.module.scss";
import tonLogo from "../../assets/toncoin-ton-logo.svg";
import BigNumber from "bignumber.js";
import { Button } from "../Button/Button";
import { toNano } from "@ton/core";
import { useOptionLedgerContract } from "../../hooks/useOptionLedgerContract";
import { Active } from "../../types/optionsLedger/active";
import { formatMilliseconds } from "../../utils/formatMilliseconds";

interface ActiveOptionProps {
    currentActiveLedger: Active | null;
}

export const ActiveOption: React.FC<ActiveOptionProps> = ({
    currentActiveLedger,
}) => {
    const [countdown, setCountdown] = useState<number>(0);

    const { sendPlaceCallOrder, sendPlacePutOrder } = useOptionLedgerContract();

    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const value = event.target.value;
        const regex = /^\d*\.?\d{0,9}$/;

        if (regex.test(value) || value === "") {
            setInputValue(value);
        }
    };

    const handleUpClick = () => {
        if (inputValue === "") {
            return;
        } else {
            sendPlaceCallOrder(toNano(new BigNumber(inputValue).toString()));
        }
    };
    const handleDownClick = () => {
        if (inputValue === "") {
            return;
        } else {
            sendPlacePutOrder(toNano(new BigNumber(inputValue).toString()));
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const expirationTime = new Date(
                currentActiveLedger?.activeExpired || ""
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
    }, [currentActiveLedger]);

    const prizePool = currentActiveLedger
        ? new BigNumber(currentActiveLedger.totalOptionAmount)
        : new BigNumber(0);
    const payoutUp = currentActiveLedger
        ? new BigNumber(currentActiveLedger.payoutMultiplierCall)
        : new BigNumber(0);
    const payoutDown = currentActiveLedger
        ? new BigNumber(currentActiveLedger.payoutMultiplierPut)
        : new BigNumber(0);

    return (
        <div className={styles.side}>
            <h4>Take Your Side</h4>

            <div className={styles.countdown}>
                <h5>Time Remaining</h5>
                <div className={styles.time}>
                    {countdown ? formatMilliseconds(countdown) : "Loading..."}
                </div>
            </div>
            <div className={styles.form}>
                <div className={styles.inputPool}>
                    <div className={styles.input}>
                        <input
                            type="text"
                            placeholder="0.0"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <img
                            className={styles.tonLogo}
                            src={tonLogo}
                            alt="ton logo"
                        />
                    </div>
                    <div className={styles.pool}>
                        <h5>Prize Pool</h5>
                        {prizePool ? (
                            <div className={styles.amount}>
                                {prizePool.toFormat(4)}
                                <img
                                    className={styles.tonLogo}
                                    src={tonLogo}
                                    alt="ton logo"
                                />
                            </div>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.button}>
                        <Button
                            label="Enter UP"
                            buttonType="upButton"
                            onClick={handleUpClick}
                        />
                        <div className={styles.payout}>
                            <span>Payout</span> {payoutUp.toFormat()}x
                        </div>
                    </div>
                    <div className={styles.button}>
                        <Button
                            label="Enter DOWN"
                            buttonType="downButton"
                            onClick={handleDownClick}
                        />
                        <div className={styles.payout}>
                            <span>Payout</span> {payoutDown.toFormat()}x
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
