import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const HideRoute = () => {
    const location = useLocation();

    useEffect(() => {
        // Replace the current route in the address bar but keep the route functional
        window.history.replaceState(null, '', '/'); // Update the browser's address bar
    }, [location]);

    return null;
};

export default HideRoute;
