import numeral from 'numeral'

// Returns first 2 digits after first non-zero decimal
// i.e. 0.001286 -> 0.0012, 0.9845 -> 0.98, 0.0102 -> 0.010, etc
// Intended to be used for tokens whose value is less than $1
// https://stackoverflow.com/a/23887837
export const getFirstThreeNonZeroDecimals = (value: number) => {
  return value?.toFixed(9).match(/^-?\d*\.?0*\d{0,2}/)[0]
}

export type formatAmountNotation = 'compact' | 'standard'

/**
 * This function is used to format token prices, liquidity, amount of tokens in TX, and in general any numbers on info section
 * @param amount - amount to be formatted
 * @param notation - whether to show 1M or 1,000,000
 * @param displayThreshold - threshold below which it will return simply <displayThreshold instead of actual value, e.g. if 0.001 -> returns <0.001 for 0.0005
 * @param tokenPrecision - set to true when you want precision to be 3 decimals for values < 1 and 2 decimals for values > 1
 * @param isInteger - if true the values will contain decimal part only if the amount is > 1000
 * @returns formatted string ready to be displayed
 */
export const formatAmount = (
  amount: number | undefined,
  options?: {
    notation?: formatAmountNotation
    displayThreshold?: number
    tokenPrecision?: boolean
    isInteger?: boolean
  },
) => {
  const { notation = 'compact', displayThreshold, tokenPrecision, isInteger } = options || { notation: 'compact' }
  if (amount === 0) {
    if (isInteger) {
      return '0'
    }
    return '0.00'
  }
  if (!amount) return '-'
  if (displayThreshold && amount < displayThreshold) {
    return `<${displayThreshold}`
  }
  if (amount < 1 && !tokenPrecision) {
    return getFirstThreeNonZeroDecimals(amount)
  }

  let precision = 2
  if (tokenPrecision) {
    precision = amount < 1 ? 3 : 2
  }

  let format = `0.${'0'.repeat(precision)}a`

  if (notation === 'standard') {
    format = `0,0.${'0'.repeat(precision)}`
  }

  if (isInteger && amount < 1000) {
    format = '0'
  }

  const amountWithPrecision = parseFloat(parseFloat(amount.toString()).toFixed(precision))

  // toUpperCase is needed cause numeral doesn't have support for capital K M B out of the box
  return numeral(amountWithPrecision).format(format).toUpperCase()
}

export const formatUsd = (price = 0) => {
  if (price < 0.01) {
    return '< 0.01'
  }
  if (price >= 10000000000) {
    return `${Number(price / 1000000000)?.toFixed(4)}B`
  }
  if (price >= 10000000) {
    return `${Number(price / 1000000)?.toFixed(4)}M`
  }
  if (price >= 100000) {
    return `${Number(price / 1000)?.toFixed(4)}K`
  }
  return Number(price).toFixed(2)
}

const getZeroNums = (priceData: any) => {
  const price = priceData.toString().split('.')[1] || '0.00'
  const indexOfs = price.indexOf('0')
  let returnValue = ''
  let nums = 0
  let forConti = true
  for (let i = 0; i < price.length; i++) {
    const iNumber = Number(price[i])
    const iNumber1 = Number(price[i + 1])
    if (indexOfs === 0 && forConti) {
      if (iNumber === 0 && iNumber1 === 0) {
        nums++
      } else {
        forConti = false
      }
    }
  }
  if (nums > 3 && indexOfs === 0) {
    returnValue = `0.${price.slice(0, indexOfs + 1)}{${nums + 1}}${price.slice(nums + 1, nums + 4)}`
  } else if ((nums === 2 || nums === 3) && indexOfs === 0) {
    returnValue = Number(priceData).toFixed(8)
  } else {
    returnValue = Number(priceData).toFixed(4)
  }
  return returnValue
}

// 价格格式化
export const formatPrice = (price = 0) => {
  if (!price) return '-'
  if (price < 1) {
    return getZeroNums(price)
  }
  if (price >= 1 && price <= 100) {
    return Number(price).toFixed(4)
  }
  if (price >= 10000000000) {
    return `${Number(price / 1000000000)?.toFixed(4)}B`
  }
  if (price >= 10000000) {
    return `${Number(price / 1000000)?.toFixed(4)}M`
  }
  if (price >= 100000) {
    return `${Number(price / 1000)?.toFixed(4)}K`
  }
  if (price > 100) {
    return Number(price).toFixed(2)
  }
  return Number(price)
}

// 格式化千分位
export const formatNumber = (num, price) => {
  if (num === '-') {
    return '-'
  }
  if (price < 1) {
    return num
  }
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(num)) {
    return 0
  }
  const { length } = `${num}`.split('.')
  let long = 0
  if (length > 1) {
    long = `${num}`.split('.')[1].length
  }
  return Number(num).toLocaleString('en', { minimumFractionDigits: long })
}

export const formatToThousands = (number) =>{
  const numStr = number.toString();
  const parts = numStr.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join('.');
}

export const getRes = (num, digit = 3) => {
  // if (Number(num) === Math.floor(num)) return Math.floor(num);
  const res = []
  let addNum = 0
  // eslint-disable-next-line no-param-reassign
  num += ''
  const [zs, xs] = num.split('.')
  const [, symbol, zsNum] = /^(-?)(\d+\.\d+|\d+)$/.exec(zs)
  for (let i = 0; i < xs.length; i++) {
    const ele = xs[i]
    // eslint-disable-next-line
    if (ele != 0) {
      if (xs[i + digit] && xs[i + digit] > 4) {
        addNum = 1
        for (let j = i + (digit - 1); j >= 0; j--) {
          if (Number(xs[j]) + addNum === 10) res[j] = '0'
          else {
            res[j] = Number(xs[j]) + addNum
            addNum = 0
          }
        }
      } else {
        for (let k = i; k <= i + (digit - 1); k++) {
          res[k] = xs[k]
        }
      }
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

// 格式化代币金额
export const formatTokenAmount = (num) => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(num)) {
    return 0
  }
  if (num >= 10000000000) {
    return `${Number(num / 1000000000)?.toFixed(2)}B`
  }
  if (num >= 10000000) {
    return `${Number(num / 1000000)?.toFixed(2)}M`
  }
  if (num >= 100000) {
    return `${Number(num / 1000)?.toFixed(2)}K`
  }
  if (num > 100) {
    return Number(num).toFixed(2)
  }
  if (num >= 1) {
    return Number(num).toFixed(2)
  }
  if (num >= 0.1) {
    return Number(num).toFixed(3)
  }
  return getRes(num, 3)
}
