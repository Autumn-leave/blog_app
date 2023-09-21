import React, { useState } from "react";
import {EditorState, convertToRaw} from 'draft-js';
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import "../Styles/Dummy.css"

const Dummy = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleEditorChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    
    const handleSubmit = async (e) =>{
        e.preventDefault();

        const contentState = editorState.getCurrentContent();
        const rawText = JSON.stringify(convertToRaw(contentState));

        try{
            const response =await axios.post("http://localhost:8080/dashboard/createblog",{content: rawText});
            console.log("success");
        }
        catch(error){
            console.log("Error ",error);
        }
    };

    

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <header className="App-header">Rich text Editor example</header>
                <Editor 
                editorState={editorState}
                onEditorStateChange={setEditorState}
                
                />
                <button type="submit">Save</button>
            </form>
        </div>
    );
} 

export default Dummy;