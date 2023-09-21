import React from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dashboard_nav from "./Dashboard_nav";
import '../../Styles/Dashboard_new.css'

const Dashboard_new_page = () => {
    return (
        <div>
            <Dashboard_nav />
            <div className="Dashboardcontent">
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={15} />
                    </Form.Group>
                    
                    {window.location.pathname === "/Dashboard_edit_page" ? (
                        <Button variant="warning" className="Dashboardbtn">Update</Button>
                    ) : (
                        <Button variant="warning" className="Dashboardbtn">Submit</Button>
                    )}
                </Form>
            </div>

        </div>
    );
}

export default Dashboard_new_page;