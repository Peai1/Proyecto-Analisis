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

	const [solicitudesPendientesData, setSolicitudesPendientesData] = useState(
		[]
	);
	const [solicitudesIngresadasData, setSolicitudesIngresadasData] = useState(
		[]
	);

	useEffect(() => {
		Promise.all(
			solicitudes
				.filter(
					(solicitud) => solicitud.estadoSolicitud === "Pendiente"
				)
				.map(({ idUsuario }) => getUser(idUsuario))
		).then((userData) => {
			setSolicitudesPendientesData(userData.filter(Boolean));
		});

		Promise.all(
			solicitudes
				.filter(
					(solicitud) => solicitud.estadoSolicitud === "Ingresado" || solicitud.estadoSolicitud === "Derivada"
				)
				.map(({ idUsuario }) => getUser(idUsuario))
		).then((userData) => {
			setSolicitudesIngresadasData(userData.filter(Boolean));
		});
	}, [solicitudes]);

	const solicitudesPendientes = solicitudes.filter(
		(solicitud) => solicitud.estadoSolicitud === "Pendiente"
	);
	const solicitudesIngresadas = solicitudes.filter(
		(solicitud) => solicitud.estadoSolicitud === "Ingresado" || solicitud.estadoSolicitud === "Derivada"
	);

	return (
		<Container className="pt-4">
			<h1>Listado de Solicitudes de Crédito</h1>

			<div>
				<h2>Solicitudes Pendientes</h2>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Nombre Cliente</th>
							<th>Monto Solicitado CLP</th>
							<th>Plazo</th>
							<th>Estado</th>
						</tr>
					</thead>
					<tbody>
						{solicitudesPendientes.map(
							(
								{ id, montoSolicitado, plazo, estadoSolicitud },
								index
							) => {
								const usuarioData =
									solicitudesPendientesData[index];
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
													to={`/ventas/mostrarSolicitudes/${id}`}
												>
													<a
														href={`/ventas/mostrarSolicitudes/${id}`}
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
				<h2>Solicitudes Ingresadas/Derivadas</h2>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Nombre Cliente</th>
							<th>Monto Solicitado CLP</th>
							<th>Plazo</th>
							<th>Cuota CLP</th>
							<th>Cuota UF</th>
							<th>Total CLP</th>
							<th>Total UF</th>
							<th>Estado</th>
						</tr>
					</thead>
					<tbody>
						{solicitudesIngresadas.map(
							(
								{
									id,
									montoSolicitado,
									plazo,
									cuotaCLP,
									cuotaUF,
									totalCLP,
									totalUF,
									estadoSolicitud,
								},
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
											<td>{cuotaCLP}</td>
											<td>{cuotaUF}</td>
											<td>{totalCLP}</td>
											<td>{totalUF}</td>
											<td>{estadoSolicitud}</td>
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
