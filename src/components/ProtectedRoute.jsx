import { Navigate, useLocation } from "react-router-dom";
import { getAuthState } from "../utils/authStorage.js";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isLoggedIn } = getAuthState();

  if (!isLoggedIn) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    );
  }

  return children;
}
