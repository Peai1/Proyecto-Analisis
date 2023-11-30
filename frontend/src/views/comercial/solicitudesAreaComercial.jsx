import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { getAll } from "../../repositories/solicitud";
import { getUser } from "../../repositories/user";

export default function MostrarSolicitudes() {
	const { data: solicitudes } = useSWR("/solicitudes/all", {
		fetcher: getAll,
		initialData: [],
		revalidateOnMount: true,
	});

	const [solicitudesIngresadasData, setSolicitudesIngresadasData] = useState(
		[]
	);

	const [solicitudesDerivadasData, setSolicitudesDerivadasData] = useState(
		[]
	);

	useEffect(() => {
		// Filtrar solicitudes ingresadas y obtener datos del usuario
		Promise.all(
			solicitudes
				.filter(
					(solicitud) => solicitud.estadoSolicitud === "Ingresado"
				)
				.map(({ idUsuario }) => getUser(idUsuario))
		).then((userData) => {
			setSolicitudesIngresadasData(userData.filter(Boolean));
		});

		// Filtrar solicitudes derivadas y obtener datos del usuario
		Promise.all(
			solicitudes
				.filter((solicitud) => solicitud.estadoSolicitud === "Derivada")
				.map(({ idUsuario }) => getUser(idUsuario))
		).then((userData) => {
			setSolicitudesDerivadasData(userData.filter(Boolean));
		});
	}, [solicitudes]);

	const solicitudesIngresadas = solicitudes.filter(
		(solicitud) => solicitud.estadoSolicitud === "Ingresado"
	);

	const solicitudesDerivadas = solicitudes.filter(
		(solicitud) => solicitud.estadoSolicitud === "Derivada"
	);

	return (
		<Container className="pt-4">
			<h2>
				Listado de Solicitudes de Crédito Pendientes por Derivar/Revisar
			</h2>

			<div>
				<br></br>
				<h3>Solicitudes Ingresadas</h3>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Nombre Cliente</th>
							<th>Monto Solicitado</th>
							<th>Plazo</th>
							<th>Estado</th>
						</tr>
					</thead>
					<tbody>
						{solicitudesIngresadas.map(
							(
								{ id, montoSolicitado, plazo, estadoSolicitud },
								index
							) => {
								const usuarioData =
									solicitudesIngresadasData[index];
								if (usuarioData) {
									return (
										<tr key={id}>
											<td>{id}</td>
											<td>{usuarioData.nombre}</td>
											<td>{montoSolicitado}</td>
											<td>{plazo}</td>
											<td>{estadoSolicitud}</td>
											<td>
												<Link
													to={`/comercial/solicitudesAreaComercial/${id}`}
												>
													<a
														href={`/comercial/solicitudesAreaComercial/${id}`}
														className="btn btn-success"
													>
														Ver
													</a>
												</Link>
											</td>
										</tr>
									);
								} else {
									return null;
								}
							}
						)}
					</tbody>
				</Table>
			</div>

			<div>
				<br></br>
				<h3>Solicitudes Derivadas</h3>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Nombre Cliente</th>
							<th>Monto Solicitado</th>
							<th>Plazo</th>
							<th>Estado</th>
							<th>Supervisor Asignado</th>
						</tr>
					</thead>
					<tbody>
						{solicitudesDerivadas.map(
							(
								{ id, montoSolicitado, plazo, estadoSolicitud, supervisorAsignado },
								index
							) => {
								const usuarioData =
									solicitudesDerivadasData[index];
								if (usuarioData) {
									return (
										<tr key={id}>
											<td>{id}</td>
											<td>{usuarioData.nombre}</td>
											<td>{montoSolicitado}</td>
											<td>{plazo}</td>
											<td>{estadoSolicitud}</td>
											<td>{supervisorAsignado}</td>
										</tr>
									);
								} else {
									return null;
								}
							}
						)}
					</tbody>
				</Table>
			</div>
		</Container>
	);
}
