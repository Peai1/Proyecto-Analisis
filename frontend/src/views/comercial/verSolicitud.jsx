import React, {useState} from "react";
import useSWR from "swr";

import { useParams, useHistory } from "react-router-dom";
import { getSolicitudById } from "../../repositories/solicitud";
import { getUser, getByTipo } from "../../repositories/user";
import { createDerivacion } from "../../repositories/solicitudDerivada";
import { updateDerivada, deleteSolicitud } from "../../repositories/solicitud";

export default function VerSolicitud() {
	const history = useHistory();
	const { id } = useParams();

	const [selectedSupervisor, setSelectedSupervisor] = useState("");

	const { data } = useSWR(id, {
		fetcher: getSolicitudById,
		initialData: [],
		revalidateOnMount: true,
	});

	const { data: solicitudUsuario } = useSWR(data.idUsuario, {
		fetcher: getUser,
		initialData: [],
		revalidateOnMount: true,
	});

	const tipo = "Supervisor";
	const { data: supervisores } = useSWR(tipo, {
		fetcher: getByTipo,
		initialData: [],
		revalidateOnMount: true,
	});

	function formatDate(dateString) {
		const options = {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			timeZoneName: "short",
		};

		const formattedDate = new Date(dateString).toLocaleString(
			undefined,
			options
		);
		return formattedDate;
	}

	const handleSimulation = async (e) => {
		e.preventDefault();

		const selectedSupervisorId = supervisores.find(
			(supervisor) => supervisor.nombre === selectedSupervisor
		).id;

		const solicitudData = {
			idSolicitud: data.id,
			idSupervisor: selectedSupervisorId,
		}

		const Selected = {
			nombreSupervisor: selectedSupervisor
		}
		
		await updateDerivada(data.id, Selected);

		await createDerivacion(solicitudData);

		// Mostrar la alerta
		alert("Solicitud derivada con éxito");

		history.push(`/comercial/solicitudesAreaComercial`)
	};

	const eliminarSolicitud = async (e) => {
		e.preventDefault();

		await deleteSolicitud(data.id);
		// Mostrar la alerta
		alert("Solicitud rechazada con éxito");

		history.push(`/comercial/solicitudesAreaComercial`)
	};

	return (
		<div className="container">
			<table className="table">
				<tbody>
					<tr>
						<th>ID Solicitud:</th>
						<td>{data.id}</td>
					</tr>
					<tr>
						<th>Nombre Cliente:</th>
						<td>{solicitudUsuario.nombre}</td>
					</tr>
					<tr>
						<th>Correo Cliente:</th>
						<td>{solicitudUsuario.email}</td>
					</tr>
					<tr>
						<th>Monto Solicitado: </th>
						<td>{data.montoSolicitado} CLP</td>
					</tr>
					<tr>
						<th>Plazo: </th>
						<td>{data.plazo} Meses</td>
					</tr>
					<tr>
						<th>Valor Cuota: </th>
						<td>{data.cuotaCLP} UF</td>
					</tr>
					<tr>
						<th>Valor Cuota UF: </th>
						<td>{data.cuotaUF} UF</td>
					</tr>
					<tr>
						<th>Total a Pagar: </th>
						<td>{data.totalCLP} CLP</td>
					</tr>
					<tr>
						<th>Total a Pagar UF: </th>
						<td>{data.totalUF} UF</td>
					</tr>
					<tr>
						<th>Estado: </th>
						<td>{data.estadoSolicitud}</td>
					</tr>
					<tr>
						<th>Fecha de la Solicitud: </th>
						<td>{formatDate(data.createdAt)}</td>
					</tr>
				</tbody>
			</table>
			<div className="container mt-4">
				<div>
					<strong>Supervisores Diponibles para Derivar:</strong>{" "}
					{supervisores ? (
						<select
							value={selectedSupervisor}
							onChange={(e) =>
								setSelectedSupervisor(e.target.value)
							}
						>
							<option value="">Selecciona un supervisor</option>
							{supervisores.map((supervisor) => (
								<option
									key={supervisor.id}
									value={supervisor.nombre}
								>
									{supervisor.nombre}
								</option>
							))}
						</select>
					) : (
						"No hay supervisores"
					)}
				</div>
				<br></br>
				<button className="btn btn-info" onClick={handleSimulation}>
					Derivar solicitud
				</button>
				<button className="btn btn-danger ml-3" onClick={eliminarSolicitud}>
					Rechazar
				</button>
			</div>
		</div>
	);
}
