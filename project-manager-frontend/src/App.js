import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

import Banner from './components/Banner'
import NavBar from './components/NavBar'
import Card from './components/Card'
import ProjectPage from './components/ProjectPage'
import NewProject from './components/NewProject'
import EditProject from './components/EditProject'

const App = () => {

    const [newName, setNewName] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newPhoto, setNewPhoto] = useState('') //// put a default image url
    const [newIsComplete, setNewIsComplete] = useState(false)
    const [newWears, setNewWears] = useState(0)
    const [projects, setProjects] = useState([]);

    const [selectedProject, setSelectedProject] = useState({})
    const [currentPage, setCurrentPage] = useState('projectsIndex')

    useEffect(() => {
        axios
            .get('http://localhost:5165/projectitems')
            .then((response) => {
                setProjects(response.data)
            })
    },[])

    const handleNewNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNewDescriptionChange = (event) => {
        setNewDescription(event.target.value);
        console.log(newDescription);
    }

    const handleNewCompletionChange = (event) => {
        setNewIsComplete(event.target.checked)
    }

    const handleNewPhotoChange = (event) => {
        setNewPhoto(event.target.value);
    }
    // form handlers
    const handleNewProjectFormSubmit = (event) => {
        event.preventDefault();

        axios.post(
            'http://localhost:5165/projectitems',
            {
                name:newName,
                description:newDescription
            }
        ).then(() => {
            axios
                .get('http://localhost:5165/projectitems')
                .then((response) => {
                    setProjects(response.data)
                })
        })
    }

    // edit form handler
    const handleEditProjectFormSubmit = (event, entryData) => {
        event.preventDefault();
        axios
            .put(
                `http://localhost:5165/projectitems/${entryData.id}`,
                {
                    name:newName || entryData.name,
                    description:newDescription || entryData.description,
                    isComplete:entryData.isComplete.checked,
                    wears:newWears || entryData.wears,
                    photo:newPhoto || entryData.photo
                }
            ).then((response) => {
                setCurrentPage("projectPage")
                axios
                    .get(`http://localhost:5165/projectitems/${entryData.id}`)
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

    const handleShowProject = (id) => {
        axios
            .get(`http://localhost:5165/projectitems/${id}`)
            .then((response) => {
                setSelectedProject(response.data)
                setCurrentPage('projectPage')
            })
    }

    const handleShowEditPage = (event, id) => {
        event.stopPropagation()
        axios
            .get(`http://localhost:5165/projectitems/${id}`)
            .then((response) => {
                setSelectedProject(response.data)
                setCurrentPage('editProject')
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
    console.log(currentPage);

    return (
        <>
            <Banner/>
            <NavBar
                setCurrentPage={setCurrentPage}/>
            <main>
                {currentPage === 'projectsIndex' &&
                    <section id="cardContainer">
                        {
                            projects.map((project) => {
                                return <Card project={project} handleShowProject={handleShowProject} handleDelete={handleDelete}
                                handleShowEditPage={handleShowEditPage} />
                            })
                        }
                    </section>
                }
                {currentPage === 'projectPage' &&
                    <ProjectPage
                        project={selectedProject}/>
                }
                {currentPage === 'newProject' &&
                    <NewProject
                        handleNewProjectFormSubmit={handleNewProjectFormSubmit}
                        handleNewNameChange={handleNewNameChange}
                        handleNewDescriptionChange={handleNewDescriptionChange}
                        handleNewCompletionChange={handleNewCompletionChange}
                        handleNewPhotoChange={handleNewPhotoChange}/>
                }
                {currentPage === 'editProject' &&
                    <EditProject
                        project={selectedProject}
                        handleEditProjectFormSubmit={handleEditProjectFormSubmit}
                        handleNewNameChange={handleNewNameChange}
                        handleNewDescriptionChange={handleNewDescriptionChange}
                        handleNewCompletionChange={handleNewCompletionChange}
                        handleNewPhotoChange={handleNewPhotoChange} />
                }
            </main>
        </>
    );
}

export default App;
