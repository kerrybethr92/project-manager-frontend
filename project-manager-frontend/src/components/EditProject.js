import React from 'react'

const EditProject = (props) => {
    let project = props.project

    return (
        <>
            <h2>Edit a Project</h2>
            <form id="editProject" onSubmit={(event)=> {props.handleEditProjectFormSubmit(event, project)}}>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" value={project.name} onChange={props.handleNewNameChange}/><br/>

                <label htmlFor="description">Description: </label>
                <input type="text" name="description"  onChange={props.handleNewDescriptionChange}/><br/>

                <label htmlFor="isComplete">Complete? </label>
                <input type="checkbox" name="isComplete" onChange={props.handleNewCompletionChange}/><br/>

                <label htmlFor="photo">Photo: </label>
                <input type="text" name="photo" value={project.photo} onChange={props.handleNewPhotoChange}/><br/>

                <input id="submit" type="submit" value="Submit Edit"/>
            </form>
        </>
    )
}

export default EditProject
