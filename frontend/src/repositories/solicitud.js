import axios from "axios";

const createSolicitud = async (data) =>
	axios.post(`${process.env.REACT_APP_BACKEND_URL}/solicitud`, data);

const getAll = () =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/solicitudes`)
		.then((res) => res.data);

const getSolicitudById = (id) =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/solicitudes/${id}`)
		.then((res) => res.data);

const updateSolicitud = async (id) =>
	axios.put(`${process.env.REACT_APP_BACKEND_URL}/solicitudes/${id}`);

const updateDerivada = async (id , data) =>
	axios.put(`${process.env.REACT_APP_BACKEND_URL}/derivacion/${id}`, data);

const deleteSolicitud = async (id) =>
	axios
		.delete(`${process.env.REACT_APP_BACKEND_URL}/solicitud/${id}`)
		.then((res) => res.data);

// eslint-disable-nextline
export { createSolicitud, getAll, getSolicitudById, updateSolicitud, updateDerivada , deleteSolicitud };
