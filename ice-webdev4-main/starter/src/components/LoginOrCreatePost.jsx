import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function LoginOrCreatePost(props) {
    
    // Note! You should use this in combination with sessionStorage.
    // Otherwise, when the user refreshes the page, it will go away!
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const usernameRef = useRef();
    const passwordRef = useRef();
    const commentRef = useRef();

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
                username: usernameRef.current.value,
                password: passwordRef.current.value
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
        fetch("https://cs571.org/rest/s25/ice/comments", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                comment: commentRef.current.value,
            })
        })
        .then(res => {
            if (res.status == 200) {
                alert("Successed! add a new commit!");
                props.refreshComments();
            } else {
                alert("Opps, something went wrong!");
            }
        });

    }

    function handleLogout() {
        // TODO POST to https://cs571api.cs.wisc.edu/rest/s25/ice/logout
        fetch("https://cs571.org/rest/s25/ice/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            }
        })
        .then(res => {
            if (res.status === 200) {
                alert("You have been logged out!");
                setIsLoggedIn(false);
            } else {
                 alert("Something went wrong! :/")
            }
        });
    }

    if (isLoggedIn) {
        return <>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
            <Form onSubmit={handleCommentSubmit}>
                <Form.Label htmlFor="commentInput">Your Comment</Form.Label>
                <Form.Control id="commentInput" ref={commentRef}></Form.Control>
                <br/>
                <Button type="submit" onClick={handleCommentSubmit}>Post Comment</Button>
            </Form>
        </>
    } else {
        return <Form onSubmit={handleLoginSubmit}>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control id="usernameInput" ref={usernameRef}></Form.Control>
            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <Form.Control id="passwordInput" type="password" ref={passwordRef}></Form.Control>
            <br/>
            <Button type="submit" onClick={handleLoginSubmit}>Login</Button>
        </Form>
    }
}