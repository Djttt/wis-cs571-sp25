import React, { useContext, useState } from 'react';
import { Form, Button } from "react-bootstrap"
import { useNavigate } from 'react-router';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerRegister() {

    // TODO Create the register component.
    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");
    const [repeatPin, setRepeatPin] = useState("");
    const [pinError, setPinError] = useState("");

    const navigate = useNavigate();

    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    const register = (e) => {
        e.preventDefault();  // prevent flush
        
        const pinRegex = /^\d{7}$/;

        if (!pinRegex.test(pin) || !pinRegex.test(repeatPin)) {
            setPinError("Your pin must be a 7-digit number!");
            return;
        }
        if (!username || !pin) {
            alert("You must provide both a username and pin");
            return;
        }
        if (pin !== repeatPin) {
            setPinError("Your pins do not match!");
            alert("Your pins do not match!");
            return;
        }
        
        setPinError("");

        fetch("https://cs571.org/rest/s25/hw6/register", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                pin: pin
            })
        })
        .then(response => {
            if (response.status === 409) {
                alert("The user already exists!");
            } else if (response.status == 413) {
                alert("username must be 64 characters or fewer");
            } else if (response.status === 200) {
                alert("registration was successful");
                navigate("/");
                setLoginStatus(pre => pre=true);
                sessionStorage.setItem("loginStatus", JSON.stringify(true));
                sessionStorage.setItem("loginUsername", JSON.stringify(username));
            }
        });
    };

    return <>
        <h1>Register</h1>
        <Form onSubmit={register}>
            <Form.Group className='mb-3'>
                <Form.Label htmlFor='username'>Username</Form.Label>
                <Form.Control 
                    id='username'
                    type="text" value={username} onChange={e => {setUsername(e.target.value)}}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label htmlFor='pin'>Password</Form.Label>
                <Form.Control 
                    id='pin'
                    type="password" value={pin} onChange={e => {setPin(e.target.value)}}
                    isInvalid={pinError !== ""}
                ></Form.Control>

                <Form.Control.Feedback type="invalid">
                    {pinError}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label htmlFor='repeat-pin'>Repeat Password</Form.Label>
                <Form.Control 
                    id='repeat-pin'
                    type="password" value={repeatPin} onChange={e => {setRepeatPin(e.target.value)}}
                    isInvalid={pinError !== ""}  
                ></Form.Control>
            </Form.Group>

            <Button type="submit">Register</Button>
        </Form>
    </>
}
