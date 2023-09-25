import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/Auth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (user === undefined) {
    // user is not authenticated
    return <Navigate to="/authentication/sign-in" />;
  } else if (user === "non_valid_user") {
    return <Navigate to="/non-valid-user" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
