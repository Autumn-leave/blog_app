import React, { useEffect, useState } from "react";
import { convertFromRaw, EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import Dashboard_nav from "./Dashboard_nav";
import Dashboard_card from "./Dashboard_card";

const Dashboard_home_page = () => {
    const [blogcontent, setBlogcontent] = useState([]);

    const fetchBlogContent = async () => {
        try {
            const response = await axios.get("http://localhost:8080/dashboard/fetch");
            setBlogcontent(response.data.blogData);
        } catch (error) {
            alert("Error: " + error);
        }
    };

    

    useEffect(() => {
        fetchBlogContent();
    }, []);

    return (
        <div>
            <Dashboard_nav />
            <Dashboard_card blogcontent={blogcontent}/>
        </div>

    );
}
export default Dashboard_home_page;