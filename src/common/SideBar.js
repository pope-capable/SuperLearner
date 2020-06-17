import React, { useState, useEffect } from 'react'
import { Progress, Avatar } from 'antd';
import "../styles/sidebar.css"
import { getWithHeaders } from '../utils/Externalcalls';

function SideBar() {


    const user = JSON.parse(localStorage.getItem("user"))
    // initialize state
    const initialState = {
        user: user,
        disk: {},
        user_name: "",
        email: "",
        isLoading: false,
        errorMessage: null
      };

      const [data, setdata] = useState(initialState)

      useEffect(() => {
        setdata({...data, isLoading: true})
        getWithHeaders(`disk/get-usage/${data.user.id}`, {"token": JSON.parse(localStorage.getItem("token"))}).then(diskUsage => {
            setdata({...data, disk: diskUsage.data.data, isLoading: false})
        })
      }, [])

    return (
        <div className = "sideBar">
            <div className = "user_details">
                <div className = "user-row">
                    <Avatar className = "avatar" size={50} src= {data.user.profile_picture} /> {data.user.email}
                </div>
                <div className = "mem-lab">Memory</div>
                <div className = "user-row-short">
                    <Progress showInfo = {false} strokeColor={{'0%': '#91d5ff', '100%': '#003a8c', }} percent={data.disk.percentageUsed}/>
                </div>
                {
                    console.log("MEEK", data.disk.diskRecord)
                }
                <div className = "mem-data">{data.isLoading ? "Analyzing memory usage..." : data.disk.percentageUsed + "% of storage exhausted"}</div>
            </div>
        </div>
    )
}

export default SideBar