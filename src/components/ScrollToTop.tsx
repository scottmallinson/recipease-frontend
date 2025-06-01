// filepath: /Users/Scott/Projects/recipease-frontend/src/components/ScrollToTop.tsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteProps {
	children: React.ReactNode;
}

function ScrollToTop({ children }: RouteProps): React.ReactElement {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return <>{children}</>;
}

export default ScrollToTop;
