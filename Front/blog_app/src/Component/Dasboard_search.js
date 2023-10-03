import React, { useState } from "react";

function Dashboard_search (){
    const [searchterm, Setsearchterm] =useState('');
    return(<div>
        <input 
        type="text"
        placeholder="search.."
        value={searchterm}
        onChange={(e)=>{Setsearchterm(e.target.value)}}
        />
    </div>);
} 
export default Dashboard_search;