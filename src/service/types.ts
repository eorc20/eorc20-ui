export type AuthHeader = {
  account: string
  token: string
}

export type Account = {
  id: number
  address: string
  icon: string
  nickName: string
  pic: string
  introduction: string
  link: string
  email: string
  favorite: string
}

export interface UpdateAccount {
  nickName: string
  pic: string
  introduction: string
  link: string
}

export interface Signature {
  signature: string
}

export interface Domain {
  domain: string
}

export interface DNSUser {
  account?: string | null
  chainId?: number
  email?: string | null
}
