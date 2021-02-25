import { useContext } from 'react'

import { CountdownContext } from '../contexts/Countdown'

import styles from '../styles/components/Countdown.module.css'

function Countdown() {
	const {
		minutes, seconds, hasFinished, isActive, resetCountdown, startCountdown
	} = useContext(CountdownContext)

	const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
	const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

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
