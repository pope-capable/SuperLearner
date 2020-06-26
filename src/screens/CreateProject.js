import React, {useState, useEffect} from 'react'
import {Steps, Carousel, Modal} from "antd"
import ConfirmModal from "../common/modals/simpleConfirm"
import SideBar from '../common/SideBar'
import "../styles/projects.css"
import classic from "../assets/images/preate.png"
import CheckableTag from 'antd/lib/tag/CheckableTag'


function CreateProject() {

    const initialState = {
        isLoading: false,
        title: null,
        description: null,
        notifications: [{type: "project", content: "You currently do not have any project, create new project to continue"}],
        ready: false,
        showConfirm: false
    };

    const [data, setdata] = useState(initialState)

    useEffect(() => {
    }, [])


    function confirmCreation() {
        setdata({...data, showConfirm: true})
    }

    function closeModal() {
        setdata({...data, showConfirm: false})
    }

    function createProject() {
        window.location.href = `/project-space/${"0001"}`
    }
    // function to update state with input
    function handleChange (event) {
        setdata({
            ...data,
            [event.target.name]: event.target.value
          });
            if(data.title && data.description){
                setdata({
                    ...data,
                    ready: true
                  });
              }
    }

    return (
        <div className = "page">
            <SideBar active = {1} notifications = {data.notifications} />
            <div className = "project-view">
            <div className = "view-header">
            <div>Projects</div>
            </div>
                    <div className = "project-create-view">
                        <div className = "activity-title">
                            <img className = "flag" src = {classic} />
                            <div>
                                Create new project
                            </div>
                        </div>
                                <div>
                                    <div className = "activity-title-mid"> 
                                    <span class="input-tag">Project Title</span>
                                    <input name = "title" onChange = {e => handleChange(e)} className = "custom-input" prefix = "Runner" />
                                    </div>
                                    <div className = "activity-title-2"> 
                                        <span class="input-tag-textarea">Project Description</span>
                                        <textarea name = "description" onChange = {e => handleChange(e)} className = "custom-textarea" prefix = "Runner" />
                                    </div>
                                    <div>
                                        {
                                            data.ready ? <button onClick = {e => confirmCreation()} className = "proceed-button">Next</button> : "Fill details to continue"
                                        }
                                    </div>
                                </div>
                                {
                                    data.showConfirm ? <ConfirmModal cancel = {() => closeModal()} confirm = {() => createProject()} message = {"Confirm project creation, this will affect your available disk space as new file directories will be created"} /> : ""
                                }
                    </div>
            </div>
            </div>
    )
}

export default CreateProject