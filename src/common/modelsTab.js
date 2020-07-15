import React, { useState, useEffect } from 'react'
import info from '../assets/images/info.png'
import file from '../assets/images/file.png'
import { Radio } from 'antd';
import { FolderGetWithHeaders, folderPostWithHeaders } from '../utils/Externalcalls';
import { antdNotification } from './misc';
import FolderContent from '../common/modals/folderContent';
import ConfirmModal from './modals/simpleConfirm'

function ModelsTabView(props) {
    const initialState = {
        misingDataPercentage: 0
      };

    useEffect(() => {
    }, [])

    //   map identifiers into state
    const [data, setdata] = useState(initialState)


    return (
        <div className = "dpp-view">
            <div className = "dpp-row">
                <div className = "dpp-sf">
                    <div className = "activity-title-mid"> 
                        <span className="input-tag">Output name</span>
                        <input name = "output" className = "custom-input" prefix = "Runner" />
                    </div>
                    <img className = "cloud-image" src = {file} /> select file from upload folders
                </div>: 
            </div>
            <div>
                {
                    data.location ? 
                    <div>                
                        File selected: {data.useFile.name}
                    </div> : ""
                }
            </div>
            {
                data.openFolder ? <FolderContent /> : ""
            }
            {
                data.showConfirm ? <ConfirmModal /> : ""
            }
        </div>
    )
}

export default ModelsTabView