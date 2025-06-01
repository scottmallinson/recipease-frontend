import React, { createContext, useState, useEffect } from "react";
import auth from "./auth-service";
import { User, AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType | null>(null);
const { Consumer, Provider } = AuthContext;

export { Consumer };

export interface WithAuthProps {
	isLoggedin: boolean;
	user: User | null;
	signup: (user: { username: string; password: string }) => void;
	login: (user: { username: string; password: string }) => void;
	logout: () => void;
}

export const withAuth = <P extends object>(Comp: React.ComponentType<P & WithAuthProps>) => {
	return function WithAuth(props: P): React.ReactElement {
		return (
			<Consumer>
				{(authStore) => {
					if (!authStore) return null;
					return (
						<Comp
							login={authStore.login}
							signup={authStore.signup}
							user={authStore.user}
							logout={authStore.logout}
							isLoggedin={authStore.isLoggedin}
							{...props}
						/>
					);
				}}
			</Consumer>
		);
	};
};

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isLoggedin, setIsLoggedin] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		auth
			.me()
			.then((user: User) => {
				setIsLoggedin(true);
				setUser(user);
				setIsLoading(false);
			})
			.catch(() => {
				setIsLoggedin(false);
				setUser(null);
				setIsLoading(false);
			});
	}, []);

	const signup = (user: { username: string; password: string }): void => {
		const { username, password } = user;
		auth
			.signup({ username, password })
			.then((user: User) => {
				setIsLoggedin(true);
				setUser(user);
			})
			.catch(() => {});
	};

	const login = (user: { username: string; password: string }): void => {
		const { username, password } = user;
		auth
			.login({ username, password })
			.then((user: User) => {
				setIsLoggedin(true);
				setUser(user);
			})
			.catch(() => {});
	};

	const logout = (): void => {
		auth
			.logout()
			.then(() => {
				setIsLoggedin(false);
				setUser(null);
			})
			.catch(() => {});
	};

	return isLoading ? (
		<div>Loading</div>
	) : (
		<Provider
			value={{
				isLoggedin,
				user,
				login,
				logout,
				signup,
				isLoading
			}}
		>
			{children}
		</Provider>
	);
};

export default AuthProvider;
