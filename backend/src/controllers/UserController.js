import User from '../models/User.js';
import jwt from 'jsonwebtoken';
// npm install jasonwebtoken

export default class UserController {
	async getAll(req, res) {
		const users = await User.findAll();
		res.send(users);
	}

	async getBynombre(req, res) {
		const users = await User.findAll({
			where: {
				nombre: req.params.nombre
			}
		});
		res.send(users);
	}

	async get(req, res) {
		const user = await User.findByPk(req.params.userId);
		res.send(user);
	}

	async create(req, res) {
		const user = await User.create({
			nombre: req.body.nombre,
			email: req.body.email,
			// Crear con tipo
			tipo: req.body.tipo,
			// Crear con contraseña
			password: req.body.password,
		});
		res.send(user);
	}

	async update(req, res) {
		const user = await User.findByPk(req.params.userId);
		user.update({nombre: req.body.nombre, email: req.body.email});
		res.send(user);
	}

	// LOGIN
	async login(req, res) {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.status(401).json({ message: 'Usuario no encontrado.' });
		}

		// Comprobando la contraseña (asumiendo que está en texto plano)
		if (password == user.password) {
			// Generar token con modulo jwt, se necesita hacer npm install jsonwebtoken
			const token = jwt.sign({ userId: user.id }, 'miClaveSecretaMuyCompleja123$#!', { expiresIn: '1h' });
			// Retorna tipo de usuario y token
			return res.json({ token, tipo: user.tipo });
		} else {
			return res.status(401).json({ message: 'Contraseña incorrecta.' });
		}	
	}

	async delete(req, res) {
		await User.destroy({where: {id: req.params.userId}});
		res.send({status: "ok"});
	}
};


