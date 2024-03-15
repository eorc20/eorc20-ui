import { Box, BoxProps } from '@inscription/uikit'

const Container: React.FC<React.PropsWithChildren<BoxProps>> = ({ children, ...props }) => (
  // mx = "auto" maxWidth = "1400px"
  <Box px={['16px', '16px']} {...props}>
    {children}
  </Box>
)

export default Container
