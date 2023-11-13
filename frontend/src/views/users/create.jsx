import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createUser } from "../../repositories/user";

export default function create() {
	const history = useHistory();

	const [state, setstate] = useState({});

	const submitForm = async (e) => {
		e.preventDefault();
		try {
			const response = await createUser(state);
			history.push(`/users/${response.data.id}`);
		} catch (error) {
			console.log(error);
			alert("A ocurrido un error al actualizar");
		}
	};

	return (
		<div className="container mt-4">
			<form onSubmit={submitForm}>
				<div className="form-group">
					<label htmlFor="nombre">Nombre</label>
					<input
						className="form-control"
						id="nombre"
						type="text"
						value={state.nombre}
						onChange={(e) => {
							setstate({ ...state, nombre: e.target.value });
						}}
						placeholder="Ingrese Nombre"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						className="form-control"
						id="email"
						type="email"
						value={state.email}
						onChange={(e) => {
							setstate({ ...state, email: e.target.value });
						}}
						placeholder="Ingrese Email"
						required
					/>
				</div>
				{/* Agregar password */}
				<div className="form-group">
					<label htmlFor="password">Contraseña</label>
					<input
						className="form-control"
						id="password"
						type="password"
						value={state.password}
						onChange={(e) => {
							setstate({ ...state, password: e.target.value });
						}}
						placeholder="Ingrese Contraseña"
						required
					/>
				</div>
				{/* Agregar tipo de usuario */}
				<div className="form-group">
					<label htmlFor="tipo">Tipo de Usuario</label>
					<select
						className="form-control"
						id="tipo"
						type="tipo"
						value={state.tipo}
						onChange={(e) => {
							setstate({ ...state, tipo: e.target.value });
						}}
						placeholder="Seleccione tipo de cuenta"
						required
					>
						<option value="">Seleccionar...</option>
						<option value="Cliente">Cliente</option>
						<option value="Analista Comercial">Analista Comercial</option>
						<option value="Analista Ventas">Analista Ventas</option>
						<option value="Supervisor">Supervisor</option>
					</select>
				</div>
				<div className="float-right">
					<button type="submit" className="btn btn-primary">
						Guardar
					</button>
				</div>
			</form>
		</div>
	);
}
