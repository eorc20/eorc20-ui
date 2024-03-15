import styled from 'styled-components'
// import { ButtonMenu, ButtonMenuItem } from '@inscription/uikit'
import { useTranslation } from '@inscription/localization'
import { useRouter } from 'next/router'
import Link from 'next/link'

const StyledNav = styled.nav`
  margin-bottom: 40px;
`

const getActiveIndex = (pathname: string): number => {
  if (
    pathname.includes('/pool') ||
    pathname.includes('/create') ||
    pathname.includes('/add') ||
    pathname.includes('/remove') ||
    pathname.includes('/find') ||
    pathname.includes('/liquidity')
  ) {
    return 1
  }
  return 0
}

const Nav = () => {
  const { pathname } = useRouter()
  const { t } = useTranslation()
  return (
    <StyledNav>
      {/* <ButtonMenu activeIndex={getActiveIndex(pathname)} scale="sm" variant="subtle">
        <Link href="/" passHref>
          <ButtonMenuItem id="swap-nav-link" as="a">
            {t('public11')}
          </ButtonMenuItem>
        </Link>
        <Link href="/pool" passHref>
          <ButtonMenuItem id="pool-nav-link" as="a">
            {t('public37')}
          </ButtonMenuItem>
        </Link>
      </ButtonMenu> */}
    </StyledNav>
  )
}

export default Nav
