import React from 'react'
/////// neeed to add 'wear', 'edit', and 'delete' buttons

const ProjectPage = (props) => {
    let project = props.project

    return (
        <>
            <img src={project.photo} alt={project.description}/>
            <h2>{project.name}</h2>
            <h3>
                {
                    (project.complete)?
                        'complete'
                        :
                        'in progress'
                }
            </h3>
            <p>{project.description}</p>
            <h3>Number of times worn: {project.wears}</h3>
        </>
    )
}

export default ProjectPage
