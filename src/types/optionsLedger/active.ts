import { ResponseType } from "../response";

export type Active = {
    optionLedgerId: number;
    activeExpired: string;
    lifetimeExpired: string;
    blockchainStatus: number;
    optionLedgerStatus: number;
    assetPair: string | null;
    assetPairId: string;
    networkV2Id: string;
    networkV2: string | null;
    strikePrice: number;
    paymentProceedBlockchainTxId: string | null;
    version: number;
    id: string;
    createdOn: string;
    modifiedOn: string;
    totalOptionAmount: number;
    totalPutOptionAmount: number;
    totalCallOptionAmount: number;
    payoutMultiplierCall: number;
    payoutMultiplierPut: number;
};

export type ActiveResponse = ResponseType<Active[]>;