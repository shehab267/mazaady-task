export * from './category';
export interface IBackendResponse<T>{
    data: T;
    msg: string;
    code: number;
} 