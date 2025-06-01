import React from 'react';
import { useParams } from 'react-router-dom';
import { withAuth, WithAuthProps } from '../lib/AuthProvider';
import RecipeDetail from './RecipeDetail';

const RecipeDetailWrapper: React.FC<WithAuthProps> = (props) => {
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return <div>Recipe not found</div>;
	}

	return (
		<RecipeDetail
			id={id}
			isLoggedin={props.isLoggedin}
			user={props.user}
			signup={props.signup}
			login={props.login}
			logout={props.logout}
		/>
	);
};

export default withAuth(RecipeDetailWrapper);
