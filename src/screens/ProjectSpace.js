import React, {useState, useEffect} from 'react'
import {Steps, Carousel, Modal} from "antd"
import ConfirmModal from "../common/modals/simpleConfirm"
import SideBar from '../common/SideBar'
import Onefile from "../common/file"
import FileContent from "../common/modals/folderContent"
import "../styles/projects.css"
import services from "../assets/images/service2.png"
import cfolder from "../assets/images/folder2.png"

function ProjectSpace() {

    const initialState = {
        isLoading: false,
        title: null,
        description: null,
        notifications: [{type: "project", content: "You currently do not have any project, create new project to continue"}],
        ready: false,
        project: {id: "0001", title: "A real Project", desription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut ornare lectus sit amet est placerat. Scelerisque felis imperdiet proin fermentum leo. Pretium aenean pharetra magna ac. Mauris in aliquam sem fringilla ut morbi tincidunt. Est sit amet facilisis magna etiam tempor orci eu lobortis. Lectus urna duis convallis convallis tellus id interdum velit. Auctor elit sed vulputate mi sit amet mauris. Urna neque viverra justo nec ultrices dui sapien. Lacus laoreet non curabitur gravida arcu ac tortor dignissim convallis." },
        folders: [{id: "001", name: "Uploads", type: "system"}, {id: "002", name: "Results", type: "system"}, {id: "003", name: "Big data", type: "personal"}],
        frequentFiles: [{id: "01", name: "first-file", type: "excel", location: "https://unsplash.com/photos/cQ_dLrAUppw"}, {id: "02", name: "a-file", type: "json", location: "https://unsplash.com/photos/cQ_dLrAUppw"}, {id: "03", name: "object-file", type: "json", location: "https://unsplash.com/photos/cQ_dLrAUppw"}, {id: "04", name: "last-file", type: "excel", location: "https://unsplash.com/photos/cQ_dLrAUppw"}],
        openFolder: false,
        focusFolder: {}
    };

    const [data, setdata] = useState(initialState)

    useEffect(() => {
    }, [])

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
                    <div>Project: {data.project.title}</div>
                </div>
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
                        <div className = "access">Access</div>
                    </div>
                    <div className = "summary-row">
                        <div className = "process-entrance">
                            <img className = "mascot" src = {services} />
                            <div>Enter processes</div>
                        </div>
                        <div className = "project-description">{data.project.desription}</div>
                    </div>
                </div>
            </div>
            {
                data.openFolder ? <FileContent folder = {data.focusFolder} cancel = {() => closeModal()} /> : ""
            }
            </div>
    )
}

export default ProjectSpace
