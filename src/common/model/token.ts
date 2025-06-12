export enum ETokenHandleType {
    CRAWL_CMT = 1,
    GET_INFO = 2
}
export interface IToken {
    id: number;
    tokenValue: string;
    status: TokenStatus;
    type: ETokenHandleType
}

export enum TokenStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    LIMIT = 'limit',
    DIE = 'die',
}