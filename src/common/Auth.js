import React, { useState, useEffect } from 'react'
import "../styles/auth.css"
import {postWithHeaders } from '../utils/Externalcalls'
import {notification, Button } from 'antd';
import { antdNotification } from './misc';
import { AuthenticationContext } from "../utils/reducer";


function Auth(props) {
    const { dispatch } = React.useContext(AuthenticationContext);

    useEffect(() => {
        console.log("MEEK", props)
    }, [])

    // initialize input identifiers
    const initialState = {
        identifier: "",
        password: "",
        user_name: "",
        email: "",
        isSubmitting: false,
        errorMessage: null,
        view: props.goto 
      };

    //   map identifiers into state
    const [data, setdata] = useState(initialState)
    // function to update state with input
    function handleChange (event) {
        setdata({
            ...data,
            [event.target.name]: event.target.value
          });
    }

    function toggle(change) {
        if(data.view !== change ) {
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
            if(done.data.status){
                antdNotification("success", "Registration Complete", "Welcome to your super-learner, kindly login to continue")
                setdata({...data, view: "login", password: ""})
                document.getElementById("login-form").reset();
            }else{
                setdata({...data, isSubmitting: false})
                antdNotification("error", "Sign-up Failed", "Check your internet connection and provide valid login information")
            }
        }).catch(error => {
            setdata({...data, isSubmitting: false})
            antdNotification("error", "Sign-up Failed", "Check your internet connection and provide valid login information")
        })
    }

    return (
        <div className = "gate">
            <div className = "entrance">
                <div onClick = {e => setdata({...data, view: "login"})} className = {toggle("login")}>Login</div>
                <div onClick = {e => setdata({...data, view: "signup"})} className = {toggle("signup")}>Sign-up</div>
            </div>
            <div className = "key">
            {
                data.view == "login" 
                ? 
                <div>
                    <form id = "login-form">
                    <input name = "identifier" onChange = {e => handleChange(e)} placeholder = "E-mail or Username" />
                    <input type = "password" name = "password" onChange = {e => handleChange(e)} placeholder = "Password" />
                    <button disabled = {data.isSubmitting} onClick = {login} className = "login-button">{data.isSubmitting ? "please wait..." : "Proceed"}</button>
                    </form>
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