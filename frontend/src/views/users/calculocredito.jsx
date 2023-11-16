import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function calculocredito() {
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const creditValue = queryParams.get('creditValue');
    const paymentMonths = queryParams.get('paymentMonths');

    
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

    return (
        <div className="container mt-4">
            <h2>Calculo Credito</h2>
            <form>
                
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
                    <span>{" " + paymentMonths}</span>
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

