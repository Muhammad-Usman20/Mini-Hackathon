// import { Routes, Route } from 'react-router-dom'
// import Navbar from './components/Navbar'
// import Home from './pages/Home'
// import CreatePitch from './pages/CreatePitch'
// import Dashboard from './pages/Dashboard'
// import Login from './components/Login'
// import Register from './pages/Register'
// import PitchDetail from './pages/PitchDetail'
// import styles from './App.module.css'

// export default function App() {
//   return (
//     <div className={styles.app}>
//       <Navbar />
//       <div className={styles.container}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/create" element={<CreatePitch />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/pitch/:id" element={<PitchDetail />} />
//         </Routes>
//       </div>
//     </div>
//   )
// }


// import React from 'react'
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import Signup from './components/Signup'
// import Login from './components/Login'
// import Dashboard from './pages/Dashboard'

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         {/* fallback redirect */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }




// import React from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import { auth } from "./firebase/config";
// import { onAuthStateChanged } from "firebase/auth";
// import { useEffect, useState } from "react";

// function PrivateRoute({ children }) {
//   const [user, setUser] = useState(undefined);
//   const location = useLocation();

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsub();
//   }, []);

//   if (user === undefined)
//     return <p style={{ textAlign: "center", marginTop: "30vh" }}>Loading...</p>;

//   if (!user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// }

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Signup />} />
//       <Route path="/login" element={<Login />} />
//       <Route
//         path="/dashboard"
//         element={
//           <PrivateRoute>
//             <Dashboard />
//           </PrivateRoute>
//         }
//       />
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }






import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
