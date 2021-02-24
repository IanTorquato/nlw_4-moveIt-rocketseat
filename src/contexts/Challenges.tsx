import { createContext, ReactNode, useState } from 'react'

import challenges from '../../challenges.json'

interface Challenge {
	type: 'body' | 'eye'
	description: string
	amount: number
}

interface ChallengeContextData {
	level: number
	currentExperience: number
	challengeCompleted: number
	activeChallenge: Challenge
	startNewChallenge: () => void
}

interface ChallengeProviderProps {
	children: ReactNode
}

const ChallengeContext = createContext({} as ChallengeContextData)

function ChallengeProvider({ children }: ChallengeProviderProps) {
	const [level, setLevel] = useState(1)
	const [currentExperience, setCurrentExperience] = useState(0)
	const [challengeCompleted, setChallengeCompleted] = useState(0)
	const [activeChallenge, setActiveChallenge] = useState(null)

	function startNewChallenge() {
		const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
		const challenge = challenges[randomChallengeIndex]

		setActiveChallenge(challenge)
	}

	return (
		<ChallengeContext.Provider value={
			{ level, currentExperience, challengeCompleted, activeChallenge, startNewChallenge }
		}>
			{children}
		</ChallengeContext.Provider>
	)
}

export { ChallengeContext, ChallengeProvider }