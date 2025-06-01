import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withAuth, WithAuthProps } from '../lib/AuthProvider';
import { Helmet } from 'react-helmet';

interface SignupState {
	username: string;
	password: string;
}

function Signup(props: WithAuthProps): React.ReactElement {
	const [state, setState] = useState<SignupState>({ username: '', password: '' });

	function handleFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		const { username, password } = state;
		props.signup({ username, password });
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
		const { name, value } = e.target;
		setState((prevState) => ({ ...prevState, [name]: value }));
	}

	return (
		<>
			<Helmet>
				<title>Sign up &middot; Recipease</title>
				<meta name='description' content='Sign up for a free Recipease account' />
				<meta property='og:type' content='article' />
			</Helmet>
			<div className='container py-5'>
				<h1 className='display-4'>Sign up</h1>
				<form onSubmit={handleFormSubmit}>
					<div className='form-group'>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							className='form-control'
							id='username'
							placeholder='Enter username'
							name='username'
							value={state.username}
							onChange={handleChange}
							autoComplete='off'
							required
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							className='form-control'
							id='password'
							placeholder='Password'
							name='password'
							value={state.password}
							onChange={handleChange}
							autoComplete='off'
							required
						/>
					</div>
					<div className='form-group'>
						<button type='submit' className='btn btn-primary'>Sign up</button>
					</div>
					<div className='form-group'>
						<p>
							Already have an account?
							<Link to='/login'> Login</Link>
						</p>
					</div>
				</form>
			</div>
		</>
	);
}

export default withAuth(Signup);
