import axios from "axios";

const createDerivacion = async (data) =>
	axios.post(`${process.env.REACT_APP_BACKEND_URL}/solicitudesDerivadas`, data);

// eslint-disable-nextline
export { createDerivacion };
