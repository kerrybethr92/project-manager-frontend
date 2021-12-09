import React from 'react'
import {useState, useEffect} from 'react';

const NavBar = (props) => {
    return (
        <nav>
            <ul id="nav">
                <li onClick={()=>{props.setCurrentPage("projectsIndex")}}>home</li>
                <li onClick={()=>{props.setCurrentPage("newProject")}}>new project</li>
            </ul>
        </nav>
    )
}

export default NavBar
