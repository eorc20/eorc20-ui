/* eslint-disable */
import { HelpIcon, useTooltip, Box, BoxProps, Placement } from '@inscription/uikit'
import styled from 'styled-components'

interface Props extends BoxProps {
  text: string | React.ReactNode
  placement?: Placement
  size?: string
  type?: string
}

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover,
  :focus {
    opacity: 0.7;
  }
`

const IconImg = styled.img`
  width: 12px;
`

const QuestionHelper: React.FC<React.PropsWithChildren<Props>> = ({
  text,
  placement = 'right-end',
  size = '16px',
  type,
  ...props
}) => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(text, { placement })

  return (
    <Box {...props}>
      {tooltipVisible && tooltip}
      <QuestionWrapper ref={targetRef}>
        {type === 'info' ? <IconImg src="/images/all/info.png" alt="" /> : <HelpIcon color="textSubtle" width={size} />}
      </QuestionWrapper>
    </Box>
  )
}

export default QuestionHelper
