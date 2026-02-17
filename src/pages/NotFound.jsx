import { Link } from 'react-router-dom';
import './NotFound.css';
import { AppContext } from '../AppContext'
import { useContext} from 'react';


const NotFound = () => {
  const { theme } = useContext(AppContext);

  return (
    <div className={`notfound-page ${theme}`}>
      <div className="notfound-container">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-text">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link to="/" className="notfound-link">
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
