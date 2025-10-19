import { useState } from 'react'
import PitchEditor from '../components/PitchEditor'
import styles from './CreatePitch.module.css'

export default function CreatePitch() {
  const [result, setResult] = useState(null)

  return (
    <div className={styles.wrapper}>
      <PitchEditor onResult={setResult} />
      {result && (
        <div className={styles.output}>
          <h3>Generated Pitch</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
