/* eslint-disable @typescript-eslint/no-explicit-any */
import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Dictionary, Sender, SendMode } from '@ton/core';

export type OptionLedgerConfig = {
    id: number;
    option_ledger_id: number;
    users: Dictionary<number, UserDetails>;
    awaitingUsers: Dictionary<number, UserDetails>;
};

export type UserDetails = {
    option_type: number;
    option_amount: number;
}

export function optionLedgerConfigToCell(config: OptionLedgerConfig): Cell {
    return beginCell()
        .storeUint(config.id, 32)
        .storeUint(config.option_ledger_id, 256)
        .storeDict(config.users)
        .storeDict(config.awaitingUsers)
        .endCell();
}

export const Opcodes = {
    placeCallOrder: 100,
    placePutOrder: 101,
    processOptionLedger: 102,
    startOptionLedger: 103,

};

export class OptionLedger implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) { }

    static createFromAddress(address: Address) {
        return new OptionLedger(address);
    }

    static createFromConfig(config: OptionLedgerConfig, code: Cell, workchain = 0) {
        const data = optionLedgerConfigToCell(config);
        const init = { code, data };
        return new OptionLedger(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendStartOptionLedger(
        provider: ContractProvider,
        via: Sender,
        opts: {
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.startOptionLedger, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .endCell(),
        });
    }


    async sendPlacePutOrder(
        provider: ContractProvider,
        via: Sender,
        opts: {
            optionLedger: number;
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.placePutOrder, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeUint(opts.optionLedger, 256)
                .endCell(),
        });
    }


    async sendPlaceCallOrder(
        provider: ContractProvider,
        via: Sender,
        opts: {
            optionLedger: number;
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.placeCallOrder, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeUint(opts.optionLedger, 256)
                .endCell(),
        });
    }

    async sendProcessOptionLedger(
        provider: ContractProvider,
        via: Sender,
        opts: {
            optionLedger: number;
            value: bigint;
            queryID?: number;
        }
    ) {
        await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.processOptionLedger, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeUint(opts.optionLedger, 256)
                .endCell(),
        });
    }

    async getUser(provider: ContractProvider, address: Cell) {
        const result = await provider.get('get_user', [{ type: 'slice', cell: address }]);
        const item = result.stack['items'];
        // get optionledger
        const optionLedgerId = item[0].value.toString();
        const optionType = item[1].value.toString();
        const optionAmount = item[2].value.toString();
        item.forEach((element: any) => {
            console.log(element.value.toString());
        });
        return ({ optionLedgerId, optionType, optionAmount });
    }

    async getAwaitingUser(provider: ContractProvider, address: Cell) {
        const result = await provider.get('get_awaiting_user', [{ type: 'slice', cell: address }]);
        const item = result.stack['items'];
        // get optionledger
        const optionLedgerId = item[0].value.toString();
        const optionType = item[1].value.toString();
        const optionAmount = item[2].value.toString();
        item.forEach((element: any) => {
            console.log(element.value.toString());
        });
        return ({ optionLedgerId, optionType, optionAmount });
    }

    async getUsers(provider: ContractProvider) {
        const returnList: { [key: string]: object } = {};
        const result = await provider.get('get_users', []);
        const listResult = result.stack.readLispList();
        console.log(listResult.toString());

        // read FunC list of tuples
        listResult.forEach((element: any) => {
            console.log('Type: ' + element.type);

            // abstract address
            const addressItem = element.items[0];
            const addr = addressItem.cell.beginParse();
            const address = addr.loadAddress();
            addr.endParse();

            // read option ledger id
            const optionLedgerId = element.items[1].value.toString();
            const optionType = element.items[2].value.toString();
            const optionAmount = element.items[3].value.toString();
            returnList[address.toString()] = {
                optionLedgerId: optionLedgerId,
                optionType: optionType,
                optionAmount: optionAmount
            };
        });
        return (returnList);
    }

    async getAwaitingUsers(provider: ContractProvider) {
        const returnList: { [key: string]: object } = {};
        const result = await provider.get('get_awaiting_users', []);
        const listResult = result.stack.readLispList();
        console.log(listResult.toString());

        // read FunC list of tuples
        listResult.forEach((element: any) => {
            console.log('Type: ' + element.type);

            // abstract address
            const addressItem = element.items[0];
            const addr = addressItem.cell.beginParse();
            const address = addr.loadAddress();
            addr.endParse();

            // read option ledger id
            const optionLedgerId = element.items[1].value.toString();
            const optionType = element.items[2].value.toString();
            const optionAmount = element.items[3].value.toString();
            returnList[address.toString()] = {
                optionLedgerId: optionLedgerId,
                optionType: optionType,
                optionAmount: optionAmount
            };
        });
        return (returnList);

    }

    async getID(provider: ContractProvider) {
        const result = await provider.get('get_id', []);
        return result.stack.readNumber();
    }

    async getOptionLedgerId(provider: ContractProvider) {
        const result = await provider.get('get_option_ledger_id', []);
        return result.stack.readNumber();
    }
}