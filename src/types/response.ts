export type ResponseType<T> = {
    success: boolean;
    data: T;
    error: string;
};