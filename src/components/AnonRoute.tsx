import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import { WithAuthProps, RouteProps } from '../types';

function AnonRoute({ children, isLoggedin }: WithAuthProps & RouteProps): ReactElement {
	return !isLoggedin ? <>{children}</> : <Navigate to='/profile' replace />;
}

export default withAuth(AnonRoute);
