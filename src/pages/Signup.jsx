// import React, { useState } from 'react'
// import styles from './Signup.module.css'
// import { useNavigate } from 'react-router-dom'

// export default function Signup() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const navigate = useNavigate()

//   const handleSignup = e => {
//     e.preventDefault()
//     if (!email || !password) {
//       setError('Email and password are required')
//       return
//     }
//     // Simple check if user exists
//     const users = JSON.parse(localStorage.getItem('users') || '{}')
//     if (users[email]) {
//       setError('User already exists, please login')
//       return
//     }
//     // Save user to localStorage
//     users[email] = { password }
//     localStorage.setItem('users', JSON.stringify(users))

//     // Save logged in user session
//     localStorage.setItem('loggedInUser', email)

//     // Redirect to dashboard
//     navigate('/dashboard')
//   }

//   return (
//     <div className={styles.signupContainer}>
//       <h2>Signup</h2>
//       <form onSubmit={handleSignup} className={styles.form}>
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
//             autoComplete="new-password"
//           />
//         </label>
//         <button type="submit">Sign Up</button>
//         <p>
//           Already have an account?{' '}
//           <a href="/login" className={styles.link}>
//             Login here
//           </a>
//         </p>
//       </form>
//     </div>
//   )
// }








import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("Creating your account...");

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCred.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: form.name,
        email: form.email,
        createdAt: new Date().toISOString(),
      });

      setMessage("✅ Signup successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      console.error(err);
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSignup}>
        <h2 style={{ textAlign: "center" }}>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Sign Up
        </button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>{message}</p>

        {/* 👇 This link navigates to Login page */}
        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#3b2cf0", textDecoration: "none", fontWeight: 600 }}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//     padding: "1rem",
//     background: "linear-gradient(135deg, #0b0c10, #161a1d, #1f1f24)",
//     backgroundSize: "300% 300%",
//     animation: "bgShift 10s ease infinite",
//   },

//   form: {
//     background: "rgba(24, 26, 31, 0.95)",
//     border: "1px solid rgba(255, 255, 255, 0.05)",
//     borderRadius: "16px",
//     padding: "2rem",
//     width: "100%",
//     maxWidth: "360px",
//     boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
//     display: "flex",
//     flexDirection: "column",
//     color: "#f5f5f5",
//     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   },

//   heading: {
//     fontSize: "1.8rem",
//     fontWeight: "700",
//     textAlign: "center",
//     marginBottom: "1.5rem",
//     background: "linear-gradient(90deg, #d4af37, #ffce47)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//   },

//   input: {
//     marginBottom: "14px",
//     padding: "12px 14px",
//     borderRadius: "8px",
//     border: "1px solid rgba(255,255,255,0.1)",
//     background: "rgba(255,255,255,0.05)",
//     color: "#e4e4e4",
//     fontSize: "15px",
//     transition: "border 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
//   },

//   inputFocus: {
//     border: "1px solid #d4af37",
//     background: "rgba(255,255,255,0.08)",
//     boxShadow: "0 0 10px rgba(212,175,55,0.25)",
//     outline: "none",
//   },

//   button: {
//     marginTop: "10px",
//     background: "linear-gradient(90deg, #d4af37, #ffce47)",
//     border: "none",
//     borderRadius: "10px",
//     padding: "12px",
//     color: "#1b1b1f",
//     fontWeight: "700",
//     fontSize: "15px",
//     letterSpacing: "0.5px",
//     cursor: "pointer",
//     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   },

//   buttonHover: {
//     transform: "translateY(-2px) scale(1.03)",
//     boxShadow: "0 0 15px rgba(255, 206, 71, 0.4)",
//   },

//   footer: {
//     textAlign: "center",
//     marginTop: "1rem",
//     fontSize: "13px",
//     color: "rgba(255,255,255,0.6)",
//   },

//   link: {
//     color: "#ffce47",
//     textDecoration: "none",
//   },

//   "@media (max-width: 480px)": {
//     form: {
//       padding: "1.5rem",
//       maxWidth: "95%",
//     },
//     heading: {
//       fontSize: "1.6rem",
//     },
//   },

//   "@keyframes bgShift": {
//     "0%": { backgroundPosition: "0% 50%" },
//     "50%": { backgroundPosition: "100% 50%" },
//     "100%": { backgroundPosition: "0% 50%" },
//   },
// };
  


const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f6fc",
  },
  form: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "320px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  button: {
    background: "#3b2cf0",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },
};
