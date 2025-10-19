    import styles from './Register.module.css'

export default function Register() {
  return (
    <div className={styles.form}>
      <h2>Create Account</h2>
      <input placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Register</button>
    </div>
  )
}
