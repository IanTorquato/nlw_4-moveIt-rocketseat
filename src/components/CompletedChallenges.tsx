import { useContext } from 'react'

import { ChallengeContext } from '../contexts/Challenges'

import styles from '../styles/components/CompletedChallenges.module.css'

function CompletedChallenges() {
	const { challengeCompleted } = useContext(ChallengeContext)

	return (
		<div className={styles.completedChallengesContainer}>
			<span>Desafios completos</span>
			<span>{challengeCompleted}</span>
		</div>
	)
}

export { CompletedChallenges }