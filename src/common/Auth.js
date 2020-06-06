import React, { useState } from 'react'
import "../styles/auth.css"
import { simplePost } from '../utils/Externalcalls'

function Auth() {
    const [view, setview] = useState("signup")

    function toggle(change) {
        if(view !== change ) {
            return "inactive"
        }
    }

    function login() {
        simplePost().then(done => {
            
        })
    }

    return (
        <div className = "gate">
            <div className = "entrance">
                <div onClick = {e => setview("login")} className = {toggle("login")}>Login</div>
                <div onClick = {e => setview("signup")} className = {toggle("signup")}>Sign-up</div>
            </div>
            <div className = "key">
            {
                view == "login" 
                ? 
                <div>
                    <input placeholder = "E-mail or Username" />
                    <input placeholder = "Password" />
                    <button onClick = {login} className = "login-button">Proceed</button>
                </div> 
                : 
                <div>
                   <input placeholder = "Name" />
                    <input placeholder = "E-mail" />
                    <input placeholder = "Phone" />
                    <input placeholder = "Password" />
                    <input placeholder = "Confirm Password" />
                    <button className = "signup-button">Proceed</button>

                </div>
            }
            </div>
        </div>
    )
}

export default Auth