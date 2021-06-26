import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { ChallengeContext } from './Challenges'

interface CountdownContextData {
  minutes: number
  seconds: number
  hasFinished: boolean
  isActive: boolean
  resetCountdown: () => void
  startCountdown: () => void
}

interface CountdownProviderProps {
  children: ReactNode
}

const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengeContext)

  const [time, setTime] = useState(0.05 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setHasFinished(false)
    setTime(0.05 * 60)
  }

  function startCountdown() {
    setIsActive(true)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider value={{
      minutes, seconds, hasFinished, isActive, resetCountdown, startCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}

export { CountdownContext, CountdownProvider }
