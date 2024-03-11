import { useEffect, useState } from 'react';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, OpenedContract } from '@ton/core';
import { OptionLedger } from '../contracts/optionLedger';

export function useOptionLedgerContract() {
    const client = useTonClient();
    const [val, setVal] = useState<null | number>();
    const { sender } = useTonConnect();

    const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

    const optionLedgerContract = useAsyncInitialize(async () => {
        if (!client) return;
        const contract = new OptionLedger(
            Address.parse('EQCXfXmIRHlrVZ4h9H3n9GLmayDo2C7tZjqrrbuM8jm6k-b3')
        );
        return client.open(contract) as OpenedContract<OptionLedger>;
    }, [client]);

    useEffect(() => {
        async function getValue() {
            if (!optionLedgerContract) return;
            setVal(null);
            const val = await optionLedgerContract.getID();
            setVal(val);
            await sleep(5000);
            getValue();
        }
        getValue();
    }, [optionLedgerContract]);

    return {
        value: val,
        address: optionLedgerContract?.address.toString(),
        sendPlaceCallOrder: (amount: bigint) => {
            if (val) {
                return optionLedgerContract?.sendPlaceCallOrder(sender, { optionLedger: val, value: amount });
            }
        },
        sendPlacePutOrder: (amount: bigint) => {
            if (val) {
                return optionLedgerContract?.sendPlacePutOrder(sender, { optionLedger: val, value: amount });
            }
        },
    };
}
