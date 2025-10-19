// import PitchCard from '../components/PitchCard'
// import styles from './Dashboard.module.css'

// const demo = [
//   { id: 1, name: 'MentorMate', tagline: 'Guidance Meets Growth', pitch: 'Connecting learners with mentors.' },
//   { id: 2, name: 'StudyLink', tagline: 'Study smarter', pitch: 'Connecting students to resources.' }
// ]

// export default function Dashboard() {
//   return (
//     <div className={styles.grid}>
//       {demo.map(p => <PitchCard key={p.id} pitch={p} />)}
//     </div>
//   )
// }











// import React, { useState, useEffect } from 'react'
// import styles from './Dashboard.module.css'
// import { useNavigate } from 'react-router-dom'
// import { generatePitch } from '../api/generate'

// export default function Dashboard() {
//     const navigate = useNavigate()
//     const [idea, setIdea] = useState('')
//     const [tone, setTone] = useState('Friendly, concise')
//     const [loading, setLoading] = useState(false)
//     const [result, setResult] = useState(null)
//     const [error, setError] = useState('')

//     // If no logged in user, redirect to login
//     useEffect(() => {
//         const user = localStorage.getItem('loggedInUser')
//         if (!user) {
//             navigate('/login')
//         }
//     }, [navigate])

//     const handleLogout = () => {
//         localStorage.removeItem('loggedInUser')
//         navigate('/login')
//     }

//     const handleSubmit = async e => {
//         e.preventDefault()
//         if (!idea) {
//             setError('Please enter an idea')
//             return
//         }
//         setError('')
//         setLoading(true)
//         try {
//             const pitch = await generatePitch({ idea, tone })
//             setResult(pitch)
//         } catch (err) {
//             setError('Failed to generate pitch. Try again.')
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <div className={styles.dashboardContainer}>
//             <header className={styles.header}>
//                 <h1>PitchCraft</h1>
//                 <button onClick={handleLogout} className={styles.logoutButton}>
//                     Logout
//                 </button>
//             </header>
//             <main>
//                 <form onSubmit={handleSubmit} className={styles.form}>
//                     <label>
//                         Enter your product/startup idea:
//                         <textarea
//                             rows={4}
//                             value={idea}
//                             onChange={e => setIdea(e.target.value)}
//                             placeholder="E.g. A marketplace to buy/sell local art"
//                             required
//                         />
//                     </label>
//                     <label>
//                         Tone (optional):
//                         <input
//                             type="text"
//                             value={tone}
//                             onChange={e => setTone(e.target.value)}
//                             placeholder="Friendly, concise"
//                         />
//                     </label>
//                     <button type="submit" disabled={loading}>
//                         {loading ? 'Generating...' : 'Generate Pitch'}
//                     </button>
//                     {error && <div className={styles.error}>{error}</div>}
//                 </form>

//                 {result && (
//                     <section className={styles.result}>
//                         <h2>Generated Pitch</h2>
//                         {result.raw ? (
//                             <pre className={styles.rawOutput}>{result.raw}</pre>
//                         ) : (
//                             <>
//                                 <p>
//                                     <strong>Name:</strong> {result.name}
//                                 </p>
//                                 <p>
//                                     <strong>Tagline:</strong> {result.tagline}
//                                 </p>
//                                 <p>
//                                     <strong>Pitch:</strong> {result.pitch}
//                                 </p>
//                                 <p>
//                                     <strong>Problem:</strong> {result.problem}
//                                 </p>
//                                 <p>
//                                     <strong>Solution:</strong> {result.solution}
//                                 </p>
//                                 <p>
//                                     <strong>Audience:</strong> {result.audience}
//                                 </p>
//                                 <h3>{result.heroTitle}</h3>
//                                 <p>{result.heroSubtitle}</p>
//                             </>
//                         )}
//                     </section>
//                 )}
//             </main>
//         </div>
//     )
// }








// import React from "react";
// import { auth } from "../firebase/config";
// import { signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate("/login");
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "20vh" }}>
//       <h1>Welcome to PitchCraft 🎯</h1>
//       <p>You are successfully logged in.</p>
//       <button onClick={handleLogout} style={{ marginTop: "20px", padding: "10px 20px" }}>
//         Logout
//       </button>
//     </div>
//   );
// }





import React, { useState, useEffect } from "react";


import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { generatePitch } from "../api/generate"; // keep your existing API call

export default function Dashboard() {
    const navigate = useNavigate();
    const [idea, setIdea] = useState("");
    const [tone, setTone] = useState("Friendly, concise");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);

    // 🔐 check auth status (Firebase Auth instead of localStorage)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                navigate("/login");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    // 🔓 logout from Firebase
    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    // 🎯 handle idea submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");


        if (!idea) {
            setError("Please enter an idea");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const pitch = await generatePitch({ idea, tone });
            setResult(pitch);
        } catch (err) {
            console.error(err);
            setError("Failed to generate pitch. Try again.");
        } finally {
            setLoading(false);
        }
    };

    // ⏳ show loader while checking auth
    if (!user) {
        return (
            <div className={styles.loadingScreen}>
                <p>Loading your dashboard...</p>
            </div>
        );
    }

    return (
        <div className={styles.dashboardContainer}>
            <header className={styles.header}>
                <h1 >PitchCraft</h1>
                <button onClick={handleLogout} className={styles.logoutButton}>
                    Logout
                </button>
            </header>

            <main>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label>
                        Enter your product/startup idea:
                        <textarea
                            rows={4}
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                            placeholder="E.g. A marketplace to buy/sell local art"
                            required
                        />
                    </label>
                    <label>
                        Tone (optional):
                        <input
                            type="text"
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            placeholder="Friendly, concise"
                        />
                    </label>
                    <button type="submit" disabled={loading}>
                        {loading ? "Generating..." : "Generate Pitch"}
                    </button>
                    {error && <div className={styles.error}>{error}</div>}
                </form>






                {result && (





                    <section className={styles.result}>
                        <h2 className={styles.resultTitle}>✨ Your AI-Generated Pitch ✨</h2>

                        <div className={styles.pitchCard}>
                            <div className={styles.pitchItem}>
                                <strong>Name:</strong> {result.name}
                            </div>
                            <div className={styles.pitchItem}>
                                <strong>Tagline:</strong> {result.tagline}
                            </div>
                            <div className={styles.pitchItem}>
                                <strong>Pitch:</strong> {result.pitch || result.raw}
                            </div>
                            <div className={styles.pitchItem}>
                                <strong>Problem:</strong> {result.problem}
                            </div>
                            <div className={styles.pitchItem}>
                                <strong>Solution:</strong> {result.solution}
                            </div>
                            <div className={styles.pitchItem}>
                                <strong>Audience:</strong> {result.audience}
                            </div>

                            {/* 
                                <div className={styles.hero}>
                                    <h3>{result.heroTitle || "Your Startup Hero Title"}</h3>
                                    <p>{result.heroSubtitle || "Your inspiring subtitle goes here."}</p>
                                </div> */}

                            {/* <button>
                                className={styles.copyButton}
                                onClick={() => {
                                    navigator.clipboard.writeText(result.raw || "");
                                    alert("Pitch copied to clipboard!");
                                }}
                            </button> */}
                        </div>





                        {/* {result.raw ? (
                            <pre className={styles.rawOutput}>{result.raw}</pre>
                        ) : (
                            <>
                                <p>
                                    <strong>Name:</strong> {result.name}
                                </p>
                                <p>
                                    <strong>Tagline:</strong> {result.tagline}
                                </p>
                                <p>
                                    <strong>Pitch:</strong> {result.pitch}
                                </p>
                                <p>
                                    <strong>Problem:</strong> {result.problem}
                                </p>
                                <p>
                                    <strong>Solution:</strong> {result.solution}
                                </p>
                                <p>
                                    <strong>Audience:</strong> {result.audience}
                                </p>
                                <h3>{result.heroTitle}</h3>
                                <p>{result.heroSubtitle}</p>
                            </>
                        )} */}
                    </section>
                )}

            </main>
        </div>
    );
}







