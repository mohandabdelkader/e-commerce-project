import { createContext, useState } from 'react';

export let CounterContext = createContext();
export default function CounterContextProvider(props) {
	const [userToken, setUserToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : null);
	

	return <CounterContext.Provider value={{ userToken, setUserToken }}>{props.children}</CounterContext.Provider>;
}
