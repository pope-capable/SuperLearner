import React, { useState } from 'react'
import "../styles/auth.css"
import {postWithHeaders } from '../utils/Externalcalls'
import {notification, Button } from 'antd';
import { antdNotification } from './misc';
import { AuthenticationContext } from "../utils/reducer";


function Auth() {
    const { dispatch } = React.useContext(AuthenticationContext);
    const [view, setview] = useState("login")

    // initialize input identifiers
    const initialState = {
        identifier: "",
        password: "",
        user_name: "",
        email: "",
        isSubmitting: false,
        errorMessage: null
      };

    //   map identifiers into state
    const [data, setdata] = useState(initialState)
    // function to update state with input
    function handleChange (event) {
        setdata({
            ...data,
            [event.target.name]: event.target.value
          });
          console.log("MEEK", data)
    }

    function toggle(change) {
        if(view !== change ) {
            return "inactive"
        }
    }

    function login() {
        setdata({...data, isSubmitting: true})
        postWithHeaders("users/authenticate", data, {"secret_key": "99.99%_accuracy"}).then(done => {
            if(done.data.status){
                dispatch({type: "LOGIN", payload: done.data.data})
                antdNotification("success", "Welcome", "Welcome to your dashboard, continue from where you left off or create new activities")
                window.location.href = "/dashboard"
            }else{
                setdata({...data, isSubmitting: false})
                antdNotification("error", "Login Failed", "Check your internet connection and provide valid login information")
            }
        }).catch(error => {
            setdata({...data, isSubmitting: false})
            antdNotification("error", "Login Failed", "Check your internet connection and provide valid login information")
        })
    }

    function signUp() {
        setdata({isSubmitting: true})
        postWithHeaders("users/sign-up", data, {"secret_key": "99.99%_accuracy"}).then(done => {
            console.log("MEEK", done.data)
            if(done.data.status){
                antdNotification("success", "Registration Complete", "Welcome to your super-learner, kindly login to continue")
                setview("login")
                setdata(initialState)
            }else{
                setdata({isSubmitting: false})
                antdNotification("error", "Sign-up Failed", "Check your internet connection and provide valid login information")
            }
        }).catch(error => {
            console.log("MEEK", error)
            setdata({isSubmitting: false})
            antdNotification("error", "Sign-up Failed", "Check your internet connection and provide valid login information")
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
                    <input name = "identifier" onChange = {e => handleChange(e)} placeholder = "E-mail or Username" />
                    <input type = "password" name = "password" onChange = {e => handleChange(e)} placeholder = "Password" />
                    <button disabled = {data.isSubmitting} onClick = {login} className = "login-button">{data.isSubmitting ? "please wait..." : "Proceed"}</button>
                </div> 
                : 
                <div>
                   <input name = "user_name" onChange = {e => handleChange(e)} placeholder = "Username" />
                    <input name = "email" onChange = {e => handleChange(e)} placeholder = "E-mail" />
                    <input type = "password" name = "password" onChange = {e => handleChange(e)} placeholder = "Password" />
                    <input type = "password" placeholder = "Confirm Password" />
                    <button disabled = {data.isSubmitting} onClick = {signUp} className = "signup-button">{data.isSubmitting ? "please wait..." : "Proceed"}</button>

                </div>
            }
            </div>
        </div>
    )
}

export default Auth