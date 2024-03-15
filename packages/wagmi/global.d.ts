import type { Ethereum } from '@wagmi/core'

declare global {
  interface Window {
    BinanceChain?: {
      eosSign?: (address: string, message: string) => Promise<{ publicKey: string; signature: string }>
      switchNetwork?: (networkId: string) => Promise<string>
    } & Ethereum
  }
}
