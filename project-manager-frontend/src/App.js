import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {

    const [newName, setNewName] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [projects, setProjects] = useState([]);
///////// ~~~~~~~~~~~~~~~ need to change get route ~~~~~~~~~ /////////
    useEffect(() => {
        axios
            .get('http://localhost:5165/projects')
            .then((response) => {
                setProjects(response.data)
            })
    },[])

    const handleNewNameChange = (event) => {

        setNewName(event.target.value);
    }

    const handleNewDescriptionChange = (event) => {
        setNewDescription(event.target.value);
    }
    // form handler
    const handleNewProjectFormSubmit = (event) => {
        event.preventDefault();

        ///////// ~~~~~~~~~~~~~~~ need to change post route ~~~~~~~~~ /////////
        axios.post(
            'http://localhost:5165/projects',
            {
                name:newName,
                description:newDescription
            }
        ).then(() => {
            axios
                .get('http://localhost:5165/projects')
                .then((response) => {
                    setProjects(response.data)
                })
        })
    }

    const handleDelete = (projectData) => {
        axios
            .delete(`http://localhost:5165/projects/${projectData._id}`)
            .then(() => {
                axios
                    .get('http://localhost:5165/projects')
                    .then((response) => {
                        setProjects(response.data)
                    })
            })
    }

    // const handleToggleComplete = (todoData) => {
    //     axios
    //         .put(
    //             `http://localhost:3000/todos/${todoData._id}`,
    //             {
    //                 description:todoData.description,
    //                 complete:!todoData.complete
    //             }
    //         )
    //         .then(() => {
    //             axios
    //                 .get(`http://localhost:3000/todos`)
    //                 .then((response) => {
    //                     setTodos(response.data)
    //                 })
    //         })
    // }

    return (
        <main>
            <h1>Projects List</h1>
            <section>
                <h2>Create a Project</h2>
                <form>
                    Name: <input type="text" onChange={handleNewNameChange}/><br/>
                    Description: <input type="text" onChange={handleNewDescriptionChange}/><br/>
                    <input type="submit" value="Create Project"/>
                </form>
            </section>
            <section>
                <h2>Projects</h2>
                <ul>
                    {
                        projects.map((project)=>{
                            return <li key={project._id}> // add an onClick to open modal or something //
                                <b>project.name</b> <br />
                                project.description
                                <button onClick={()=> {handleDelete(project)}}>Delete</button>
                            </li>
                        })
                    }
                </ul>
            </section>
        </main>
    );
}

export default App;
