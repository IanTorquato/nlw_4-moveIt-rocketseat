import { browser } from 'process'
import { createContext, ReactNode, useEffect, useState } from 'react'

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
	experienceToNextLevel: number
	levelUp: () => void
	startNewChallenge: () => void
	completeChallenge: () => void
	resetChallenge: () => void
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

	const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

	useEffect(() => { Notification.requestPermission() }, [])

	function levelUp() {
		setLevel(level + 1)
	}

	function startNewChallenge() {
		const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
		const challenge = challenges[randomChallengeIndex]

		setActiveChallenge(challenge)

		new Audio('/notification.mp3').play()

		if (Notification.permission === 'granted') {
			new Notification('Novo Desafio 🎉', {
				body: `Valendo ${challenge.amount}xp!`, silent: true
			})
		}
	}

	function completeChallenge() {
		if (!activeChallenge) { return }

		const { amount } = activeChallenge

		let finalExperience = currentExperience + amount

		if (finalExperience >= experienceToNextLevel) {
			finalExperience = finalExperience - experienceToNextLevel
			levelUp()
		}

		setCurrentExperience(finalExperience)
		setActiveChallenge(null)
		setChallengeCompleted(challengeCompleted + 1)
	}

	function resetChallenge() {
		setActiveChallenge(null)
	}

	return (
		<ChallengeContext.Provider value={{
			level,
			currentExperience,
			challengeCompleted,
			activeChallenge,
			experienceToNextLevel,
			levelUp,
			startNewChallenge,
			completeChallenge,
			resetChallenge
		}}>
			{children}
		</ChallengeContext.Provider>
	)
}

export { ChallengeContext, ChallengeProvider }