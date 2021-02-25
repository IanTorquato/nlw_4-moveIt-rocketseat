import { ChallengeProvider } from '../contexts/Challenges'

import '../styles/global.css'

function MyApp({ Component, pageProps }) {
	return (
		<ChallengeProvider>
			<Component {...pageProps} />
		</ChallengeProvider>
	)
}

export default MyApp