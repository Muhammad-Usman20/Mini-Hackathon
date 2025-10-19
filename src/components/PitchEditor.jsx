import { useState } from 'react'
import { generatePitch } from '../api/generate'
import ToneSelector from './ToneSelector'
import styles from './PitchEditor.module.css'

export default function PitchEditor({ onResult }) {
  const [idea, setIdea] = useState('')
  const [tone, setTone] = useState('friendly')
  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    if (!idea) return alert('Please enter an idea')
    setLoading(true)
    const data = await generatePitch({ idea, tone })
    onResult(data)
    setLoading(false)
  }

  return (
    <div className={styles.card}>
      <label>Describe your startup idea:</label>
      <textarea
        value={idea}
        onChange={e => setIdea(e.target.value)}
        rows={4}
        className={styles.textarea}
      />
      <div className={styles.controls}>
        <ToneSelector value={tone} onChange={setTone} />
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Pitch'}
        </button>
      </div>
    </div>
  )
}
