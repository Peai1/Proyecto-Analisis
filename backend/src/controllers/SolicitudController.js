import Solicitud from '../models/Solicitud.js';
import jwt from 'jsonwebtoken';
// npm install jasonwebtoken

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
    




};


