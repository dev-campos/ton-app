import { ResponseType } from './response'

export type Pair = {
    id: string;
    symbol: string;
    name: string;
    precision: number;
    quoteAssetId: string;
    baseAssetId: string;
    quotaAsset: string;
    baseAsset: string;
    status: number;
};

export type PairResponse = ResponseType<Pair[]>;


