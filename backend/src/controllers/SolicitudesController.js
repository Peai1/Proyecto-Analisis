import Solicitud from '../models/Solicitudes.js';

export default class SolicitudController {

    // Obtiene todas las solicitudes
	async getAll(req, res) {
		const solicitudes = await Solicitud.findAll();
		res.send(solicitudes);
	}
    
	// Guardar solicitud en BD
	async create(req, res) {
		const { idUsuario, montoSolicitado, plazo, cuotaUF, totalUF, cuotaCLP, totalCLP } = req.body;
		const nuevaSolicitud = await Solicitud.create({
			idUsuario: idUsuario,
			montoSolicitado: montoSolicitado,
			plazo: plazo,
			cuotaUF: cuotaUF,
			totalUF: totalUF,
			cuotaCLP: cuotaCLP,
			totalCLP: totalCLP,
			estadoSolicitud: 'Pendiente',
		});
		res.send(nuevaSolicitud);
    }

	async getByUserId(req, res) {
		const solicitud = await Solicitud.findByPk(req.params.solicitudId);
		res.send(solicitud);
	}

	async updateIngresado(req, res) {
		const solicitud = await Solicitud.findByPk(req.params.solicitudId);	  
		const estadoSolicitud = 'Ingresado';	  
		solicitud.update({ estadoSolicitud: estadoSolicitud });
		res.send(solicitud);
	}

	async updateDerivado(req, res) {
		const idSolicitud  = req.params.solicitudId;
		const { nombreSupervisor } = req.body;
		console.log("ID: " + idSolicitud + " Supervisor: " + nombreSupervisor);
		const solicitud = await Solicitud.findByPk(idSolicitud);	  
		const estadoSolicitud = 'Derivada';	  
		solicitud.update({ estadoSolicitud: estadoSolicitud, supervisorAsignado: nombreSupervisor});
		res.send(solicitud);
	}

	async delete(req, res) {
		await Solicitud.destroy({where: {id: req.params.solicitudId}});
		res.send({status: "ok"});
	}

};


