import UserController from './UserController.js';
import SolicitudController from './SolicitudesController.js';

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

	// RUTAS SOLICITUD
	const solicitudController = new SolicitudController();
	app.post('/solicitud', solicitudController.create);
	app.get('/solicitudes', solicitudController.getAll);

};