import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { updateSolicitud } from "../../repositories/solicitud";

export default function CalculoCredito() {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const creditValue = queryParams.get("creditValue");
	const solicitudId = queryParams.get("id");
	const paymentMonths = Number(queryParams.get("paymentMonths"));
	const ufValue = queryParams.get("ufValue");
	const ufValueCalculos = parseFloat(ufValue.replace(".", ""));

	const [cuotaUF, setCuotaUF] = useState(0);
	const [totalCredito, setTotalCredito] = useState(0);

	const history = useHistory();

	const handleActualizarEstado = async (e) => {
		e.preventDefault();

		await updateSolicitud(solicitudId);
		history.push("/ventas/mostrarSolicitudes");
	};

	useEffect(() => {
		const calculo = () => {
			const tasaMensual = 0.01;
			const creditValueUf = creditValue / ufValueCalculos;
			const cuota =
				creditValueUf /
				((1 - (1 + tasaMensual) ** -paymentMonths) / tasaMensual);
			const total = cuota * paymentMonths;

			setCuotaUF(cuota);
			setTotalCredito(total);
		};

		if (creditValue && paymentMonths) {
			calculo();
		}
	}, [creditValue, paymentMonths, ufValue]);

	return (
		<div className="container mt-4">
			<h2 className="mb-4">Cálculo de Crédito</h2>
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">Detalles del Crédito</h5>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">
							<strong>Monto Solicitado:</strong> {creditValue} CLP
						</li>
						<li className="list-group-item">
							<strong>Monto Solicitado en UF:</strong>{" "}
							{(
								creditValue /
								parseFloat(ufValue.replace(".", ""))
							).toFixed(2)}{" "}
							UF
						</li>
						<li className="list-group-item">
							<strong>Tasa:</strong> {1}% (Ejemplo)
						</li>
						<li className="list-group-item">
							<strong>Valor UF Actual:</strong> {ufValue} CLP
						</li>
						<li className="list-group-item">
							<strong>Plazo:</strong> {paymentMonths} meses
						</li>
						<li className="list-group-item">
							<strong>Valor Cuota:</strong>{" "}
							{(cuotaUF * ufValueCalculos).toFixed(2)} CLP
						</li>
						<li className="list-group-item">
							<strong>Valor Cuota en UF:</strong>{" "}
							{cuotaUF.toFixed(2)} UF
						</li>
						<li className="list-group-item">
							<strong>Total a Pagar:</strong>{" "}
							{(totalCredito * ufValueCalculos).toFixed(2)} CLP
						</li>
						<li className="list-group-item">
							<strong>Total a Pagar en UF:</strong>{" "}
							{totalCredito.toFixed(2)} UF
						</li>
					</ul>
					<div className="card-body">
						<Link
							to="#"
							onClick={handleActualizarEstado}
							className="btn btn-primary mr-2"
						>
							Ingresar Crédito
						</Link>
						<Link to="/users" className="btn btn-secondary mr-2">
							Volver al inicio
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
