import Solicitud from '../models/Solicitudes.js';

export default class SolicitudController {

    // Obtiene todas las solicitudes
	async getAll(req, res) {
		const solicitudes = await Solicitud.findAll();
		res.send(solicitudes);
	}

    // Obtiene solicitudes del id del usuario
    async getByUserId(req, res) {
		const solicitudes = await Solicitud.findAll({
			where: {
				id_usuario: req.params.id_usuario
			}
		});
		res.send(solicitudes);
	}
    
	// Guardar solicitud en BD
	async create(req, res) {
		const { id_usuario, monto_solicitado, plazo, cuota_uf, total } = req.body;
		const nuevaSolicitud = await Solicitud.create({
			id_usuario: id_usuario,
			monto_solicitado: monto_solicitado,
			plazo: plazo,
			cuota_uf: cuota_uf,
			total: total,
			estado_solicitud: 'Pendiente',
		});
		res.send(nuevaSolicitud);
    }



};


