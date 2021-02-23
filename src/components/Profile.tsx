import styles from '../styles/components/Profile.module.css'

function Profile() {
	return (
		<div className={styles.profileContainer} >
			<img src="https://github.com//IanTorquato.png" alt="Ian Torquato" />

			<div>
				<strong>Ian Torquato</strong>
				<p>
					<img src="icons/level.svg" alt="Level" />
					Level 1
				</p>
			</div>
		</div>
	)
}

export { Profile }