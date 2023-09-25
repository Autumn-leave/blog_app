import React from "react";
import axios from "axios";
import { convertFromRaw } from 'draft-js';
import "../../Styles/Dashboard_in_card.css"
import { Navigate, useNavigate } from "react-router-dom";
import dashboardService from "../../Service/DashboardService";

const Dashboard_card = (props) => {
    const { blogcontent, onItemDeleted } = props;
    const token = localStorage.getItem("authToken");
    const nav = useNavigate();

    const handleDelete = async (data) => {
        try {
            console.log(data.blog_ID);
            const blog_ID = data.blog_ID;
            const response = await dashboardService.dashboardcard_handledelete(blog_ID,token);
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
            const response = await dashboardService.dashboardcard_handlerestore(blog_ID,token);
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
        
    }

    const handleView = (data) => {
        localStorage.setItem("blog_id",data.blog_ID);
            nav('/Dashboard_view_page');
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
                                ) :(
                                    window.location.pathname === "/Dashboard_all" ? (
                                        <div className="card-btn">
                                            <button onClick={() => { handleView(data) }} className="btn btn-warning">View</button>
                                        </div>
                                    ) : 
                                    (
                                        <div className="card-btn">
                                            <button onClick={() => { handleRestore(data) }} className="btn btn-warning">Restore</button>
                                        </div>
                                    ) 
                                )
                                 }

                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Dashboard_card;


