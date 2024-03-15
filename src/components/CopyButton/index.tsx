import { useState } from 'react'
import { Button, CopyIcon, SvgProps, Text, Flex } from '@inscription/uikit'
import { copyText } from 'utils/copyText'
import styled from 'styled-components'
import { useTranslation } from '@inscription/localization'

const Tooltip = styled.div<{
  isTooltipDisplayed: boolean
  tooltipTop: number
  tooltipRight: number
  tooltipFontSize?: number
}>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline' : 'none')};
  position: absolute;
  padding: 8px;
  top: ${({ tooltipTop }) => `${tooltipTop}px`};
  right: ${({ tooltipRight }) => (tooltipRight ? `${tooltipRight}px` : 0)};
  text-align: center;
  font-size: ${({ tooltipFontSize }) => `${tooltipFontSize}px` ?? '100%'};
  background-color: ${({ theme }) => theme.colors.contrast};
  color: ${({ theme }) => theme.colors.invertedContrast};
  border-radius: 16px;
  opacity: 0.7;
  width: max-content;
  z-index: 100;
`

interface CopyButtonProps extends SvgProps {
  text?: string
  tooltipMessage: string
  tooltipTop: number
  tooltipRight?: number
  tooltipFontSize?: number
  buttonColor?: string
  address?: string
  iconColor?: boolean
}

export const CopyButton: React.FC<React.PropsWithChildren<CopyButtonProps>> = ({
  text = '',
  tooltipMessage,
  width,
  tooltipTop,
  tooltipRight,
  tooltipFontSize,
  address = '',
  iconColor = false,
  buttonColor = 'primary',
  ...props
}) => {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)
  const { t } = useTranslation()

  const displayTooltip = () => {
    setIsTooltipDisplayed(true)
    setTimeout(() => {
      setIsTooltipDisplayed(false)
    }, 1000)
  }
  const addressEslli = `${address.slice(0, 5)}...${address.slice(-4)}`
  return (
    <Flex alignItems="center">
      {address && (
        <Text color="#92929B" fontSize="12px" mr="5px">
          {addressEslli}
        </Text>
      )}
      <Button
        onClick={() => copyText(text, displayTooltip)}
        variant="text"
        style={{ paddingLeft: 0, paddingRight: '10px' }}
      >
        {iconColor ? (
          <img src="/images/start/copy.png" width={12} alt="" />
        ) : (
          <img src="/images/start/icon5.png" width={18} alt="" />
        )}
      </Button>
      <Tooltip
        isTooltipDisplayed={isTooltipDisplayed}
        tooltipTop={tooltipTop}
        tooltipRight={tooltipRight}
        tooltipFontSize={tooltipFontSize}
      >
        {tooltipMessage}
      </Tooltip>
    </Flex>
  )
}
