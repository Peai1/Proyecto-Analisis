import axios from "axios";

const updateUser = async (id, data) =>
	axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, data);

const createUser = async (data) =>
	axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, data);

const deleteUser = async (id) =>
	axios
		.delete(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`)
		.then((res) => res.data);

const getAllUsers = () =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/users`)
		.then((res) => res.data);

const getByTipo = (tipo) =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/tipoUser/${tipo}`, {
			params: { tipo: tipo }, 
		})
		.then((res) => res.data);

const getUser = (id) =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`)
		.then((res) => res.data);

const login = (email, password) =>
	axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
		email,
		password,
	});

// eslint-disable-nextline
export {
	deleteUser,
	updateUser,
	createUser,
	getAllUsers,
	getUser,
	login,
	getByTipo,
};
