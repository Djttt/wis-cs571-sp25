import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function LoginOrCreatePost(props) {
    
    // Note! You should use this in combination with sessionStorage.
    // Otherwise, when the user refreshes the page, it will go away!
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function handleLoginSubmit(e) {
        e?.preventDefault();  // prevents default form submit action

        // TODO: POST to https://cs571api.cs.wisc.edu/rest/s25/ice/login
        fetch("https://cs571.org/rest/s25/ice/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },                     
            body: JSON.stringify({
                username: userName,
                password: password
            })
        })
        .then(res => {
            if (res.status === 401) {
                alert("Invalid username or password");
            } else {
                alert("Successfully logged in!");
                setIsLoggedIn(true);
            }
        });
    }

    function handleCommentSubmit(e) {
        e?.preventDefault(); // prevents default form submit action
        
        // TODO: POST to https://cs571api.cs.wisc.edu/rest/s25/ice/comments
    }

    function handleLogout() {
        // TODO POST to https://cs571api.cs.wisc.edu/rest/s25/ice/logout
    }

    if (isLoggedIn) {
        return <>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
            <Form onSubmit={handleCommentSubmit}>
                <Form.Label htmlFor="commentInput">Your Comment</Form.Label>
                <Form.Control id="commentInput"></Form.Control>
                <br/>
                <Button type="submit" onClick={handleCommentSubmit}>Post Comment</Button>
            </Form>
        </>
    } else {
        return <Form onSubmit={handleLoginSubmit}>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control id="usernameInput" value={userName} onChange={e => setUserName(e.target.value)}></Form.Control>
            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <Form.Control id="passwordInput" type="password" value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
            <br/>
            <Button type="submit" onClick={handleLoginSubmit}>Login</Button>
        </Form>
    }
}