import { Currency, CurrencyAmount, JSBI } from '../../packages/swap-sdk/src/index'
// import { BIG_INT_ZERO, MIN_EOS } from 'config/constants/exchange'

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export function maxAmountSpend(currencyAmount?: CurrencyAmount<Currency>): CurrencyAmount<Currency> | undefined {
  if (!currencyAmount) return undefined
  // if (currencyAmount.currency?.isNative) {
  //   if (JSBI.greaterThan(currencyAmount.quotient, MIN_EOS)) {
  //     return CurrencyAmount.fromRawAmount(currencyAmount.currency, JSBI.subtract(currencyAmount.quotient, MIN_EOS))
  //   }
  //   return CurrencyAmount.fromRawAmount(currencyAmount.currency, BIG_INT_ZERO)
  // }
  return currencyAmount
}
