import { ResponseType } from "../response";

export type Active = {
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

export type ActiveResponse = ResponseType<Active[]>;