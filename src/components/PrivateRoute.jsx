import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export default function PrivateRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  if (user === undefined) {
    return <p style={{ textAlign: "center", marginTop: "30vh" }}>Loading...</p>;
  }

  if (!user) return <Navigate to="/login" replace />;
  return children;
}
