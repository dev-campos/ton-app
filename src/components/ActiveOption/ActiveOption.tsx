import React, { useState } from "react";
import styles from "./ActiveOption.module.scss";
import tonLogo from "../../assets/toncoin-ton-logo.svg";
import BigNumber from "bignumber.js";
import { Button } from "../Button/Button";
import { toNano } from "@ton/core";
import { useOptionLedgerContract } from "../../hooks/useOptionLedgerContract";
import { Active } from "../../types/optionsLedger/active";

interface ActiveOptionProps {
    currentActiveLedger: Active | null;
}

export const ActiveOption: React.FC<ActiveOptionProps> = ({
    currentActiveLedger,
}) => {
    console.log(currentActiveLedger);

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
        }
        sendPlaceCallOrder(toNano(new BigNumber(inputValue).toString()));
        setInputValue("");
    };
    const handleDownClick = () => {
        if (inputValue === "") {
            return;
        }
        sendPlacePutOrder(toNano(new BigNumber(inputValue).toString()));
        setInputValue("");
    };

    const prizePool = new BigNumber(13.0476);
    const payoutUp = 1.35;
    const payoutDown = 3.36;

    return (
        <div className={styles.side}>
            <h4>Take Your Side</h4>
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
                            <span>Payout</span> {payoutUp}x
                        </div>
                    </div>
                    <div className={styles.button}>
                        <Button
                            label="Enter DOWN"
                            buttonType="downButton"
                            onClick={handleDownClick}
                        />
                        <div className={styles.payout}>
                            <span>Payout</span> {payoutDown}x
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
