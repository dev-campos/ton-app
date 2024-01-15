export type ResponseType = {
    success: boolean;
    data: Pair[];
    error: string;
};

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


