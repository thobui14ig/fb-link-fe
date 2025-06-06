export enum CookieStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    LIMIT = 'limit',
    DIE = 'die',
}

export interface ICookie {
    id: number;
    cookie: string;
    status: CookieStatus;
}