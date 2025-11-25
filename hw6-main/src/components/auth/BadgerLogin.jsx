import React, { useContext, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerLogin() {

    // TODO Create the login component.
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [pinError, setPinError] = useState("");
    
    const navigate = useNavigate(); 
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    const login = (e) => {
        e.preventDefault();

        const pinRegex = /^\d{7}$/;
        if (!pinRegex.test(usernameRef.current.value)) {
            setPinError("Your pin is a 7-digit number!");
        }

        if (!usernameRef.current.value || 
            !passwordRef.current.value) {
                alert("You must provide both a username and pin!");
        }

        setPinError("");
        
        fetch("https://cs571.org/rest/s25/hw6/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameRef.current.value,
                pin: passwordRef.current.value
            })
        })
        .then(res => {
            if (res.status === 401) {
                alert("Incorrect username or pin!");
            } else if (res.status === 200) {
                alert("Login was successful!");
                navigate("/");
                setLoginStatus(pre => pre=true);
                sessionStorage.setItem("loginStatus", JSON.stringify(true));
                sessionStorage.setItem("loginUsername", JSON.stringify(usernameRef.current.value));
            }
        });        
    }

    return <>
        <h1>Login</h1>
        <Form onSubmit={login}>
            <Form.Group className='mb-3'>
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control 
                    type='text'
                    ref={usernameRef}
                    id="username"
                    ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label htmlFor='password'>Password</Form.Label>
                <Form.Control type='password' ref={passwordRef}
                    id='password'
                    isInvalid={pinError !== ""}
                ></Form.Control>
                <Form.Control.Feedback type='invalid'>
                    {pinError}
                </Form.Control.Feedback>
            </Form.Group>

            <Button type='submit'>Login</Button>
        </Form>
    </>
}
