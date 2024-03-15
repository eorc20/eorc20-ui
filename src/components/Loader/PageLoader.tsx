import styled from 'styled-components'
import { Spinner } from '@inscription/uikit'
import Page from '../Layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Wrapper>
      {/* <Spinner /> */}
      <img src="/images/start/loadingnew.png" width={200} alt="" />
    </Wrapper>
  )
}

export default PageLoader
