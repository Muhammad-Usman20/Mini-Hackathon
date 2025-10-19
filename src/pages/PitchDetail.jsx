import { useParams } from 'react-router-dom'
import styles from './PitchDetail.module.css'

export default function PitchDetail() {
  const { id } = useParams()

  // For demo: mock data
  const pitch = {
    id,
    name: 'MentorMate',
    tagline: 'Guidance Meets Growth',
    pitch: 'A platform connecting learners with mentors to boost career development.',
    problem: 'Lack of accessible mentorship for students and professionals.',
    solution: 'Connects people with verified mentors in their industry.',
  }

  return (
    <div className={styles.card}>
      <h2>{pitch.name}</h2>
      <p className={styles.tagline}>{pitch.tagline}</p>
      <p>{pitch.pitch}</p>
      <h4>Problem</h4>
      <p>{pitch.problem}</p>
      <h4>Solution</h4>
      <p>{pitch.solution}</p>
    </div>
  )
}
