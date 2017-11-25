import { sessionService } from 'redux-react-session';

export const login = (user, history) => {
	return () => {
		// IMPLEMENT authentication here
		sessionService.saveSession('xxiong11223455');
		sessionService.saveUser({
			id: 'xxiong111223554',
			username: 'xxiong',
			first_name: 'Xang',
			last_name: 'Xiong'
		});
		history.push('/');
	};
};

export const logout = (history) => {
	return () => {
		sessionService.deleteSession();
		sessionService.deleteUser();
		history.push('/login');
	};
};