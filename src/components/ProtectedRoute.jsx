import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, isLoggedIn, anonymous = false }) => {
  const location = useLocation();
  const from = location.state?.from || "/ducks";

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
