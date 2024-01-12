import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import "./header.scss";

export const Header = () => {
    const wallet = useTonWallet();

    if (wallet) {
        console.log(wallet.account.address.split(":")[1]);
    }

    return (
        <header>
            <TonConnectButton />
        </header>
    );
};
