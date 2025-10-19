import styles from './ToneSelector.module.css'

export default function ToneSelector({ value, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className={styles.select}>
      <option value="friendly">Friendly</option>
      <option value="formal">Formal</option>
      <option value="playful">Playful</option>
      <option value="concise">Concise</option>
    </select>
  )
}
