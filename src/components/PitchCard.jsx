import { Link } from 'react-router-dom'
import styles from './PitchCard.module.css'

export default function PitchCard({ pitch }) {
  return (
    <div className={styles.card}>
      <h3>{pitch.name}</h3>
      <p>{pitch.tagline}</p>
      <p className={styles.pitch}>{pitch.pitch}</p>
      <Link to={`/pitch/${pitch.id}`} className={styles.link}>View</Link>
    </div>
  )
}
