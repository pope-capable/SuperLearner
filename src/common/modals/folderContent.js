import React, {useState, useEffect} from 'react'
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Onefile from "../file"
import Uploader from '../../utils/upload'
import empty from '../../assets/images/nofile.png'
import "../../styles/modals.css"
import { FolderGetWithHeaders } from '../../utils/Externalcalls';


function FolderContent(props) {
    const initialState = {
        isLoading: true,
        files: [],
        folders: props.folders,
        newUpload: {},
        slected: {},
        folderSelected: false
    };

    const [data, setdata] = useState(initialState)


    useEffect(() => {
        console.log("MEEK", props.folders)
        // getFiles()
    }, [])

    function getFiles() {
        FolderGetWithHeaders(`file/all/${props.folder.id}`, {"token": JSON.parse(localStorage.getItem("token"))}).then(filesInFolder => {
            setdata({...data, files: filesInFolder.data.data, isloading: false})
        }).catch(err => {
            setdata({...data, isloading: false})
        })
    }

    function fileUploaded(newFile) {
        getFiles()
    }

    function getselectedLocation(location) {
        setdata({...data, slected: location})
        props.select(location)
    }


    return (
        <div className = "file-modal">
            <div className='file-modal-content'>
                {
                    !data.folderSelected ? 
                    <div>
                        <div className = "file-modal-title">Select Folder <div onClick = {props.cancel} className = "close-x">X</div></div>
                        <div className = "file-modal-inner-content">
                            {
                                data.folders.map((item, index) => (
                                    <div className = "one-folder">{item.name}</div>
                                ))
                            }
                        </div>
                        <div><button>Next</button></div>
                        </div> :
                    <div>
                        <div className = "file-modal-header">
                <div className = "file-modal-title">Folder: {data.folder.name}</div>
                    <div onClick = {props.cancel} className = "close-x">X</div>
                </div>
                <div>
                    {
                        data.files.length < 1 ?
                        <div className = "empty-folder">
                            <img src = {empty} />
                            <div>This folder is empty</div>
                        </div> :
                        <div className = "file-modal-body">
                            {data.files.map((item, index) => (
                                <Onefile file = {item} sendLocation = {getselectedLocation} selectedNeigbour = {data.slected.id}  />
                            ))}
                        </div>
                    }
                </div>
                {props.folder.name == "Uploads" ?
                <div className = "upload-button">
                    <Uploader fileMeta = {data.folder.id} updateFile = {fileUploaded} />
                </div> : 
                <div></div>}
                    </div>
                }
            </div>
        </div>
    )
}

export default FolderContent
