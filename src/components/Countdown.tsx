import { useContext, useEffect, useState } from 'react'

import { ChallengeContext } from '../contexts/Challenges'

import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout

function Countdown() {
	const { startNewChallenge } = useContext(ChallengeContext)

	const [time, setTime] = useState(0.05 * 60)
	const [isActive, setIsActive] = useState(false)
	const [hasFinished, setHasFinished] = useState(false)

	const minutes = Math.floor(time / 60)
	const seconds = time % 60

	const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
	const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

	function startCountdown() {
		setIsActive(true)
	}

	function resetCountdown() {
		clearTimeout(countdownTimeout)
		setIsActive(false)
		setTime(0.05 * 60)
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
		<div>
			<div className={styles.countdownContainer}>
				<div>
					<span>{minuteLeft}</span>
					<span>{minuteRight}</span>
				</div>

				<span>:</span>

				<div>
					<span>{secondLeft}</span>
					<span>{secondRight}</span>
				</div>
			</div>

			{hasFinished ? (
				<button className={styles.countdownButton} disabled>
					Ciclo encerrado
				</button>
			) : (
					<>
						{
							isActive ? (
								<button className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
									type="button" onClick={resetCountdown}>
									Abandonar ciclo
								</button>
							) : (
									<button className={styles.countdownButton} type="button"
										onClick={startCountdown}>
										Iniciar um ciclo
									</button>
								)
						}
					</>
				)}
		</div>
	)
}

export { Countdown }