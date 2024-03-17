import { Flex, Button, Text } from '@inscription/uikit'
import QuestionHelper from '../../../components/QuestionHelper'
import { useTranslation } from '@inscription/localization'
import { useGasPriceManager } from '../../../state/user/hooks'
import { GAS_PRICE_GWEI, GAS_PRICE } from '../../../state/types'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { ChainId } from '../../../../packages/swap-sdk/src/index'

const GasSettings = () => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const [gasPrice, setGasPrice] = useGasPriceManager()

  return (
    <Flex flexDirection="column">
      <Flex mb="12px" alignItems="center">
        <Text>{t('public220')}</Text>
        <QuestionHelper text={t('public219')} placement="top-start" ml="4px" />
      </Flex>
      <Flex flexWrap="wrap">
        <Button
          mt="4px"
          mr="4px"
          border
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.rpcDefault)
          }}
          variant={gasPrice === GAS_PRICE_GWEI.rpcDefault ? 'primary' : 'tertiary'}
        >
          {t('public216')}
        </Button>
        <Button
          mt="4px"
          mr="4px"
          border
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.fast)
          }}
          variant={gasPrice === GAS_PRICE_GWEI.fast ? 'primary' : 'tertiary'}
        >
          {t('public217')}
        </Button>
        <Button
          mr="4px"
          mt="4px"
          border
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.instant)
          }}
          variant={gasPrice === GAS_PRICE_GWEI.instant ? 'primary' : 'tertiary'}
        >
          {t('public218')}
        </Button>
      </Flex>
    </Flex>
  )
}

export default GasSettings
