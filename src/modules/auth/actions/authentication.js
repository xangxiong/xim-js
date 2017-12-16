import { sessionService } from 'redux-react-session';

export const login = (user, history) => {
	return () => {
		// TODO: implement authentication login logic here
		let token = 'xxiong11223455';
		sessionService.saveSession({ token }).then(() => {
			sessionService.saveUser({
				id: 'xxiong111223554',
				username: user.username,
				first_name: 'Xang',
				last_name: 'Xiong'
			}).then(() => {
				history.push('/');
			}).catch(err => console.error(err));
		}).catch(err => console.error(err));
	};
};

export const logout = (history) => {
	return () => {
		// TODO: implement authentication logout logic here
		let def = new Promise(resolve => setTimeout(resolve, 500));
		
		return def.then(() => {
			sessionService.deleteSession();
			sessionService.deleteUser();
			history.push('/login');
		}).catch(err => console.error(err));
	};
};