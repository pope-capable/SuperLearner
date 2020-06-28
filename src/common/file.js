import React, { useState } from 'react'
import jsonIcon from "../assets/images/json.png"
import excelIcon from "../assets/images/excel.png"
import pdfIcon from "../assets/images/pdf.png"
import unknownIcon from "../assets/images/unknown.png"
import download from "../assets/images/down.png"
import $ from 'jquery';
import "../styles/file.css"

function Onefile(props) {

    function fittingIcon(data) {
        if(data == "json"){
            var bestIcon = jsonIcon
        }else if(data == "excel"){
            var bestIcon = excelIcon
        }else if(data == "pdf"){
            var bestIcon = pdfIcon
        }else{
            var bestIcon = unknownIcon
        }
        return bestIcon
    }

    function Download(url) {
        console.log("MEEK", url)
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        document.getElementById('my_iframe').src = url;
    }


    return (
        <div className = "one-file">
            <div className = "file-details">{props.file.name}</div>
            <div className = "file-img"><img src = {fittingIcon(props.file.type)}/></div>
            <div onClick = {e => {Download(props.file.location)}}><img className = "file-download" src = {download}/></div>
            <iframe id="my_iframe" style={{display: "none"}}></iframe>
        </div>
    )
}

export default Onefile