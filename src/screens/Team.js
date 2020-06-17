import React, {useEffect, useState} from 'react'
import SideBar from '../common/SideBar'
import "../styles/teams.css"
import { getWithHeaders } from '../utils/Externalcalls';

function Teams() {
    const user = JSON.parse(localStorage.getItem("user"))

    // initialize state
    const initialState = {
        user: user,
        isLoading: false,
        teams: {}
    };

    const [data, setdata] = useState(initialState)

    useEffect(() => {
        setdata({...data, isLoading: true})
        getWithHeaders(`user-teams/get-joined/${data.user.id}`, {"token": JSON.parse(localStorage.getItem("token"))}).then(joinedTeams => {
            console.log("MEEk", joinedTeams)
            setdata({...data, teams: joinedTeams.data.data, isLoading: false})
        }).catch(error => {
            console.log("MEEK", error)
        })
      }, [])

    return (
        <div className = "page">
            <SideBar active = {5} />
            <div className = "team-view">
                <div className = "view-header">
                    Teams
                </div>
                Teams
            </div>
        </div>
    )
}

export default Teams
