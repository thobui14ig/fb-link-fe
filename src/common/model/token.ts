export interface IToken {
    id: number;
    tokenValue: string;
    status: TokenStatus;
}

export enum TokenStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    LIMIT = 'limit',
    DIE = 'die',
}