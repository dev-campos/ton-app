import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Dictionary, Sender, SendMode } from '@ton/core';

export type OptionLedgerConfig = {
    id: number;
    user_id: number;
    users: Dictionary<number, number>;
};

export function optionLedgerConfigToCell(config: OptionLedgerConfig): Cell {
    return beginCell().storeUint(config.id, 32).storeUint(config.user_id, 256).storeDict(config.users).endCell();
}

export const Opcodes = {
    placeCallOrder: 100,
    placePutOrder: 101,
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

    async getUserId(provider: ContractProvider) {
        const result = await provider.get('get_user_id', []);
        return result.stack.readNumber();
    }

    async getUser(provider: ContractProvider, address: Cell) {
        const result = await provider.get('get_user', [{ type: 'slice', cell: address }]);
        const option_ledger_id = result.stack.readNumber();
        const option_type = result.stack.readNumber();
        const option_amount = result.stack.readNumber();
        return ({ option_ledger_id, option_type, option_amount });
    }

    async getID(provider: ContractProvider) {
        const result = await provider.get('get_id', []);
        return result.stack.readNumber();
    }
}