import { useContext } from 'react'

import { ChallengeContext } from '../contexts/Challenges'

import styles from '../styles/components/ExperienceBar.module.css'

function ExperienceBar() {
	const { currentExperience, experienceToNextLevel } = useContext(ChallengeContext)

	const currentLevelPercentage = Math.round(currentExperience * 100 / experienceToNextLevel)

	return (
		<header className={styles.experienceBar}>
			<span>0 xp</span>
			<div>
				<div style={{ width: `${currentLevelPercentage}%` }} />

				<span className={styles.currentExperience}
					style={{ left: `${currentLevelPercentage}%` }}>
					{currentExperience} xp
				</span>
			</div>
			<span>{experienceToNextLevel} xp</span>
		</header>
	)
}

export { ExperienceBar }