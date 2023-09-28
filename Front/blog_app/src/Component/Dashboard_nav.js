import React from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../Styles/Dashboard_main.css'
import { useNavigate } from "react-router-dom";


const Dashboard_nav = () => {
    const n = useNavigate();
    return (
        <div>
            
            <Navbar bg="warning" data-bs-theme="light">
                <Container className="dashboardcontent">
                    <Navbar.Brand href="/Dashboard_home_page">Blogue</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/Dashboard_home_page">Home</Nav.Link>
                        <Nav.Link href="/Dashboard_new_page">New</Nav.Link>
                        <Nav.Link href="/Dashboard_all">All</Nav.Link>
                        <Nav.Link href="/Dashboard_bin">Bin</Nav.Link>
                    </Nav>
                    <Navbar.Text><Button onClick={()=>{
                        localStorage.removeItem("authToken");
                        localStorage.removeItem("blog_id");
                        n("/")
                    }}><i class="fa fa-sign-out" aria-hidden="true"></i></Button></Navbar.Text>
                </Container>
            </Navbar>
        </div>
    );
}

export default Dashboard_nav;

sessionStorage.clear()