import React, { useEffect, useState } from "react";
import axios from "axios";
import { convertFromRaw, EditorState,convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom";
import Dashboard_nav from "../../Component/Dashboard_nav";
import '../../Styles/Dashboard_new.css'

const Dashboard_view_page = () => {
    const [blog, setBlog] = useState(null);
    const [user, setUser] = useState(null);
    const nav = useNavigate();
    const [editorState, setEditorState] =useState(EditorState.createEmpty());
    const getdata = async (Blog_ID) => {
        try {
            const token = localStorage.getItem("authToken")
            const response = await axios.get(`http://localhost:8080/dashboard/getEditBtn/${Blog_ID}`,{headers: {Authorization: token}});
            console.log(response.data.blogData.Title);
            setBlog(response.data.blogData);
            setUser(response.data.userData);
            const contentState = convertFromRaw(JSON.parse(response.data.blogData.Content));
            const newEditorState = EditorState.createWithContent(contentState);
            setEditorState(newEditorState); // Set editorState using the state setter
        } catch (error) {
            console.log(error);
        }
    };

    

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
                    <form >

                        {/* <header className="App-header">Rich text Editor example</header> */}
                        <div className="dashboard-view">
                        <h4>Title: {blog.Title} </h4>
                        <h4>Author: {user.Name}</h4>
                        </div><br/>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                            editorClassName="editorClassName"
                            readOnly={true}
                            toolbarHidden={true}
                            
                    

                        />
                       
                    </form>
                </div>
            )}
        </div>
        </div>
    );
}

export default Dashboard_view_page;
