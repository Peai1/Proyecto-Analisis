import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function calculoCredito() {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const creditValue = queryParams.get("creditValue");
	const paymentMonths = queryParams.get("paymentMonths");
	const ufValue = queryParams.get("ufValue");

	const [cuotaUF, setCuotaUF] = useState(0);
	const [totalCredito, setTotalCredito] = useState(0);

	useEffect(() => {
		const calculo = () => {
			const tasaMensual = 0.01; // Asumiendo un 1% mensual, por ejemplo
			const cuota =
				creditValue /
				((1 - Math.pow(1 + tasaMensual, -paymentMonths)) / tasaMensual);
			const total = cuota * paymentMonths;

			setCuotaUF(cuota);
			setTotalCredito(total);
		};

		if (creditValue && paymentMonths) {
			calculo();
		}
	}, [creditValue, paymentMonths]);

	return (
		<div className="container mt-4">
			<h2 className="mb-4">Cálculo de Crédito</h2>
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">Detalles del Crédito</h5>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">
							<strong>Tasa:</strong> {" " + 1}% (Ejemplo)
						</li>
						<li className="list-group-item">
							<strong>Valor UF Actual:</strong> {" " + ufValue}
						</li>
						<li className="list-group-item">
							<strong>Plazo:</strong> {" " + paymentMonths} meses
						</li>
						<li className="list-group-item">
							<strong>Valor Cuota:</strong> {" " + cuotaUF.toFixed(2)} UF
						</li>
						<li className="list-group-item">
							<strong>Total a Pagar:</strong> {" " + totalCredito.toFixed(2)} UF
						</li>
					</ul>
					<div className="card-body">
						<Link to="/users/creditSimulation" className="btn btn-info mr-2">
							Realizar otra simulación
						</Link>
						<Link to="/users" className="btn btn-secondary">
							Volver al inicio
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
