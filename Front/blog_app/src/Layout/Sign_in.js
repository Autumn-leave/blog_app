import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate, Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import '../Styles/Sign_in.css';

const validationSchema = yup.object().shape({
    email: yup.string()
        .required("Email is required"),
    password: yup.string()
        .required("Password is required"),
});

const Sign_in = () => {
    const nav = useNavigate();
    const handleSubmit = async (values) => {
        const response1 = await axios.post('http://localhost:8080/users/loginUser', {
            email: values.email,
            password: values.password,
        }).then((d) => {
            console.log(d.data.data);
            alert("success")
        }).catch((d) => {
            alert("Email ID or Password is wrong!");
        })
    };
    return (
        <div className='container-fluid'>
            <div className='row'>
            <div className='col-sm-3 col-md-7'>
                <h1>Exploring Ideas,</h1>
                <h3>Igniting Minds.</h3>
            </div>
<div className='col-sm-9 col-md-5'>
    <div>
        {/* <h1>Happening now</h1><br /> */}
        <h4>Lets start!</h4>
    </div>
    <div class="card">
        <div class="content">
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <div className='mb-3'>
                    <div className="input-group ">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                            <i className="fa fa-envelope icon"></i>
                            </span>
                        </div>
                        <Field type="text" className="form-control" id="email" name="email" placeholder="Enter the Email" />

                    </div>
                    <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
                <div className='mb-3'>
                    <div className="input-group ">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                            <i className="fa fa-key icon"></i>
                            </span>
                        </div>
                        <Field type="password" className="form-control" id="password" name="password" placeholder="Enter the Password"/>

                    </div>
                    <ErrorMessage name="password" component="div" className="text-danger" />
                </div>
                <div className='buton'>
                    <button type="submit" className="btn form-control"><b>Login</b></button>
                </div>
                <hr/>
                <Link to={'/Sign_up'} className="link">Create New Account</Link>
            </Form>
        </Formik>
        </div>
    </div>
</div>
            </div>

        </div>
    );
};



export default Sign_in;