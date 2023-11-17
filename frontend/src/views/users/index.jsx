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
						<a href={`users/${id}/edit`} className="ml-2 btn btn-primary">
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
                    <button onClick={handleLogout} className="ml-4 btn btn-danger">
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

			<div>
                {isUserLoggedIn() && userType === "Cliente" && (
                    <Link to="/users/creditSimulation">
                        <button className="btn btn-info">
                            Realizar simulación de crédito
                        </button>
                    </Link>
                )}
				{isUserLoggedIn() && userType === "Analista Ventas" && (
                    <Link to="/users/mostrarSolicitudes">
                        <button className="btn btn-info">
                            Visualizar Solicitudes de Crédito
                        </button>
                    </Link>
                )}
                {/* Aquí puedes agregar más condiciones para otros tipos de usuario */}
            </div>

		</Container>
	);
}
