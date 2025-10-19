import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>PitchCraft</div>
      <div className={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  )
}

