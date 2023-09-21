import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate, Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import '../Styles/Sign_in.css';

const validationSchema = yup.object().shape({
    name: yup.string()
      .required('Name is required'),
    username: yup.string()
      .required('Username is required'),
    email: yup.string()
      .email('Invalid email')
      .test('com-domain', 'Email must have .com domain', (value) => {
        if (!value) return true; // Skip validation if value is empty
        return value.endsWith('.com');
      })
      .required('Email is required'),
    password: yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

const Sign_up = () => {
    const nav =useNavigate();
  const handleSubmit = async (values, { resetForm }) => {
    { console.log(values) }
    const response1 = await axios.post('http://localhost:8080/users/register', {

      name: values.name,
      username: values.username,
      password: values.password,
      phone:values.phone,
      email: values.email,
    }).then((res) => {
      console.log("res:",res.data);
      resetForm();
    }).catch((d) => {
      alert("Email ID or Username already exists!");
    })
  };

    return (
        <div className='container-fluid'>
            <div className='row'>
            <div className='col-sm-3 col-md-7'>
                <h1> Exploring Ideas,</h1>
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
              name: '',
              username: '',
              email: '',
              phone: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-3">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                    <i class="fa fa-user icon"></i>
                    </span>
                  </div>
                  <Field type="text" className="form-control" id="name" name="name" placeholder="Enter the Name"/>
                </div>
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>
              <div className='mb-3'>
                <div className="input-group ">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-user-circle icon"></i>
                    </span>
                  </div>
                  <Field type="text" className="form-control" id="username" name="username" placeholder="Enter the Username"/>

                </div>
                <ErrorMessage name="username" component="div" className="text-danger" />
              </div>
              <div className='mb-3'>
                <div className="input-group ">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-envelope icon"></i>
                    </span>
                  </div>
                  <Field type="email" className="form-control" id="email" name="email" placeholder="Enter the Email" />

                </div>
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              <div className='mb-3'>
                <div className="input-group ">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-envelope icon"></i>
                    </span>
                  </div>
                  <Field type="text" className="form-control" id="phone" name="phone" placeholder="Enter the Phone number" />

                </div>
                <ErrorMessage name="phone" component="div" className="text-danger" />
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
              <div className='mb-3'>
                <div className="input-group ">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-key icon"></i>
                    </span>
                  </div>
                  <Field type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Enter the Re-Password"/>

                </div>
                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
              </div>
              <div className='buton'>
                <button type="submit" className="btn form-control"><b>Sign Up</b></button>
              </div>
              <hr/>
              <Link to={'/'} className="link">Account Already Exists</Link>
            </Form>
          </Formik>
        </div>
    </div>
</div>
            </div>

        </div>
    );
};



export default Sign_up;