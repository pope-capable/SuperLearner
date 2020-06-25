import React, {useState, useEffect} from 'react'
import image from "../../assets/images/confirm3.png"
import "../../styles/modals.css"


function SimpleConfirm(props) {


    useEffect(() => {
        console.log("MEEK", props)
    }, [])


    return (
        <div className = "modal">
            <div className='modal-content'>
                <div className = "modal-header">
                    <div className = "modal-title"><img src = {image} className = "modal-image" />Confirm action</div>
                    <div className = "close-x">X</div>
                </div>
                <div className = "modal-message">
                    {props.message}
                </div>
                <div className = "actions">
                    <button onClick = {props.cancel} className = "cancel">Cancel</button>
                    <button onClick = {props.confirm} className = "confirm">Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default SimpleConfirm
