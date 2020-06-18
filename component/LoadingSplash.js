import { useContext } from 'react';
import AuthContext from 'context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingSplash = () => {
	const { isLogging } = useContext(AuthContext);

	return (
		<React.Fragment>
            {isLogging && (
                <div className="loading-container">
                    <img className="splash-logo" src="/sitelogo.svg" alt="logo" />
                    <FontAwesomeIcon icon={faSpinner} className="splash-spinner" />
                </div>
            )}
		</React.Fragment>
	);
};

export default LoadingSplash;
