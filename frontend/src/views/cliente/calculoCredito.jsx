import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { createSolicitud } from "../../repositories/solicitud";

export default function CalculoCredito() {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const creditValue = parseFloat(queryParams.get("creditValue"));
	const paymentMonths = Number(queryParams.get("paymentMonths"));
	const ufValue = queryParams.get("ufValue");
	const ufValueCalculos = parseFloat(ufValue.replace(".",""));

	const [cuotaUF, setCuotaUF] = useState(0);
	const [totalCredito, setTotalCredito] = useState(0);

	const history = useHistory();

	const crearSolicitud = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem("token");
		const decoded = jwtDecode(token);
		const userId = decoded.userId;

		const solicitudData = {
			idUsuario: userId,
			montoSolicitado: creditValue,
			plazo: paymentMonths,
			cuotaUF: cuotaUF.toFixed(2),
			totalUF: totalCredito.toFixed(2),
			cuotaCLP: (cuotaUF * ufValueCalculos).toFixed(2),
			totalCLP: (totalCredito * ufValueCalculos).toFixed(2),
		};

		const response = await createSolicitud(solicitudData);
		alert("Solicitud ingresada con éxito");
		history.push(`/users`);
	};

	useEffect(() => {
		const calculo = () => {
			const tasaMensual = 0.01;
			const creditValueUf = creditValue / ufValueCalculos;
			const cuota =
				creditValueUf /
				((1 - (1 + tasaMensual)**(-paymentMonths)) / tasaMensual);
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
							<strong>Monto Solicitado:</strong>{" "}
							{creditValue} CLP
						</li>
						<li className="list-group-item">
							<strong>Monto Solicitado en UF:</strong>{" "}
							{
								(
									creditValue /
									parseFloat(ufValue.replace(".", ""))
								).toFixed(2)}{" "}
							UF
						</li>
						<li className="list-group-item">
							<strong>Tasa:</strong> {1}% (Ejemplo)
						</li>
						<li className="list-group-item">
							<strong>Valor UF Actual:</strong> {ufValue}{" "}
							CLP
						</li>
						<li className="list-group-item">
							<strong>Plazo:</strong> {paymentMonths} meses
						</li>
						<li className="list-group-item">
							<strong>Valor Cuota:</strong>{" "}
							{
								(
									cuotaUF *
									ufValueCalculos
								).toFixed(2)}{" "}
							CLP
						</li>
						<li className="list-group-item">
							<strong>Valor Cuota en UF:</strong>{" "}
							{cuotaUF.toFixed(2)} UF
						</li>
						<li className="list-group-item">
							<strong>Total a Pagar:</strong>{" "}
							{
								(
									totalCredito *
									ufValueCalculos).toFixed(2)}{" "}
							CLP
						</li>
						<li className="list-group-item">
							<strong>Total a Pagar en UF:</strong>{" "}
							{totalCredito.toFixed(2)} UF
						</li>
					</ul>
					<div className="card-body">
						<Link
							to="/cliente/creditSimulation"
							className="btn btn-info mr-2"
						>
							Realizar otra simulación
						</Link>
						<Link
							to="#"
							onClick={crearSolicitud}
							className="btn btn-primary mr-2"
						>
							Solicitar crédito
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
