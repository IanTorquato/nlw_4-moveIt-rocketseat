import { createContext, ReactNode, useState } from 'react'

interface ChallengeContextData {
	level: number
	currentExperience: number
	challengeCompleted: number
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

	function startNewChallenge() {
		console.log("New Challenge")
	}

	return (
		<ChallengeContext.Provider value={
			{ level, currentExperience, challengeCompleted, startNewChallenge }
		}>
			{children}
		</ChallengeContext.Provider>
	)
}

export { ChallengeContext, ChallengeProvider }