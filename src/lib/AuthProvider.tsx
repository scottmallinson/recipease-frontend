import React, { Component, createContext } from "react";
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
	return class WithAuth extends Component<P> {
		render() {
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
								{...this.props}
							/>
						);
					}}
				</Consumer>
			);
		}
	};
};

interface AuthProviderState {
	isLoggedin: boolean;
	user: User | null;
	isLoading: boolean;
	message?: string;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

class AuthProvider extends Component<AuthProviderProps, AuthProviderState> {
	state: AuthProviderState = {
		isLoggedin: false,
		user: null,
		isLoading: true
	};

	componentDidMount() {
		auth
			.me()
			.then((user: User) => {
				this.setState({
					isLoggedin: true,
					user,
					isLoading: false
				});
			})
			.catch(() => {
				this.setState({
					isLoggedin: false,
					user: null,
					isLoading: false
				});
			});
	}

	signup = (user: { username: string; password: string }): void => {
		const { username, password } = user;
		auth
			.signup({ username, password })
			.then((user: User) => {
				this.setState({
					isLoggedin: true,
					user
				});
			})
			.catch(({ response: { data: error } }: any) => {
				this.setState({
					message: error.statusMessage
				});
			});
	};

	login = (user: { username: string; password: string }): void => {
		const { username, password } = user;
		auth
			.login({ username, password })
			.then((user: User) => {
				this.setState({
					isLoggedin: true,
					user
				});
			})
			.catch(() => {});
	};

	logout = (): void => {
		auth
			.logout()
			.then(() => {
				this.setState({
					isLoggedin: false,
					user: null
				});
			})
			.catch(() => {});
	};

	render(): React.ReactElement {
		const { isLoading, isLoggedin, user } = this.state;
		return isLoading ? (
			<div>Loading</div>
		) : (
			<Provider
				value={{
					isLoggedin,
					user,
					login: this.login,
					logout: this.logout,
					signup: this.signup,
					isLoading
				}}
			>
				{this.props.children}
			</Provider>
		);
	}
}

export default AuthProvider;
