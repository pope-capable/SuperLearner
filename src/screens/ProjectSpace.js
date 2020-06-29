import React, {useState, useEffect} from 'react'
import {Steps, Carousel, Modal} from "antd"
import ConfirmModal from "../common/modals/simpleConfirm"
import SideBar from '../common/SideBar'
import Onefile from "../common/file"
import FileContent from "../common/modals/folderContent"
import "../styles/projects.css"
import services from "../assets/images/service2.png"
import cfolder from "../assets/images/folder2.png"
import working from "../assets/images/work2.svg"
import { projectGetWithHeaders } from '../utils/Externalcalls'
import loadIcon from "../assets/images/load.gif"
import { antdNotification } from '../common/misc';


function ProjectSpace(props) {

    const initialState = {
        isLoading: true,
        title: null,
        description: null,
        notifications: [{type: "project", content: "You currently do not have any project, create new project to continue"}],
        ready: false,
        project: {},
        folders: [{id: "001", name: "Uploads", type: "system"}, {id: "002", name: "Results", type: "system"}, {id: "003", name: "Big data", type: "personal"}],
        frequentFiles: [{id: "01", name: "first-file", type: "excel", location: "https://unsplash.com/photos/cQ_dLrAUppw"}, {id: "02", name: "a-file", type: "json", location: "https://unsplash.com/photos/cQ_dLrAUppw"}, {id: "03", name: "object-file", type: "json", location: "https://unsplash.com/photos/cQ_dLrAUppw"}, {id: "04", name: "last-file", type: "excel", location: "https://unsplash.com/photos/cQ_dLrAUppw"}],
        openFolder: false,
        focusFolder: {}
    };

    const [data, setdata] = useState(initialState)

    useEffect(() => {
        projectDetail()
    }, [])

    // function to get project detail
    function projectDetail () {
        projectGetWithHeaders(`project/detail/${props.match.params.slug}`, {"token": JSON.parse(localStorage.getItem("token"))}).then(projectDetails => {
            console.log("MEEK", projectDetails.data.data.description)
            setdata({...data, project: projectDetails.data.data, isLoading: false})
        }).catch(error => {
            antdNotification("error", "Fetch Failed", "Error fetching project details, please reload screen")
        })
    }

    // function to enter a project
    function enterProject() {
        window.location.href = `/project/${data.project.id}/${data.project.title}`
    }

    // function to update state with input
    function handleChange (event) {

    }

    function folderStyle (type) {
        if(type == "system"){
            var useStyle = "system-folder"
        }else{
            var useStyle = "user-folder"
        }
        return useStyle
    }

    function openFolder(folder) {
        setdata({...data, focusFolder: folder, openFolder: true})
    }

    function closeModal() {
        setdata({...data, openFolder: false})
    }

    return (
        <div className = "page">
            <SideBar active = {1} notifications = {data.notifications} />
            <div className = "project-view">
                <div className = "view-header">
                    <div>Project: {data.isLoading ? "fetching project information" : data.project.title}</div>
                </div>
                {
                data.isLoading ?
                <div className = "loader-container">
                    <img className = "loader-image" src = {loadIcon} />
                </div> : 
                <div className = "project-summary">
                <div className = "summary-row">
                        <div className = "folders">
                            <div className = "folders-view">
                                <div>Folders</div>
                                {data.folders.map((item, index) => (
                                    <div className = {folderStyle(item.type)} onClick = {e => openFolder(item)}>
                                        <img src = {cfolder} className = "c-folder" />{item.name}
                                    </div>
                                ))}
                            </div>
                            <div className = "frequent-view">
                                <div>Recent Files</div>
                                <div className = "frequent-view-content">
                                {data.frequentFiles.map((item, index) => (
                                    <Onefile file = {item}  />
                                ))}
                                </div>
                            </div>
                        </div>
                        <div className = "access">
                            <img className = "mascot" src = {working} />
                            <div>Access management under development</div>
                        </div>
                    </div>
                    <div className = "summary-row">
                        <div className = "process-entrance" onClick = {e => enterProject()}>
                            <img className = "mascot" src = {services} />
                            <div>Enter processes</div>
                        </div>
                        <div className = "project-description">{data.project.description}</div>
                    </div>
                </div>
            }
            </div>
            {
                data.openFolder ? <FileContent folder = {data.focusFolder} cancel = {() => closeModal()} /> : ""
            }
            </div>
    )
}

export default ProjectSpace
