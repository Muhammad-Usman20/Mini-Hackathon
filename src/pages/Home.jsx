import { Link } from 'react-router-dom'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.hero}>
      <h1>PitchCraft — Your AI Startup Partner</h1>
      <p>Turn a simple idea into a startup name, tagline, and pitch in seconds.</p>
      <Link to="/create" className={styles.cta}>Create a Pitch</Link>
    </div>
  )
}
