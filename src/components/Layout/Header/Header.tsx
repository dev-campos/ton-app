import styles from "./Header.module.scss";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import logo from "../../../assets/logo.svg";

export const Header = () => {
    const wallet = useTonWallet();

    if (wallet) {
        console.log(wallet.account.address.split(":")[1]);
    }

    return (
        <header className={styles.header}>
            <img className={styles.logo} src={logo} alt="Owls Logo" />
            <TonConnectButton className={styles.ton} />
        </header>
    );
};
