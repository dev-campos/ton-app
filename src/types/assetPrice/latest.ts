import { ResponseType } from '../response'

export type Latest = {
    pair: string | null;
    baseAsset: string;
    quoteAsset: string;
    price: string;
    id: string;
    created_On: string;
    modified_On: string;
};

export type LatestResponse = ResponseType<Latest>;
