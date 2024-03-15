import { CurrencyAmount, JSBI, Native } from '@inscription/sdk'
import { maxAmountSpend } from './maxAmountSpend'

describe('maxAmountSpend', () => {
  it('should be undefined if no input', () => {
    expect(maxAmountSpend()).toBeUndefined()
  })

  it('should has value when CurrencyAmount is EOS and CurrencyAmount is higher than min eos', () => {
    expect(
      JSBI.greaterThan(
        maxAmountSpend(
          CurrencyAmount.fromRawAmount(Native.onChain(56), JSBI.exponentiate(JSBI.BigInt(100), JSBI.BigInt(16))),
        ).quotient,
        JSBI.BigInt(0),
      ),
    ).toBeTruthy()
  })

  it('should be 0 when CurrencyAmount is EOS and CurrencyAmount is low', () => {
    expect(
      JSBI.equal(maxAmountSpend(CurrencyAmount.fromRawAmount(Native.onChain(56), '0')).quotient, JSBI.BigInt(0)),
    ).toBeTruthy()
  })
})
