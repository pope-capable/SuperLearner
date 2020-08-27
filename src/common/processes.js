import React, { useState, useEffect } from 'react'
import info from '../assets/images/info.png'
import file from '../assets/images/file.png'
import { Radio } from 'antd';
import { FolderGetWithHeaders, folderPostWithHeaders } from '../utils/Externalcalls';
import { antdNotification } from './misc';
import loadIcon from "../assets/images/load.gif"



function LiveProcesses(props) {

    const initialState = {
        projectId: props.project,
        processes: [],
        loading: true
      };

    useEffect(() => {
        getProcesses()
    }, [])

    //   map identifiers into state
    const [data, setdata] = useState(initialState)

    function classProcesses (status) {
        if(status == "Completed"){
            var right = "ptc-c"
        }else if(status == "Running..."){
            var right = "ptc"
        }else {
            var right = "ptc-f"
        }
        return right
    }

    function getProcesses() {
        setdata({...data, loading: true})
        FolderGetWithHeaders(`process/all/${props.project}`, {"token": JSON.parse(localStorage.getItem("token"))}).then(processesLive => {
            setdata({...data, processes: processesLive.data.data, loading: false})
        }).catch(error => {
            antdNotification("error", "Fetch Failed", "Error fetching processes, please ensure a stable connection and reload screen")
        })
    }

    function Download(url) {
        document.getElementById("my_iframe").src = url;
      }

    return(
        <div className = "dpp-view">
            <div className = "switch-model-view">
                <button className = "refresh-button" onClick = {() => getProcesses()}>
                    Refresh
                </button>
            </div>
            {
                data.loading ?
                <div className = "loader-container">
                    <img className = "loader-image" src = {loadIcon} />
                </div> :
                <div>
            {
                data.processes.map((item, index) => (
                    <div className = {classProcesses(item.status)}>
                        <div className = "model-info">
                            {item.name}
                            <div>
                                {item.status}
                            </div>
                            <div className = "reason">{item.failure_reason}</div>
                            <div>{item.type}</div>
                        </div>
                        <div>
                            {
                                item.status == "Completed" && item.files_main ? 
                                <button className = "predict-button" onClick = {() => Download(item.files_main.location)}>
                                Download
                                </button> :
                                ""
                            }
                        </div>
                    </div>
                ))
            }
            </div>
}
                  <iframe id="my_iframe" style={{ display: "none" }}></iframe>
        </div>
    )
}

export default LiveProcesses