import React, { useState } from "react";
import axios from "axios";
import Dashboard_nav from "./Dashboard_nav";
import {EditorState, convertToRaw} from 'draft-js';
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../../Styles/Dashboard_new.css'

const Dashboard_new_page = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleEditorChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const title = e.target.elements.title.value;
        const contentState = editorState.getCurrentContent();
        const rawText = JSON.stringify(convertToRaw(contentState));

        try{
            const response =await axios.post("http://localhost:8080/dashboard/createblog",{
                content: rawText,
                title: title,
            });
            console.log("success");
        }
        catch(error){
            console.log("Error ",error);
        }
    };

    return (
        <div>
            <Dashboard_nav />
            <div className="Dashboardcontent">
            <form onSubmit={handleSubmit}>
                
                {/* <header className="App-header">Rich text Editor example</header> */}
                <input type="text" className="titleBox form-control" name="title" id="title" placeholder="Enter the title..." />
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