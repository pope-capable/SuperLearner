import React, { useState, useEffect } from 'react'
import info from '../assets/images/info.png'
import file from '../assets/images/file.png'
import { Radio } from 'antd';
import { FolderGetWithHeaders, folderPostWithHeaders } from '../utils/Externalcalls';
import { antdNotification } from './misc';
import FolderContent from '../common/modals/folderContent';
import ConfirmModal from './modals/simpleConfirm'

function ModelsTabView(props) {

    return (
        <div>
            Models Tab View
        </div>
    )
}

export default ModelsTabView