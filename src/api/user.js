import axios from '../utils/axios';

export const login = (info) => {
	return axios.post('/users/login', info);
};

export const register = (info) => {
	return axios.post('/users/register', info);
};

export const userDetails = (id) => {
	return axios.get(`/users/${id}`);
};

export const updateUser = (id, info) => {
	return axios.post(`/users/${id}/update`, info);
};

export const checkLogin = (token) => {
	return axios.get(`/users/check/${token}`);
};