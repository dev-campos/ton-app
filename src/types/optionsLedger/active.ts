import { ResponseType } from "../response";

export type Active = {
    optionLedgerId: number;
    activeExpired: string;
    lifetimeExpired: string;
    blockchainStatus: number;
    optionLedgerStatus: number;
    assetPair: null;
    assetPairId: string;
    networkV2Id: string;
    networkV2: null;
    price: number;
    paymentProceedBlockchainTxId: null;
    version: number;
    id: string;
    createdOn: string;
    modifiedOn: string;
};

export type ActiveResponse = ResponseType<Active[]>;