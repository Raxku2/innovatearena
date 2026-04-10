import { Navigate } from "react-router";


function ProtectedRoute({ isAllowed, children }) {
    if (!isAllowed) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default ProtectedRoute;