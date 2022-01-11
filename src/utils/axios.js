import axios from 'axios';

const url =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:5000/'
		: 'https://yourappname.herokuapp.com/';

const instance = axios.create({ baseURL: url });

instance.interceptors.request.use(
	(config) => {
		if (!config.headers.Authorization) {
			const user = JSON.parse(localStorage.getItem('user')) || {};
			if (user.token)
				config.headers.Authorization = `Bearer ${user.token}`;
		}
		return config;
	},
	(err) => {
		console.error(err);
		return Promise.reject(err);
	}
);

export default instance;