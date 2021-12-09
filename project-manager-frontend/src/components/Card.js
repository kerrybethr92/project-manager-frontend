import React from 'react'

const Card = (props) => {
    let project = props.project

    return (
        <div className="projectCard" id={project.id} key={project.id} onClick={()=>props.handleShowProject(project.id)}>
            <h3>{project.name}</h3>
            <img src={project.photo} alt={project.description} /><br/>
            <button onClick={(event)=> {props.handleShowEditPage(event, project.id)}}>Edit</button>
            <button onClick={()=> {props.handleDelete(project)}}>Delete</button>
        </div>
    )
}

export default Card
