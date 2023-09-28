import React, { useEffect, useState } from "react";
import axios from "axios";
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom";
import Dashboard_nav from "../../Component/Dashboard_nav";
import '../../Styles/Dashboard_new.css'
import dashboardService from "../../Service/DashboardService";

const Dashboard_edit_page = () => {
    const [blog, setBlog] = useState(null);
    const nav = useNavigate();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const getdata = async (Blog_ID) => {
        const token = localStorage.getItem("authToken")
        const response = await dashboardService.dashboardeditbtn(Blog_ID, token);
        console.log(response.data.blogData.Title);
        setBlog(response.data.blogData);
        const contentState = convertFromRaw(JSON.parse(response.data.blogData.Content));
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState); // Set editorState using the state setter
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("success");
        const title = e.target.elements.title.value;
        const contentState = editorState.getCurrentContent();
        const rawText = JSON.stringify(convertToRaw(contentState));
        const blog_ID = localStorage.getItem("blog_id")
        const response = await dashboardService.dashboardedit(blog_ID, rawText, title)
        nav('/Dashboard_home_page')
    }

    useEffect(() => {
        const Blog_ID = localStorage.getItem("blog_id");
        if (Blog_ID) {
            getdata(Blog_ID);
        }
    }, [])

    return (
        <div>
            <Dashboard_nav />
            <div className="Dashboardcontent">
                {blog && (
                    <div>
                        {/* <div>
                        <h5>{blog.Title}</h5>
                        <Editor editorState={editorState} readOnly={false} />

                    </div> */}
                        <form onSubmit={handleSubmit}>
                            <input type="text" className="titleBox form-control" name="title" id="title" defaultValue={blog.Title} required />
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={setEditorState}
                                editorClassName="editorClassName"
                                readOnly={false}
                            />
                            <button type="submit" className="btn btn-warning">Submit</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard_edit_page;
