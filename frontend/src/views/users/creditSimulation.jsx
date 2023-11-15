import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default function creditSimulation() {

    const [creditValue, setCreditValue] = useState('');
    const [paymentMonths, setPaymentMonths] = useState('');
    const [ufValue, setUfValue] = useState('');

    useEffect(() => {
        const fetchUfValue = async () => {
            try {
                const response = await axios.get('https://api.sbif.cl/api-sbifv3/recursos_api/uf?apikey=add0087c10d06dbf83f412ef8e1268c68a181c2f');
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data, "text/xml");

                // Aquí asumimos que el XML tiene la estructura que proporcionaste
                const ufNode = xmlDoc.getElementsByTagName("UF")[0];
                const valorNode = ufNode.getElementsByTagName("Valor")[0];
                const valorUf = valorNode.childNodes[0].nodeValue;

                setUfValue(valorUf);
            } catch (error) {
                console.error("Error al obtener el valor de la UF", error);
            }
        };

        fetchUfValue();
    }, []);

    const handleSimulation = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica de la simulación del crédito
        console.log({ creditValue, paymentMonths, ufValue });
    };

    return (
        <div className="container mt-4">
            <h2>Simulación de Crédito</h2>
            <form onSubmit={handleSimulation}>
                <div className="form-group">
                    <label htmlFor="valor">Valor del crédito</label>
                    <input 
                        type="number" 
                        className="form-control"
                        id="valor"
                        value={creditValue} 
                        onChange={(e) => setCreditValue(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="plazo">Cantidad de meses en que desea pagar:</label>
                    <input 
                        type="number" 
                        className="form-control"
                        id="plazo"
                        value={paymentMonths} 
                        onChange={(e) => setPaymentMonths(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Valor UF Actual: </label>
                    <span>{" " + ufValue}</span>
                </div>
                <Link to="/users/calculocredito">
                        <button className="btn btn-info">
                            Simular
                        </button>
                    </Link>
            </form>
        </div>
    );
}

