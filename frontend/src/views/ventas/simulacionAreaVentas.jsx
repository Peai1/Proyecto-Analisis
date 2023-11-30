import React, { useState, useEffect} from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";

export default function SimulacionAreaVentas() {
    const history = useHistory();
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const creditoInicial = parseFloat(params.get("credito"));
    const plazoInicial = parseInt(params.get("plazo"));
    const idSolicitud = params.get("id");

    console.log("ID SOLICITUD:" + idSolicitud);;

    const [credito, setCredito] = useState(creditoInicial);
    const [plazo, setPlazo] = useState(plazoInicial);
    const [ufValue, setUfValue] = useState('');

    const handleSimulation = (e) => {
        e.preventDefault();
        history.push(`/ventas/calculoCredito?creditValue=${credito}&paymentMonths=${plazo}&ufValue=${ufValue}&id=${idSolicitud}`);
    };

    useEffect(() => {
        const fetchUfValue = async () => {
            try {
                const response = await axios.get('https://api.sbif.cl/api-sbifv3/recursos_api/uf?apikey=add0087c10d06dbf83f412ef8e1268c68a181c2f');
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data, "text/xml");

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
            <h2>Simulación de Crédito</h2>
            <form onSubmit={handleSimulation}>
                <div className="form-group">
                    <label htmlFor="valor">Valor del crédito</label>
                    <input
                        type="number"
                        className="form-control"
                        id="valor"
                        value={credito}
                        onChange={(e) => setCredito(parseFloat(e.target.value))}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="plazo">Cantidad de meses en que desea pagar:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="plazo"
                        value={plazo}
                        onChange={(e) => setPlazo(parseInt(e.target.value))}
                        required
                    />
                </div>

                <div>
                    <label>Valor UF Actual: </label>
                    <span>{" " + ufValue}</span>
                </div>

                <button type="submit" className="btn btn-info">
                    Realizar Simulación
                </button>
            </form>
        </div>
    );
}
