import React, {useState, useEffect} from 'react'
import Onefile from "../file"
import "../../styles/modals.css"


function FolderContent(props) {
    const initialState = {
        isLoading: true,
        files: [],
        folder: props.folder
    };

    const [data, setdata] = useState(initialState)


    useEffect(() => {
        console.log("MEEK", props)
        getFiles()
    }, [])

    function getFiles() {
        setTimeout(() => {
            setdata({...data, isloading: false, files: [{id: "01", name: "first-file", type: "excel", location: "https://unsplash.com/photos/cQ_dLrAUppw"}, {id: "02", name: "a-file", type: "json", location: "https://unsplash.com/photos/cQ_dLrAUppw"}, {id: "03", name: "object-file", type: "json", location: "https://unsplash.com/photos/cQ_dLrAUppw"}, {id: "04", name: "last-file", type: "excel", location: "https://unsplash.com/photos/cQ_dLrAUppw"},{id: "01", name: "first-file", type: "excel", location: "https://unsplash.com/photos/cQ_dLrAUppw"}, {id: "02", name: "a-file", type: "json", location: "https://unsplash.com/photos/cQ_dLrAUppw"}, {id: "03", name: "object-file", type: "json", location: "https://unsplash.com/photos/cQ_dLrAUppw"}, {id: "04", name: "last-file", type: "excel", location: "https://unsplash.com/photos/cQ_dLrAUppw"},{id: "01", name: "first-file", type: "excel", location: "https://unsplash.com/photos/cQ_dLrAUppw"}, {id: "02", name: "a-file", type: "json", location: "https://unsplash.com/photos/cQ_dLrAUppw"}, {id: "03", name: "object-file", type: "json", location: "https://unsplash.com/photos/cQ_dLrAUppw"}, {id: "04", name: "last-file", type: "excel", location: "https://unsplash.com/photos/cQ_dLrAUppw"}]})
        }, 300);
    }


    return (
        <div className = "file-modal">
            <div className='file-modal-content'>
            <div className = "file-modal-header">
                <div className = "file-modal-title">Folder: {data.folder.name}</div>
                    <div onClick = {props.cancel} className = "close-x">X</div>
                </div>
                <div className = "file-modal-body">
                {data.files.map((item, index) => (
                    <Onefile file = {item}  />
                ))}
                </div>
            </div>
        </div>
    )
}

export default FolderContent
