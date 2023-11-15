import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default function calculocredito() {

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
            <h2>Calculo Credito</h2>
            <form onSubmit={handleSimulation}>
                
                <div>
                    <label>Tasa: </label>
                    <span>{" " + 1}</span>
                </div>
                <div>
                    <label>Valor UF Actual: </label>
                    <span>{" " + ufValue}</span>
                </div>
                <div>
                    <label>Plazo: </label>
                    <span>{" " + 1}</span>
                </div>
                <div>
                <Link to="/users/creditSimulation">
                        <button className="btn btn-info">
                            Realizar otra simulacion
                        </button>
                        </Link>
                </div>
                <div>
                <Link to="/users">
                        <button className="btn btn-info">
                            Volver a inicio
                        </button>
                        </Link>
                </div>
            </form>
        </div>
    );
}

