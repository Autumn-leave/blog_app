import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../../Styles/Dashboard_new.css'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard_nav from "../../Component/Dashboard_nav";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import { useNavigate } from "react-router-dom";
import dashboardService from "../../Service/DashboardService";

const Dashboard_new_page = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const nav = useNavigate();
    const handleEditorChange = (newEditorState) => {
        setEditorState(newEditorState);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target.elements.title.value;
        const token = localStorage.getItem("authToken");
        const contentState = editorState.getCurrentContent();
        const rawText = JSON.stringify(convertToRaw(contentState));

        const response = await dashboardService.dashboardnew(rawText, title, token);
        if (response.data.message === "Successfully stored") {
            nav('/Dashboard_home_page')
        }
        else {
            alert(response)
        }

    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token === null) {
            localStorage.clear()
            nav('/')
        }
    }, [])

    return (
        <div>
            <Dashboard_nav />
            <div className="Dashboardcontent">
                <form onSubmit={handleSubmit}>
                    <input type="text" className="titleBox form-control" name="title" id="title" placeholder="Enter the title..." required />
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        editorClassName="editorClassName"
                    />
                    <button type="submit" className="btn btn-warning">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Dashboard_new_page;