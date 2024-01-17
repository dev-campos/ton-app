import styles from "./Header.module.scss";
import { useEffect } from "react";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import tonLogo from "../../../assets/toncoin-ton-logo.svg";
import logo from "../../../assets/logo.svg";
import { useGetAddressBalanceQuery } from "../../../services/tonApiSlice";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { formatTons } from "../../../utils/nanotons";

export const Header = () => {
    const address = useTonAddress();

    const { data: currentBalance, refetch: refetchCurrentBalance } =
        useGetAddressBalanceQuery(
            address
                ? {
                      address: address,
                  }
                : skipToken,
            {
                pollingInterval: 5000,
            }
        );

    useEffect(() => {
        if (address) {
            refetchCurrentBalance();
        }
    }, [address, refetchCurrentBalance]);

    return (
        <header className={styles.header}>
            <img className={styles.logo} src={logo} alt="Owls Logo" />
            {address && currentBalance && currentBalance.result ? (
                <div className={styles.ton}>
                    <TonConnectButton />
                    <div className={styles.balance}>
                        {formatTons(currentBalance.result).toFormat()}{" "}
                        <img
                            className={styles.tonLogo}
                            src={tonLogo}
                            alt="ton logo"
                        />
                    </div>
                </div>
            ) : (
                <div className={styles.ton}>
                    <TonConnectButton />
                    <div className={styles.balance}>
                        -{" "}
                        <img
                            className={styles.tonLogo}
                            src={tonLogo}
                            alt="ton logo"
                        />
                    </div>
                </div>
            )}
        </header>
    );
};
