import { Navigate, useLocation } from "react-router-dom";
import { useLoggedIn } from "./LoggedInWrapper";

const ProtectedRoute = ({ children, anonymous = false }) => {
  const { isLoggedIn } = useLoggedIn();
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
