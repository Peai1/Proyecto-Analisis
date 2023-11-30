import React from "react";
import useSWR from "swr";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Link, useHistory } from "react-router-dom";
import DeleteForm from "../../components/DeleteForm";
import { deleteUser, getAllUsers } from "../../repositories/user";

export default function index() {
	const history = useHistory();

	const { data, error } = useSWR("/users/all", {
		fetcher: getAllUsers,
		initialData: [],
		revalidateOnMount: true,
	});

	// Funcion para ver el tipo de usuario
	const getUserType = () => {
		return localStorage.getItem("userType");
	};

	// Funcion para ver si existe el token de inicio de sesion
	const isUserLoggedIn = () => {
		return localStorage.getItem("token") !== null;
		// Verifica si el token existe en localStorage
	};

	// Funcion para cerrar sesion
	const handleLogout = () => {
		localStorage.removeItem("token"); // Borra el token
		history.push("/");
	};

	const tbody = [];

	data.forEach(({ nombre, email, id, tipo }) => {
		tbody.push(
			<tr>
				<td>{nombre}</td>
				<td>{email}</td>
				<td>{tipo}</td>
				<td>
					<Link to={`users/${id}`}>
						<a href={`users/${id}`} className="btn btn-success">
							Ver
						</a>
					</Link>
					<Link to={`users/${id}/edit`}>
						<a
							href={`users/${id}/edit`}
							className="ml-2 btn btn-primary"
						>
							Editar
						</a>
					</Link>
					<DeleteForm id={id} callback={deleteUser} />
				</td>
			</tr>
		);
	});

	const userType = getUserType();

	return (
		<Container className="pt-4">
			<div className="d-flex align-items-center">
				<h1>Listado de Usuarios</h1>
				<Link to="/users/create" className="ml-4 btn btn-primary">
					Crear Usuario
				</Link>
				{!isUserLoggedIn() && (
					<Link to="/users/login" className="ml-4 btn btn-primary">
						Iniciar Sesión
					</Link>
				)}
				{isUserLoggedIn() && (
					<button
						onClick={handleLogout}
						className="ml-4 btn btn-danger"
					>
						Cerrar Sesión
					</button>
				)}
			</div>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Email</th>
						<th>Tipo de Usuario</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>{tbody}</tbody>
			</Table>

			<div style={{ textAlign: "center", marginRight: "350px", marginTop: "25px" }}>
				{isUserLoggedIn() && userType === "Cliente" && (
					<div>
						<h3>Clientes</h3>
						<p>
							Realiza una simulación de tu crédito de manera
							rápida y fácil.
						</p>
						<Link to="/cliente/creditSimulation">
							<button className="btn btn-primary btn-lg">
								Simulación de Crédito
							</button>
						</Link>
					</div>
				)}
				{isUserLoggedIn() && userType === "Analista Ventas" && (
					<div>
						<h3>Analista de Ventas</h3>
						<p>
							Revisa y gestiona las solicitudes de crédito
							pendientes.
						</p>
						<Link to="/ventas/mostrarSolicitudes">
							<button className="btn btn-success btn-lg">
								Visualizar Solicitudes
							</button>
						</Link>
					</div>
				)}
				{isUserLoggedIn() && userType === "Analista Comercial" && (
					<div>
						<h3>Analista Comercial</h3>
						<p>
							Consulta las solicitudes ingresadas en el área
							comercial.
						</p>
						<Link to="/comercial/solicitudesAreaComercial">
							<button className="btn btn-warning btn-lg">
								Ver Solicitudes Ingresadas
							</button>
						</Link>
					</div>
				)}
				{isUserLoggedIn() && userType === "Supervisor" && (
					<div>
						<h3>Supervisor</h3>
						<p>
							Supervisa todas las solicitudes de créditos
							presentadas.
						</p>
						<Link to="/supervisor/solicitudes">
							<button className="btn btn-danger btn-lg">
								Supervisar Solicitudes
							</button>
						</Link>
					</div>
				)}
			</div>
		</Container>
	);
}
