import React, {useState, useEffect} from 'react'
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Onefile from "../file"
import Uploader from '../../utils/upload'
import empty from '../../assets/images/nofile.png'
import folder from '../../assets/images/folder2.png'
import "../../styles/modals.css"
import { FolderGetWithHeaders } from '../../utils/Externalcalls';


function ModelListSelect(props) {
    const initialState = {
        isLoading: true,
        models: props.models,
        selectedmodels: [],
        folders: props.folders,
        newUpload: {},
        slected: {},
        pontFolder: {},
        folderSelected: false,
    };

    const [folderFiles, setfolderFiles] = useState([])

    const [data, setdata] = useState(initialState)


    useEffect(() => {
        console.log("MEEK", props)
    }, [])

    function getFiles() {
        FolderGetWithHeaders(`file/all/${data.pontFolder.id}`, {"token": JSON.parse(localStorage.getItem("token"))}).then(filesInFolder => {
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

    function styleselected(styleme) {
        if(data.pontFolder.id == styleme.id){
            var styleFolder = "one-folder-selected"
        }else{
            var styleFolder = "one-folder"
        }
        return styleFolder
    }

    function putpontFolder(selectedFold) {
        var newSelect = JSON.parse(JSON.stringify(selectedFold))
        setdata({...data, pontFolder: newSelect})
        // getFiles()
    }

    function showContent(){
        // setdata({...data, isloading: true})
        FolderGetWithHeaders(`file/all/${data.pontFolder.id}`, {"token": JSON.parse(localStorage.getItem("token"))}).then(filesInFolder => {
            setdata({...data, isloading: false, folderSelected: true})
            setfolderFiles(filesInFolder.data.data)
        }).catch(err => {
            setdata({...data, isloading: false})
        })
        // setdata({...data, folderSelected: true})

    }

    function backFolder() {
        setdata({...data, folderSelected: false})
    }

    return (
        <div className = "file-modal">
            <div className='file-modal-content'>
                    <div>
                        <div className = "file-modal-title">Select Models <div onClick = {props.cancel} className = "close-x">X</div></div>
                        <div className = "file-modal-inner-content-2">
                            {
                                data.models.map((item, index) => (
                                    <div onClick = {() => putpontFolder(item)} className = {styleselected(item)}>   
                                        <img src = {folder} />
                                        <div>
                                        {item.name}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div><button disabled = {data.isloading} onClick = {() => showContent()} className = "next-button">Next</button></div>
                        </div> 
                        </div>
        </div>
    )
}

export default ModelListSelect
