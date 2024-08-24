import { createContext, useState } from 'react';

export let CounterContext = createContext();
export default function CounterContextProvider(props) {
	const [userToken, setUserToken] = useState(() => {
		try {
			const token = window.localStorage.getItem('token');
			return token;
		} catch (error) {
			console.error('Error getting user token', error);
			return null;
		}
	});

	return <CounterContext.Provider value={{ userToken, setUserToken }}>{props.children}</CounterContext.Provider>;
}
