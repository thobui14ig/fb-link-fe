export enum VpsStatus {
  Live = 'live',
  Die = 'die',
}

export interface IVps {
  id: number
  ip: string
  port: string
  status: VpsStatus
  speed: number
}
