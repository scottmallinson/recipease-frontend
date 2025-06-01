import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import { WithAuthProps, RouteProps } from '../types';

function PrivateRoute({ children, isLoggedin }: WithAuthProps & RouteProps): ReactElement {
	return isLoggedin ? <>{children}</> : <Navigate to='/login' replace />;
}

export default withAuth(PrivateRoute);
