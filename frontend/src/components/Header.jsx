import Navbar from 'react-bootstrap/Navbar';
import React from 'react'
import { useSelector } from 'react-redux'

export default function Header() {
    const nombre = useSelector((store => store.username));

    return (
       <Navbar bg="dark" variant="dark" className="d-flex justify-content-center">
            <Navbar.Brand href="/">
            <div className='d-flex justify-content-center'>Financiera La Clave</div>
        
            </Navbar.Brand>
            <div className="text-white d-flex justify-content-end"> Bienvenido</div>
        </Navbar>
    )
}

