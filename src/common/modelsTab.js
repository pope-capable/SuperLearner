import React, { useState, useEffect } from 'react'
import info from '../assets/images/info.png'
import file from '../assets/images/file.png'
import { Radio } from 'antd';
import { FolderGetWithHeaders, folderPostWithHeaders } from '../utils/Externalcalls';
import { antdNotification } from './misc';
import FolderContent from '../common/modals/folderContent';
import ConfirmModal from './modals/simpleConfirm'
import {Switch} from 'antd'

function ModelsTabView(props) {
    const initialState = {
        misingDataPercentage: 0,
        openFolder: false,
        uploads: null,
        useFile: {},
        location: "",
        studyId: "",
        outcomeId: "",
        outcome: "",
        showConfirm: false,
        showCreated: false,
        projectId: props.project,
        value: null,
        type: "model"
      };

          //   map identifiers into state
    const [data, setdata] = useState(initialState)

    useEffect(() => {
        getFolders()
    }, [])

    function selectFile(dot) {
        setdata({...data, useFile: dot, location: dot.location})
    }

    function closeModal(){
        setdata({...data, openFolder: false, showConfirm: false})
    }

    function openUploads() {
        setdata({...data, openFolder: true})
    }

    function getFolders() {
        FolderGetWithHeaders(`folders/project/${props.project}`, {"token": JSON.parse(localStorage.getItem("token"))}).then(foldersCreated => {
            setdata({...data, uploads: foldersCreated.data.data})
        }).catch(error => {
            antdNotification("error", "Fetch Failed", "Error fetching folders, please ensure a stable connection and reload screen")
        })
    }

    function createModel() {
        folderPostWithHeaders("process/create", data, {"token": JSON.parse(localStorage.getItem("token"))}).then(projectCreated => {
            antdNotification("success", "Success", projectCreated.data.message)
            window.location.reload()
        }).catch(error => {
            antdNotification("error", "Project Creation Failed", error.message)
            setdata({...data, showConfirm: false})
        })
    }

    function handleChange(event) {
        setdata({
            ...data,
            [event.target.name]: event.target.value
          });
    }

    function confirmCreation() {
        setdata({...data, showConfirm: true})
    }

    function onChange(checked) {
        setdata({...data, showCreated: checked})
    }


    return (
        <div>
            <div className = "switch-model-view">
            Switch to created models <Switch defaultChecked = {false} onChange={onChange} />
            </div>
            {
                data.showCreated ?
                <div>

                </div> : 
                <div className = "dpp-view">
            <div className = "dpp-row">
                <div className = "dpp-sf">
                    <div className = "activity-title-mid"> 
                        <span className="input-tag">Output name</span>
                        <input onChange = {e => handleChange(e)} name = "output" className = "custom-input" prefix = "Runner" />
                    </div>
                    <img onClick = {e => openUploads()} className = "cloud-image" src = {file} /> select file from upload folders
                </div>
            </div>
            <div>
                {
                    data.location ? 
                    <div>                
                        File selected: {data.useFile.name}
                    </div> : ""
                }
            </div>
            <div className = "dpp-row">
                <div className = "dpp-sf">
                    <div className = "activity-title-mid"> 
                        <select onChange = {e => handleChange(e)} name = "value">
                            <option selected="selected">Select Script Type</option>
                            <option value = {11}>Linear SVM</option>
                            <option value = {12}>Pre-school Model</option>
                        </select>
                    </div>
                    <div className = "activity-title-mid"> 
                        <span className="input-tag">Study Id</span>
                        <input onChange = {e => handleChange(e)} name = "studyId" className = "custom-input" prefix = "Runner" />
                    </div>
                    <div className = "activity-title-mid"> 
                        <span className="input-tag">Outcome ID</span>
                        <input onChange = {e => handleChange(e)} name = "outcomeId" className = "custom-input" prefix = "Runner" />
                    </div>
                </div>
            </div>
            <div className = "dpp-row">
                <button onClick = {e => confirmCreation()} className = "proceed-button-2">Next</button>
            </div>
            {
                data.openFolder ? <FolderContent select = {selectFile} folders = {data.uploads} cancel = {() => closeModal()} /> : ""
            }
            {
                data.showConfirm ? <ConfirmModal cancel = {() => closeModal()} confirm = {() => createModel()} message = {"Confirm project creation, this will affect your available disk space as new file directories will be created"}/> : ""
            }
        </div>            }
        </div>
    )
}

export default ModelsTabView