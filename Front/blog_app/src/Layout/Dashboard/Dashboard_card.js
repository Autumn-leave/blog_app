import React from "react";
import axios from "axios";
import { convertFromRaw } from 'draft-js';
import "../../Styles/Dashboard_in_card.css"
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard_card = (props) => {
    const { blogcontent, onItemDeleted } = props;
    const token = localStorage.getItem("authToken");
    const nav = useNavigate();

    const handleDelete = async (data) => {
        try {
            console.log(data.blog_ID);
            const blog_ID = data.blog_ID;
            const response = await axios.get(`http://localhost:8080/dashboard/deleteBlog/${blog_ID}`, {headers: {Authorization: token}});
            console.log(response.data);

            // Call the parent component's callback to handle item deletion
            onItemDeleted(data);
        } catch (error) {
            alert("Error: " + error);
        }
    };
    const handleRestore = async (data) => {
        try {
            console.log(data.blog_ID);
            const blog_ID = data.blog_ID;
            const response = await axios.get(`http://localhost:8080/dashboard/restore/${blog_ID}`);
            console.log(response.data);

            // Call the parent component's callback to handle item deletion
            onItemDeleted(data);
        } catch (error) {
            alert("Error: " + error);
        }
    };

    const handleEdit = (data) =>{
       
            localStorage.setItem("blog_id",data.blog_ID);
            nav('/Dashboard_edit_page');
            // const blog_ID = data.blog_ID;
            // const response = axios.get(`http://localhost:8080/dashboard/Edit/`)
        
    }

    return (
        <div>
            {blogcontent.map((data, index) => {
                const contentState = convertFromRaw(JSON.parse(data.Content));
                const contentText = contentState.getPlainText();

                return (
                    <div className="card dashboard_size" key={index}>
                        <div className="card-body dashboard_size">
                            <h5>{data.Title}</h5>
                            <div>
                                {window.location.pathname === "/Dashboard_home_page" ? (
                                    <div className="card-btn">
                                        <button onClick={() => { handleEdit(data) }} className="btn btn-warning">Edit</button>
                                        <button onClick={() => { handleDelete(data) }} className="btn btn-warning">Delete</button>
                                    </div>
                                ) : (
                                    <button onClick={() => { handleRestore(data) }} className="btn btn-warning">Restore</button>
                                )}

                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Dashboard_card;


