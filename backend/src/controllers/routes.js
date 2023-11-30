import UserController from './UserController.js';
import SolicitudController from './SolicitudesController.js';
import SolicitudesDerivadasController from './SolicitudesDerivadasController.js';

export default (app) => {
	// RUTAS USER
	const userController = new UserController();
	app.get('/users', userController.getAll);
	app.post('/users', userController.create);
	app.get('/users/:userId', userController.get);
	app.put('/users/:userId', userController.update);
	app.delete('/users/:userId', userController.delete);
	// LOGIN
	app.post('/login',userController.login);
	// Obtener todos los supervisores
	app.get('/tipoUser/:tipo', userController.getByTipo);

	// RUTAS SOLICITUD
	const solicitudController = new SolicitudController();
	app.post('/solicitud', solicitudController.create);
	app.get('/solicitudes', solicitudController.getAll);
	app.get('/solicitudes/:solicitudId', solicitudController.getByUserId);
	app.put('/solicitudes/:solicitudId', solicitudController.updateIngresado);
	app.put('/derivacion/:solicitudId',solicitudController.updateDerivado);
	app.delete('/solicitud/:solicitudId', solicitudController.delete);

	const solicitudesDerivadasController = new SolicitudesDerivadasController();
	app.post('/solicitudesDerivadas', solicitudesDerivadasController.create);

};