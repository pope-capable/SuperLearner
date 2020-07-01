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
        folder: props.folder,
        newUpload: {},
    };

    const [data, setdata] = useState(initialState)


    useEffect(() => {
        getFiles()
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


    return (
        <div className = "file-modal">
            <div className='file-modal-content'>
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
                                <Onefile file = {item}  />
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
        </div>
    )
}

export default FolderContent
