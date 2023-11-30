import React from "react";
import useSWR from "swr";

import { useParams, useHistory } from "react-router-dom";
import { getSolicitudById } from "../../repositories/solicitud";
import { getUser } from "../../repositories/user";

export default function VerSolicitud() {
	const history = useHistory();
	const { id } = useParams();

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

	const handleSimulation = (e) => {
        e.preventDefault();
		history.push(`/ventas/simulacionAreaVentas?credito=${data.montoSolicitado}&plazo=${data.plazo}&id=${data.id}`);
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
						<td>{data.plazo}</td>
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
                <button className="btn btn-info" onClick={handleSimulation}>
                    Simular Credito
                </button>
            </div>
		</div>
	);
}
