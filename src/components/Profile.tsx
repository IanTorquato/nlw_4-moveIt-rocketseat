import { useContext } from 'react'

import { ChallengeContext } from '../contexts/Challenges'

import styles from '../styles/components/Profile.module.css'

function Profile() {
  const { level } = useContext(ChallengeContext)

  return (
    <div className={styles.profileContainer} >
      <img src="https://github.com//IanTorquato.png" alt="Ian Torquato" />

      <div>
        <strong>Ian Torquato</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}

export { Profile }
