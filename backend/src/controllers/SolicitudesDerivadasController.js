import SolicitudesDerivadas from '../models/SolicitudesDerivadas.js';

export default class SolicitudesDerivadasController {

    // Obtiene todas las solicitudes
	async getAll(req, res) {
		const solicitudes = await SolicitudesDerivadas.findAll();
		res.send(solicitudes);
	}
    
	// Guardar solicitud en BD
	async create(req, res) {
		const { idSolicitud, idSupervisor } = req.body;
		const nuevaSolicitud = await SolicitudesDerivadas.create({
			idSolicitud: idSolicitud,
            idSupervisor: idSupervisor,
		});
		res.send(nuevaSolicitud);
    }

	async getByUserId(req, res) {
		const solicitud = await SolicitudesDerivadas.findByPk(req.params.solicitudId);
		res.send(solicitud);
	}

};


