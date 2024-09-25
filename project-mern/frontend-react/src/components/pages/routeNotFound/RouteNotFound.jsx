import { useNavigate } from 'react-router-dom';
import './RouteNotFound.css'; 

const RouteNotFound = () => {
  const navigate = useNavigate();

  const handleReturnToHome = () => {
    navigate('/')
  };

  return (
    <div className="route-not-found">
      <div className="alert">
        <h2>ROUTE NOT FOUND</h2>
    
        <button onClick={handleReturnToHome}>BACK TO LOGIN</button>
      </div>
    </div>
  );
};

export default RouteNotFound;
