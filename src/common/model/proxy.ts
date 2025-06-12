export enum ProxyStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}
export interface IProxy {
    id: number;
    proxyAddress: string;
    status: ProxyStatus;
    isFbBlock: boolean
}