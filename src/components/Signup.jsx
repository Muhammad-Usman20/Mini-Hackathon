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



// import React, { useState } from "react";
// import { auth, db } from "../firebase/config";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import styles from "./Signup.module.css";

// export default function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [error, setError] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const userCred = await createUserWithEmailAndPassword(auth, email, password);
//       await setDoc(doc(db, "users", userCred.user.uid), {
//         name,
//         email,
//         createdAt: new Date().toISOString(),
//       });
//       alert("Signup successful!");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <form className={styles.form} onSubmit={handleSignup}>
//         <h2>Create Account</h2>
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         {error && <p className={styles.error}>{error}</p>}
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
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
