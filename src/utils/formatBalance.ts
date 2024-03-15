/* eslint-disable */
import BigNumber from 'bignumber.js'
import { BigNumber as EthersBigNumber, FixedNumber } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'
import { getLanguageCodeFromLS } from '@inscription/localization'
import { getFullDecimalMultiplier } from './getFullDecimalMultiplier'

// 加法函数
export function getAdd(a, b) {
  const num1 = new BigNumber(a)
  const num2 = new BigNumber(b)
  return num1.plus(num2).toString()
}

// 减法函数
export function getSub(a, b) {
  const num1 = new BigNumber(a)
  const num2 = new BigNumber(b)
  return num1.minus(num2).toString()
}

export function formatBalance(price, precision) {
  const realPrice = formatBigNumber(price)
  const scaledPrice = Number(realPrice) * 10 ** 18
  const formattedPrice = (scaledPrice / 10 ** precision).toFixed(precision)
  return formattedPrice
}
/**
 * Take a formatted amount, e.g. 15 EOS and convert it to full decimal value, e.g. 15000000000000000
 */
export const getDecimalAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).times(getFullDecimalMultiplier(decimals))
}

export const getBalanceAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).dividedBy(getFullDecimalMultiplier(decimals))
}

/**
 * This function is not really necessary but is used throughout the site.
 */
export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
  return getBalanceAmount(balance, decimals).toNumber()
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18, displayDecimals?: number): string => {
  return getBalanceAmount(balance, decimals).toFixed(displayDecimals)
}

/**
 * Don't use the result to convert back to number.
 * It uses undefined locale which uses host language as a result.
 * Languages have different decimal separators which results in inconsistency when converting back this result to number.
 */
export const formatNumber = (number: number, minPrecision = 2, maxPrecision = 2) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  }
  return number.toLocaleString(undefined, options)
}

/**
 * Method to format the display of wei given an EthersBigNumber object
 * Note: does NOT round
 */
export const formatBigNumber = (number: EthersBigNumber, displayDecimals = 18, decimals = 18) => {
  const remainder = number.mod(EthersBigNumber.from(10).pow(decimals - displayDecimals))
  return formatUnits(number.sub(remainder), decimals)
}

/**
 * Method to format the display of wei given an EthersBigNumber object with toFixed
 * Note: rounds
 */
export const formatBigNumberToFixed = (number: EthersBigNumber, displayDecimals = 18, decimals = 18): any => {
  const formattedString = formatUnits(number, decimals)
  return (+formattedString).toFixed(displayDecimals)
}

/**
 * Formats a FixedNumber like BigNumber
 * i.e. Formats 9763410526137450427.1196 into 9.763 (3 display decimals)
 */
export const formatFixedNumber = (number: FixedNumber, displayDecimals = 18, decimals = 18) => {
  // Remove decimal
  const [leftSide] = number.toString().split('.')
  return formatBigNumber(EthersBigNumber.from(leftSide), displayDecimals, decimals)
}

export const formatLocalisedCompactNumber = (number: number): string => {
  const codeFromStorage = getLanguageCodeFromLS()

  const isClient = typeof window === 'object'
  const isSupported = window?.Intl

  // For clients do not support Intl, just return number
  if (isClient && !isSupported) {
    return `${number}`
  }

  return new Intl.NumberFormat(codeFromStorage, {
    notation: 'compact',
    compactDisplay: 'long',
    maximumSignificantDigits: 2,
  }).format(number)
}

export default formatLocalisedCompactNumber

export const formatLpBalance = (balance: BigNumber) => {
  const stakedBalanceBigNumber = getBalanceAmount(balance)
  if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.00001)) {
    return '< 0.00001'
  }
  return stakedBalanceBigNumber.toFixed(5, BigNumber.ROUND_DOWN)
}

// 截取，只保留有效位数
export const truncate = (num, decimals) => {
  const multiplier = 10 ** decimals
  return Math.floor(num * multiplier) / multiplier
}
// 截取，包含0
export const truncateZero = (num, decimals) => {
  const str = num.toString()
  const index = str.indexOf('.')

  if (index >= 0) {
    const mainPart = str.slice(0, index)
    const decimalPart = str.slice(index + 1, index + 1 + decimals)
    return mainPart + '.' + decimalPart.padEnd(decimals, '0')
  } else {
    return str + '.' + '0'.repeat(decimals)
  }
}

// 返回3位或指定有效位小数，例如：200.000输出200，200.000123输出200.000123
export const formatEffectiveNumber = (num) => {
  let n = Number(num)
  let str = n.toString()
  let decimalIndex = str.indexOf('.')
  if (decimalIndex !== -1 && str.length > decimalIndex + 4) {
    return str.slice(0, decimalIndex + 4)
  } else {
    return str
  }
}

export const formatEffectiveNumberSix = (decimal) => {
  const decimalString = decimal.toString()
  const match = decimalString.match(/^0\.0*([1-9]\d{0,5})/)
  if (match) {
    return match[0]
  } else {
    return Number(decimal).toPrecision(8)
  }
}

export const formatEffectiveNumber2 = (num, decimal) => {
  let str = num.toString()
  let decimalIndex = str.indexOf('.')
  if (decimalIndex !== -1) {
    let decimals = str.slice(decimalIndex + 1)
    let nonZeroIndex = decimals.search(/[^0]/) //查找第一个非零小数的位置
    if (nonZeroIndex !== -1) {
      //保留指定有效位数的小数
      let effectiveDecimals = decimals.slice(nonZeroIndex, nonZeroIndex + decimal)
      return str.slice(0, decimalIndex + 1) + effectiveDecimals
    }
  }
  return str
}

// 取消四舍五入
export const getRes = (num, digit = 3) => {
  // if (Number(num) === Math.floor(num)) return Math.floor(num);
  const res = []
  let addNum = 0
  // eslint-disable-next-line no-param-reassign
  num += ''
  const [zs, xs] = num.split('.')
  const [, symbol, zsNum] = /^(-?)(\d+\.\d+|\d+)$/.exec(zs)
  if (!xs) return num
  for (let i = 0; i < xs.length; i++) {
    const ele = xs[i]
    // eslint-disable-next-line
    if (ele != 0) {
      // if (xs[i + digit] && xs[i + digit] > 4) {
      //   addNum = 1
      //   for (let j = i + (digit - 1); j >= 0; j--) {
      //     if (Number(xs[j]) + addNum === 10) res[j] = '0'
      //     else {
      //       res[j] = Number(xs[j]) + addNum
      //       addNum = 0
      //     }
      //   }
      // } else {
      for (let k = i; k <= i + (digit - 1); k++) {
        res[k] = xs[k]
      }
      // }
      break
    } else res[i] = xs[i]
  }
  return getFullNum(Number(`${symbol + (Number(zsNum) + addNum)}.${res.join('')}`))
}

export const getFullNum = (num) => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(num)) {
    return num
  }
  // 处理不需要转换的数字
  const str = String(num)
  if (!/e/i.test(str)) {
    return num
  }
  return Number(num)
    .toFixed(18)
    .replace(/\.?0+$/, '')
}

export const toFixed = (value, precision) => {
  const numberValue = Number(value)
  return numberValue.toFixed(precision)
}
