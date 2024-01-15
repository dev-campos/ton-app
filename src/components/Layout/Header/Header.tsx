import styles from "./Header.module.scss";
import { useEffect } from "react";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
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
            {currentBalance && currentBalance.result ? (
                <div className={styles.ton}>
                    {formatTons(currentBalance.result).toFormat()} TON
                </div>
            ) : (
                <TonConnectButton className={styles.ton} />
            )}
        </header>
    );
};
