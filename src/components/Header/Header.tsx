import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import styles from "./Header.module.scss";

export const Header = () => {
    const wallet = useTonWallet();

    if (wallet) {
        console.log(wallet.account.address.split(":")[1]);
    }

    return (
        <header className={styles.header}>
            <TonConnectButton />
        </header>
    );
};
