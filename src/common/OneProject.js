import React, {useState, useEffect} from 'react'
import "../styles/common.css"
import enter from "../assets/images/enter.png"

function OneProject(props) {
        // initialize input identifiers
        const initialState = {
            isSubmitting: false
          };
    
        //   map identifiers into state
        const [data, setdata] = useState(initialState)

    useEffect(() => {
      }, [])

    // function to enter a project
    function enterProject(projectId) {
        window.location.href = `/project-space/${projectId}`
    }

    return (
        <div className = "ptc">
            <div className = "team-name">
                {props.oneProject.project.title} <img onClick = {e => enterProject(props.oneProject.project.id)} className = "enter-icon" src = {enter} />
            </div>
            <div>Created at {Date(props.oneProject.createdAt)}</div>
        </div>
    )
}

export default OneProject
