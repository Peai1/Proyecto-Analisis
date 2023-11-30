import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
    const style = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            marginRight: '220px',
            marginTop: '50px', // Ajusta según necesidad
        },
        text: {
            fontSize: '2em', // Aumenta el tamaño del texto
            fontWeight: 'bold',
            color: '#4a4a4a', // Cambia el color según el diseño
            marginTop: '20px',
            marginLeft: '350px',
        },
        description: {
            fontSize: '1em', // Tamaño más pequeño para la descripción
            color: '#4a4a4a',
            marginTop: '10px',
            textAlign: 'center', // Texto centrado
            maxWidth: '600px', // Ancho máximo para mantener la legibilidad
            marginLeft: '235px',
        },
    };

    return (
        <div style={style.container}>
            <FontAwesomeIcon icon={faMoneyBillWave} size="3x" color="#4a4a4a" />
            <div style={style.text}>
                FINANCIERA LA CLAVE
            </div>
            <div style={style.description}>
                Bienvenido a Financiera La Clave, su socio confiable para soluciones financieras personalizadas. Ofrecemos una amplia gama de servicios, incluyendo préstamos, asesoría financiera y opciones de inversión adaptadas a sus necesidades.
            </div>
        </div>
    );
}
