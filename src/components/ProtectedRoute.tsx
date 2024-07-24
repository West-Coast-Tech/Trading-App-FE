import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../actions/types';

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state: AppState) => state.auth);
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
