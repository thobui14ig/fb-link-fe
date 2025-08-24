export enum VpsStatus {
    Live = 'live',
    Die = 'die',
}

export interface IPage {
    id: number,
    ip: string,
    port: number,
    status: VpsStatus
}