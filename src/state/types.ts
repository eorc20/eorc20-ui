import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber'
import { parseUnits } from '@ethersproject/units'
// import { SerializedFarmPublicData } from '@inscription/farms'
import { Token } from '../../packages/swap-sdk/src/index'
import BigNumber from 'bignumber.js'
import {
  CampaignType,
  DeserializedPoolConfig,
  FetchStatus,
  LotteryStatus,
  LotteryTicket,
  SerializedPoolConfig,
  Team,
  TranslatableText,
} from '../config/constants/types'

export enum GAS_PRICE {
  default = '150',
  fast = '180',
  instant = '210',
  testnet = '200',
}

export const GAS_PRICE_GWEI = {
  rpcDefault: 'rpcDefault',
  default: parseUnits(GAS_PRICE.default, 'gwei').toString(),
  fast: parseUnits(GAS_PRICE.fast, 'gwei').toString(),
  instant: parseUnits(GAS_PRICE.instant, 'gwei').toString(),
  testnet: parseUnits(GAS_PRICE.testnet, 'gwei').toString(),
}
export interface BigNumberToJson {
  type: 'BigNumber'
  hex: string
}

export type SerializedBigNumber = string

interface SerializedFarmUserData {
  allowance: string
  tokenBalance: string
  stakedBalance: string
  earnings: string
  proxy?: {
    allowance: string
    tokenBalance: string
    stakedBalance: string
    earnings: string
  }
}

export interface DeserializedFarmUserData {
  allowance: BigNumber
  tokenBalance: BigNumber
  stakedBalance: BigNumber
  earnings: BigNumber
  proxy?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
  }
}

// export interface SerializedFarm extends SerializedFarmPublicData {
//   userData?: SerializedFarmUserData
// }

// export interface DeserializedFarm extends DeserializedFarmConfig {
//   tokenPriceEusd?: string
//   quoteTokenPriceEusd?: string
//   tokenAmountTotal?: BigNumber
//   quoteTokenAmountTotal?: BigNumber
//   lpTotalInQuoteToken?: BigNumber
//   lpTotalSupply?: BigNumber
//   tokenPriceVsQuote?: BigNumber
//   poolWeight?: BigNumber
//   userData?: DeserializedFarmUserData
//   boosted?: boolean
// }
interface CorePoolProps {
  startBlock?: number
  endBlock?: number
  apr?: number
  rawApr?: number
  stakingTokenPrice?: number
  earningTokenPrice?: number
}

export interface DeserializedPool extends DeserializedPoolConfig, CorePoolProps {
  totalStaked?: BigNumber
  stakingLimit?: BigNumber
  stakingLimitEndBlock?: number
  profileRequirement?: {
    required: boolean
    thresholdPoints: BigNumber
  }
  userDataLoaded?: boolean
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
  }
}

export interface SerializedPool extends SerializedPoolConfig, CorePoolProps {
  totalStaked?: SerializedBigNumber
  stakingLimit?: SerializedBigNumber
  numberBlocksForUserLimit?: number
  profileRequirement?: {
    required: boolean
    thresholdPoints: SerializedBigNumber
  }
  userData?: {
    allowance: SerializedBigNumber
    stakingTokenBalance: SerializedBigNumber
    stakedBalance: SerializedBigNumber
    pendingReward: SerializedBigNumber
  }
}

export interface Profile {
  userId: number
  points: number
  teamId: number
  collectionAddress: string
  tokenId: number
  isActive: boolean
  username: string
  team?: Team
  hasRegistered: boolean
}

// Slices states


export interface SerializedVaultFees {
  performanceFee: number
  withdrawalFee: number
  withdrawalFeePeriod: number
}

export interface DeserializedVaultFees extends SerializedVaultFees {
  performanceFeeAsDecimal: number
}




// Ifo
export interface IfoState extends PublicIfoData {
  credit: string
}

export interface PublicIfoData {
  ceiling: string
}

export type TeamsById = {
  [key: string]: Team
}

export interface Achievement {
  id: string
  type: CampaignType
  address: string
  title: TranslatableText
  description?: TranslatableText
  badge: string
  points: number
}

// Predictions

export enum BetPosition {
  BULL = 'Bull',
  BEAR = 'Bear',
  HOUSE = 'House',
}

export enum PredictionStatus {
  INITIAL = 'initial',
  LIVE = 'live',
  PAUSED = 'paused',
  ERROR = 'error',
}

export enum PredictionSupportedSymbol {
  EOS = 'EOS',
}

export enum PredictionsChartView {
  TradingView = 'TradingView',
  Chainlink = 'Chainlink Oracle',
}

export interface Round {
  id: string
  epoch: number
  position: BetPosition
  failed: boolean
  startAt: number
  startBlock: number
  startHash: string
  lockAt: number
  lockBlock: number
  lockHash: string
  lockPrice: number
  lockRoundId: string
  closeAt: number
  closeBlock: number
  closeHash: string
  closePrice: number
  closeRoundId: string
  totalBets: number
  totalAmount: number
  bullBets: number
  bullAmount: number
  bearBets: number
  bearAmount: number
  bets?: Bet[]
}

export interface Market {
  paused: boolean
  epoch: number
}

export interface Bet {
  id?: string
  hash?: string
  amount: number
  position: BetPosition
  claimed: boolean
  claimedAt: number
  claimedBlock: number
  claimedHash: string
  claimedEOS: number
  claimedNetEOS: number
  createdAt: number
  updatedAt: number
  user?: PredictionUser
  round?: Round
}

export interface PredictionUser {
  id: string
  createdAt: number
  updatedAt: number
  block: number
  totalBets: number
  totalBetsBull: number
  totalBetsBear: number
  totalEOS: number
  totalEOSBull: number
  totalEOSBear: number
  totalBetsClaimed: number
  totalEOSClaimed: number
  winRate: number
  averageEOS: number
  netEOS: number
  bets?: Bet[]
}

export enum HistoryFilter {
  ALL = 'all',
  COLLECTED = 'collected',
  UNCOLLECTED = 'uncollected',
}

export interface LedgerData {
  [key: string]: {
    [key: string]: ReduxNodeLedger
  }
}

export interface RoundData {
  [key: string]: ReduxNodeRound
}

export interface ReduxNodeLedger {
  position: BetPosition
  amount: BigNumberToJson
  claimed: boolean
}

export interface NodeLedger {
  position: BetPosition
  amount: EthersBigNumber
  claimed: boolean
}

export interface ReduxNodeRound {
  epoch: number
  startTimestamp: number | null
  lockTimestamp: number | null
  closeTimestamp: number | null
  lockPrice: BigNumberToJson | null
  closePrice: BigNumberToJson | null
  totalAmount: BigNumberToJson
  bullAmount: BigNumberToJson
  bearAmount: BigNumberToJson
  rewardBaseCalAmount: BigNumberToJson
  rewardAmount: BigNumberToJson
  oracleCalled: boolean
  lockOracleId: string
  closeOracleId: string
}

export interface NodeRound {
  epoch: number
  startTimestamp: number | null
  lockTimestamp: number | null
  closeTimestamp: number | null
  lockPrice: EthersBigNumber | null
  closePrice: EthersBigNumber | null
  totalAmount: EthersBigNumber
  bullAmount: EthersBigNumber
  bearAmount: EthersBigNumber
  rewardBaseCalAmount: EthersBigNumber
  rewardAmount: EthersBigNumber
  oracleCalled: boolean
  closeOracleId: string
  lockOracleId: string
}

export type LeaderboardFilterTimePeriod = '1d' | '7d' | '1m' | 'all'

export interface LeaderboardFilter {
  address?: string
  orderBy?: string
  timePeriod?: LeaderboardFilterTimePeriod
}

export interface PredictionsState {
  status: PredictionStatus
  isLoading: boolean
  isHistoryPaneOpen: boolean
  chartView: PredictionsChartView
  isChartPaneOpen: boolean
  isFetchingHistory: boolean
  historyFilter: HistoryFilter
  currentEpoch: number
  intervalSeconds: number
  minBetAmount: string
  bufferSeconds: number
  history: Bet[]
  totalHistory: number
  currentHistoryPage: number
  hasHistoryLoaded: boolean
  rounds?: RoundData
  ledgers?: LedgerData
  claimableStatuses: {
    [key: string]: boolean
  }
  leaderboard: {
    selectedAddress: string
    loadingState: FetchStatus
    filters: LeaderboardFilter
    skip: number
    hasMoreResults: boolean
    addressResults: {
      [key: string]: PredictionUser
    }
    results: PredictionUser[]
  }
}

// Voting

/* eslint-disable camelcase */
/**
 * @see https://hub.snapshot.page/graphql
 */
export interface VoteWhere {
  id?: string
  id_in?: string[]
  voter?: string
  voter_in?: string[]
  proposal?: string
  proposal_in?: string[]
}

export enum SnapshotCommand {
  PROPOSAL = 'proposal',
  VOTE = 'vote',
}

export enum ProposalType {
  ALL = 'all',
  CORE = 'core',
  COMMUNITY = 'community',
}

export enum ProposalState {
  ACTIVE = 'active',
  PENDING = 'pending',
  CLOSED = 'closed',
}

export interface Space {
  id: string
  name: string
}

export interface Proposal {
  author: string
  body: string
  choices: string[]
  end: number
  id: string
  snapshot: string
  space: Space
  votes: number
  start: number
  state: ProposalState
  title: string
}

export interface Vote {
  id: string
  voter: string
  created: number
  space: Space
  proposal: {
    choices: Proposal['choices']
  }
  choice: number
  metadata?: {
    votingPower: string
  }
}

export interface UserRound {
  claimed: boolean
  lotteryId: string
  status: LotteryStatus
  endTime: string
  totalTickets: string
  tickets?: LotteryTicket[]
}

export interface PredictionConfig {
  address: string
  api: string
  chainlinkOracleAddress: string
  minPriceUsdDisplayed: EthersBigNumber
  displayedDecimals: number
  token: Token
}

// Pottery
export interface PotteryState {
  lastVaultAddress: string
  publicData: SerializedPotteryPublicData
  userData: SerializedPotteryUserData
  finishedRoundInfo: PotteryRoundInfo
}

export interface SerializedPotteryPublicData {
  lastDrawId: string
  totalPrize: string
  getStatus: PotteryDepositStatus
  totalSupply: string
  lockStartTime: string
  totalLockedValue: string
  latestRoundId: string
  maxTotalDeposit: string
}

export interface DeserializedPublicData {
  lastDrawId: string
  totalPrize: BigNumber
  getStatus: PotteryDepositStatus
  totalSupply: BigNumber
  lockStartTime: string
  totalLockedValue: BigNumber
  latestRoundId: string
  maxTotalDeposit: BigNumber
}

export interface SerializedPotteryUserData {
  isLoading?: boolean
  allowance: string
  previewDepositBalance: string
  stakingTokenBalance: string
  rewards: string
  winCount: string
  withdrawAbleData: PotteryWithdrawAbleData[]
}

export interface DeserializedPotteryUserData {
  isLoading?: boolean
  allowance: BigNumber
  previewDepositBalance: BigNumber
  stakingTokenBalance: BigNumber
  rewards: BigNumber
  winCount: string
  withdrawAbleData: PotteryWithdrawAbleData[]
}

export interface PotteryRoundInfo {
  isFetched: boolean
  roundId: string
  drawDate: string
  prizePot: string
  totalPlayers: string
  txid: string
  winners: Array<string>
  lockDate: string
}

export enum PotteryDepositStatus {
  BEFORE_LOCK = 0,
  LOCK = 1,
  UNLOCK = 2,
}

export interface PotteryWithdrawAbleData {
  id: string
  shares: string
  depositDate: string
  previewRedeem: string
  status: PotteryDepositStatus
  potteryVaultAddress: string
  totalSupply: string
  lockedDate: string
  balanceOf: string
}

// Global state

export interface State {
  predictions: PredictionsState
  pottery: PotteryState
}
