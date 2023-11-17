import axios from "axios";

const createSolicitud = async (data) =>
	axios
		.post(`${process.env.REACT_APP_BACKEND_URL}/solicitud`, data);

const getAll = () =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/solicitudes`)
		.then((res) => res.data);

// eslint-disable-nextline
export { createSolicitud, getAll };