

// import React, { useState } from 'react'
// import styles from './Login.module.css'
// import { useNavigate } from 'react-router-dom'

// export default function Login() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const navigate = useNavigate()

//   const handleLogin = e => {
//     e.preventDefault()
//     if (!email || !password) {
//       setError('Email and password are required')
//       return
//     }
//     const users = JSON.parse(localStorage.getItem('users') || '{}')
//     if (!users[email]) {
//       setError('User does not exist. Please signup first.')
//       return
//     }
//     if (users[email].password !== password) {
//       setError('Incorrect password')
//       return
//     }

//     localStorage.setItem('loggedInUser', email)
//     navigate('/dashboard')
//   }

//   return (
//     <div className={styles.loginContainer}>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin} className={styles.form}>
//         {error && <div className={styles.error}>{error}</div>}
//         <label>
//           Email
//           <input
//             type="email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             required
//             autoComplete="email"
//           />
//         </label>
//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//             autoComplete="current-password"
//           />
//         </label>
//         <button type="submit">Login</button>
//         <p>
//           Don't have an account?{' '}
//           <a href="/signup" className={styles.link}>
//             Sign up here
//           </a>
//         </p>
//       </form>
//     </div>
//   )
// }












// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase/config";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setMessage("Logging in...");
//     try {
//       await signInWithEmailAndPassword(auth, form.email, form.password);
//       setMessage("✅ Login successful! Redirecting...");
//       setTimeout(() => navigate("/dashboard"), 1000);
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ " + err.message);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <form style={styles.form} onSubmit={handleLogin}>
//         <h2 style={{ textAlign: "center" }}>Login</h2>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />
//         <button type="submit" style={styles.button}>
//           Login
//         </button>
//         <p style={{ textAlign: "center", marginTop: "10px" }}>{message}</p>

//         {/* 👇 Link to go to Signup */}
//         <p style={{ textAlign: "center", marginTop: "15px" }}>
//           Don’t have an account?{" "}
//           <Link
//             to="/"
//             style={{ color: "#3b2cf0", textDecoration: "none", fontWeight: 600 }}
//           >
//             Sign Up
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//     background: "#f4f6fc",
//   },
//   form: {
//     background: "#fff",
//     padding: "2rem",
//     borderRadius: "10px",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//     width: "320px",
//     display: "flex",
//     flexDirection: "column",
//   },
//   input: {
//     marginBottom: "10px",
//     padding: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "6px",
//     fontSize: "14px",
//   },
//   button: {
//     background: "#3b2cf0",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     padding: "10px",
//     cursor: "pointer",
//     fontWeight: "600",
//   },
// };




import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      setMessage("✅ Login successful! Redirecting...");
      // small delay gives PrivateRoute time to update
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err) {
      console.error(err);
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
        <p style={{ textAlign: "center", marginTop: "10px" }}>{message}</p>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Don’t have an account?{" "}
          <Link
            to="/"
            style={{ color: "#3b2cf0", textDecoration: "none", fontWeight: 600 }}
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f4f6fc" },
  form: { background: "#fff", padding: "2rem", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", width: "320px", display: "flex", flexDirection: "column" },
  input: { marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "14px" },
  button: { background: "#3b2cf0", color: "#fff", border: "none", borderRadius: "6px", padding: "10px", cursor: "pointer", fontWeight: "600" },
};
