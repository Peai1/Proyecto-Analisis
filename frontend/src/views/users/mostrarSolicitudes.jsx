import React, { useState, useEffect } from 'react';
import { getAll } from '../../repositories/solicitud';
import useSWR from "swr";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

export default function MostrarSolicitudes() {

    const { data: solicitudes, error } = useSWR("/solicitudes/all", {
		fetcher: getAll,
		initialData: [],
		revalidateOnMount: true,
	});

    const tbody = [];
    solicitudes.forEach(({ id, id_usuario, monto_solicitado, plazo, cuota_uf, total, estado_solicitud }) => {
        tbody.push(
            <tr key={id}>
                <td>{id}</td>
                <td>{id_usuario}</td>
                <td>{monto_solicitado}</td>
                <td>{plazo}</td>
                <td>{cuota_uf}</td>
                <td>{total}</td>
                <td>{estado_solicitud}</td>
                {/* Agrega aquí cualquier otra acción que desees realizar con cada solicitud */}
            </tr>
        );
    });

    return (
        <Container className="pt-4">
            <h1>Listado de Solicitudes de Crédito</h1>
            {/* Agrega aquí cualquier botón o enlace adicional que necesites */}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID Usuario</th>
                        <th>Monto Solicitado</th>
                        <th>Plazo</th>
                        <th>Cuota UF</th>
                        <th>Total</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>{tbody}</tbody>
            </Table>

            {/* Agrega aquí más condiciones y enlaces según el tipo de usuario */}
        </Container>
    );
}