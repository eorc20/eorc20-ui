import Metamask from "@inscription/uikit/src/components/Svg/Icons/Metamask";
import WalletConnect from "@inscription/uikit/src/components/Svg/Icons/WalletConnect";
import TrustWallet from "@inscription/uikit/src/components/Svg/Icons/TrustWallet";
import MathWallet from "@inscription/uikit/src/components/Svg/Icons/MathWallet";
import TokenPocket from "@inscription/uikit/src/components/Svg/Icons/TokenPocket";
import BinanceChain from "@inscription/uikit/src/components/Svg/Icons/BinanceChain";
import SafePal from "@inscription/uikit/src/components/Svg/Icons/SafePal";
import Coin98 from "@inscription/uikit/src/components/Svg/Icons/Coin98";
import Blocto from "@inscription/uikit/src/components/Svg/Icons/Blocto";
import Brave from "@inscription/uikit/src/components/Svg/Icons/Brave";
import CoinbaseWallet from "@inscription/uikit/src/components/Svg/Icons/CoinbaseWallet";
import Opera from "@inscription/uikit/src/components/Svg/Icons/Opera";

import { Config, ConnectorNames } from "@inscription/uikit/src/widgets/WalletModal/types";

const connectors: Config[] = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: ConnectorNames.MetaMask,
    priority: 1,
    // href: "https://metamask.app.link/dapp/public.io/",
    href: "https://metamask.app.link/dapp/eorc20.io/",
  },
  // {
  //   title: "Binance Wallet",
  //   icon: BinanceChain,
  //   connectorId: ConnectorNames.EVM,
  //   priority: 2,
  // },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
    priority: 2,
  },
  {
    title: "Trust Wallet",
    icon: TrustWallet,
    connectorId: ConnectorNames.Injected,
    priority: 3,
    href: "https://link.trustwallet.com/open_url?coin_id=20000714&url=https://eorc20.io/",
  },
  {
    title: "Coinbase Wallet",
    icon: CoinbaseWallet,
    connectorId: ConnectorNames.WalletLink,
    priority: 4,
  },
  {
    title: "Bitkeep Wallet",
    icon: Opera,
    connectorId: ConnectorNames.Injected,
    priority: () => {
      return typeof window !== "undefined" && Boolean(window?.ethereum?.isBitKeep) ? 0 : 6;
    },
    installed: typeof window !== "undefined" && Boolean(window?.ethereum?.isBitKeep),
    href: "https://bitkeep.com/en/download?type=2",
  },
  {
    title: "FoxWallet",
    icon: Brave,
    connectorId: ConnectorNames.Injected,
    priority: () => {
      // @ts-ignore
      return typeof window !== "undefined" && Boolean(window?.ethereum?.isFoxwallet) ? 0 : 999;
    },
    // @ts-ignore
    installed: typeof window !== "undefined" && Boolean(window?.ethereum?.isFoxwallet),
    href: "https://foxwallet.com/download",
  },
  // {
  //   title: "Opera Wallet",
  //   icon: Opera,
  //   connectorId: ConnectorNames.Injected,
  //   priority: () => {
  //     return typeof window !== "undefined" && Boolean(window.ethereum?.isOpera) ? 0 : 6;
  //   },
  //   installed: typeof window !== "undefined" && Boolean(window.ethereum?.isOpera),
  //   href: "https://www.opera.com/crypto/next",
  // },
  // {
  //   title: "Brave Wallet",
  //   icon: Brave,
  //   connectorId: ConnectorNames.Injected,
  //   priority: () => {
  //     return typeof window !== "undefined" && Boolean(window.ethereum?.isBraveWallet) ? 0 : 6;
  //   },
  //   installed: typeof window !== "undefined" && Boolean(window.ethereum?.isBraveWallet),
  // },
  // {
  //   title: "MathWallet",
  //   icon: MathWallet,
  //   connectorId: ConnectorNames.Injected,
  //   // @ts-ignore
  //   installed: typeof window !== "undefined" && Boolean(window.ethereum?.isMathWallet),
  //   priority: () => {
  //     // @ts-ignore
  //     return typeof window !== "undefined" && Boolean(window.ethereum?.isMathWallet) ? 0 : 999;
  //   },
  // },
  // {
  //   title: "TokenPocket",
  //   icon: TokenPocket,
  //   connectorId: ConnectorNames.Injected,
  //   priority: () => {
  //     return typeof window !== "undefined" && Boolean(window.ethereum?.isTokenPocket) ? 0 : 999;
  //   },
  //   installed: typeof window !== "undefined" && Boolean(window.ethereum?.isTokenPocket),
  // },
  // {
  //   title: "SafePal",
  //   icon: SafePal,
  //   connectorId: ConnectorNames.Injected,
  //   // @ts-ignore
  //   installed: typeof window !== "undefined" && Boolean(window.ethereum?.isSafePal),
  //   priority: () => {
  //     // @ts-ignore
  //     return typeof window !== "undefined" && Boolean(window.ethereum?.isSafePal) ? 0 : 999;
  //   },
  // },
  // {
  //   title: "Coin98",
  //   icon: Coin98,
  //   connectorId: ConnectorNames.Injected,
  //   // @ts-ignore
  //   installed: typeof window !== "undefined" && (Boolean(window.ethereum?.isCoin98) || Boolean(window.coin98)),
  //   priority: () => {
  //     // @ts-ignore
  //     return typeof window !== "undefined" && (Boolean(window.ethereum?.isCoin98) || Boolean(window.coin98)) ? 0 : 999;
  //   },
  // },
  // {
  //   title: "Blocto",
  //   icon: Blocto,
  //   connectorId: ConnectorNames.Injected,
  //   // @ts-ignore
  //   installed: typeof window !== "undefined" && Boolean(window.ethereum?.isBlocto),
  //   priority: () => {
  //     // @ts-ignore
  //     return typeof window !== "undefined" && Boolean(window.ethereum?.isBlocto) ? 0 : 999;
  //   },
  // },
];

export default connectors;
export const connectorLocalStorageKey = "connectorIdv2";
export const walletLocalStorageKey = "wallet";

export const walletConnectConfig = connectors.find((c) => c.title === "WalletConnect");
