export type ResponseType = {
    success: boolean;
    data: Latest;
    error: string;
};

export type Latest = {
    pair: string | null;
    baseAsset: string;
    quoteAsset: string;
    price: string;
    id: string;
    created_On: string;
    modified_On: string;
};
