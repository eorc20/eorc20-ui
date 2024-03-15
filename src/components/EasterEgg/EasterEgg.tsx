import { useState, useCallback, memo } from 'react'
import { FallingBunniesProps, useKonamiCheatCode } from '@inscription/uikit'
import dynamic from 'next/dynamic'

const FallingBunnies = dynamic<FallingBunniesProps>(() => import('@inscription/uikit').then((mod) => mod.FallingBunnies), {
  ssr: false,
})

const EasterEgg: React.FC<React.PropsWithChildren<FallingBunniesProps>> = (props) => {
  const [show, setShow] = useState(false)
  const startFalling = useCallback(() => setShow(true), [setShow])
  useKonamiCheatCode(startFalling)

  if (show) {
    return (
      <div onAnimationEnd={() => setShow(false)}>
        <FallingBunnies {...props} />
      </div>
    )
  }
  return null
}

export default memo(EasterEgg)
