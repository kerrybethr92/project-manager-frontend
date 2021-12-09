import React from 'react'

const NewProject = (props) => {
    let project = props.project
    return (
        <>
            <h2>Log a New Project</h2>
            <form id="newProject" onSubmit={props.handleNewProjectFormSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" onChange={props.handleNewNameChange}/><br/>

                <label htmlFor="description">Description: </label>
                <input type="text" name="description" onChange={props.handleNewDescriptionChange}/><br/>

                <label htmlFor="isComplete">Complete? </label>
                <input type="checkbox" name="isComplete" onChange={props.handleNewCompletionChange}/><br/>

                <label htmlFor="photo">Photo: </label>
                <input type="text" name="photo" onChange={props.handleNewPhotoChange}/><br/>

                <input id="submit" type="submit" value="Create Project"/>
            </form>
        </>
    )
}

export default NewProject
