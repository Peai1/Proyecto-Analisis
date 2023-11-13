import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../repositories/user";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response  = await login(email, password);
			const { token, tipo } = response.data; // Desestructura token y tipo de la respuesta
        	localStorage.setItem("token", token);
        	localStorage.setItem("userType", tipo); // Guarda el tipo de usuario
			history.push("/users"); // Redirige a la página principal después del inicio de sesión
		} catch (error) {
			alert(
				"Error en el inicio de sesión. Por favor, revisa tus credenciales."
			);
		}
	};

	return (
		<div className="container mt-4">
			<h2>Iniciar Sesión</h2>
			<form onSubmit={handleLogin}>
				<div className="form-group">
					<label htmlFor="email">Correo Electrónico</label>
					<input
						type="email"
						className="form-control"
						id="email"
						value={email}	// el de useState
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Contraseña</label>
					<input
						type="password"
						className="form-control"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Iniciar Sesión
				</button>
			</form>
		</div>
	);
}
