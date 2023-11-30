import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import UsersEdit from "./views/users/edit";
import UsersView from "./views/users/show";
import UserList from "./views/users/index";
import UserAdd from "./views/users/create";
import Login from "./views/users/login";
import SimulacionCredito from "./views/cliente/creditSimulation";
import CalculoCredito from "./views/cliente/calculoCredito";
import MostrarSolicitudes from "./views/ventas/mostrarSolicitudes";
import VerSolicitudVentas from "./views/ventas/verSolicitud";
import SolicitudesComercial from "./views/comercial/solicitudesAreaComercial";
import VerSolicitudComercial from "./views/comercial/verSolicitud";
import SimulacionVentas from "./views/ventas/simulacionAreaVentas";
import CalculoCreditoVentas from "./views/ventas/calculoCredito";

import Home from "./views/Home";

export default function App() {
	return (
		<Router>
			<div>
				<Header />
				<Container fluid className="p-0">
					<Row className="no-gutters">
						<Col xs="2">
							<Sidebar />
						</Col>
						<Col xs="10">
							{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
							<Switch>
								<Route path="/users/login">
									<Login />
								</Route>
								<Route path="/ventas/calculoCredito">
									<CalculoCreditoVentas />
								</Route>
								<Route path="/ventas/simulacionAreaVentas">
									<SimulacionVentas />
								</Route>
								<Route path="/comercial/solicitudesAreaComercial/:id">
									<VerSolicitudComercial />
								</Route>
								<Route path="/comercial/solicitudesAreaComercial">
									<SolicitudesComercial />
								</Route>
								<Route path="/ventas/mostrarSolicitudes/:id">
									<VerSolicitudVentas />
								</Route>
								<Route path="/ventas/mostrarSolicitudes">
									<MostrarSolicitudes />
								</Route>
								<Route path="/cliente/creditSimulation">
									<SimulacionCredito />
								</Route>
								<Route path="/cliente/calculoCredito">
									<CalculoCredito />
								</Route>
								<Route path="/users/create">
									<UserAdd />
								</Route>
								<Route path="/users/:id/edit">
									<UsersEdit />
								</Route>
								<Route path="/users/:id">
									<UsersView />
								</Route>
								<Route path="/users">
									<UserList />
								</Route>
								<Route path="/">
									<Home />
								</Route>
							</Switch>
						</Col>
					</Row>
				</Container>
			</div>
		</Router>
	);
}
