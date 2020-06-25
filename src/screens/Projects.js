import React, {useEffect, useState} from 'react'
import SideBar from '../common/SideBar'
import "../styles/projects.css"
import classic from "../assets/images/preate.png"

function Projects() {
    const initialState = {
        isLoading: false,
        projects: [],
        notifications: [{type: "project", content: "You currently do not have any project, create new project to continue"}]
    };

    const [data, setdata] = useState(initialState)

    useEffect(() => {
      }, [])

      function goToCreate() {
        window.location.href = "/create-project"
      }

    return (
        <div className = "page">
            <SideBar active = {1} notifications = {data.notifications} />
            <div className = "project-view">
            <div className = "view-header">
            <div>Projects</div>
            </div>
                {data.projects.length > 1 
                ? <div></div> 
                : <div className = "project-empty">
                    <div onClick = {e => goToCreate()} className = "empty-content">
                        <img className = "middle" src = {classic} />
                        <div>
                            Create new project
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Projects
