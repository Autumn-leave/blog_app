import React from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../Styles/Dashboard_main.css'
import { Link } from "react-router-dom";


const Dashboard_nav = () => {
    return (
        <div>
            <Navbar bg="warning" data-bs-theme="light">
                <Container className="dashboardcontent">
                    <Navbar.Brand href="#home">Blogue</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/Dashboard_home_page">Home</Nav.Link>
                        <Nav.Link href="/Dashboard_new_page">New</Nav.Link>
                        {/* <Nav.Link href="/Dashboard_edit_page">Edit</Nav.Link> */}
                        <Nav.Link href="/Dashboard_bin">Bin</Nav.Link>
                    </Nav>
                    <Navbar.Text><Link onClick={()=>{
                        localStorage.removeItem("authToken");
                        Nav("/")
                    }}><i class="fa fa-sign-out" aria-hidden="true"></i></Link></Navbar.Text>
                </Container>
            </Navbar>
        </div>
    );
}

export default Dashboard_nav;

sessionStorage.clear()