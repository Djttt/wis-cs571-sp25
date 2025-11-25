import React, { useEffect, useRef, useState, useContext } from "react";
import { Row, Col, Pagination, Form, Button } from "react-bootstrap";
import BadgerMessage from "./BadgerMessage";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerChatroom(props) {

    const [page, setPage] = useState(1);
    const [messages, setMessages] = useState([]);
    // derived state

    const postTitleRef = useRef();
    const postContentRef = useRef();

    const [logingStatus, setLoginStatus, loginUsername] = useContext(BadgerLoginStatusContext);

    const loadMessages = () => {
        fetch(`https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
            console.log(messages);
        })
    };

    const createPost = (e) => {
        e.preventDefault();

        const postTitle = postTitleRef.current.value;
        const postContent = postContentRef.current.value;

        // santity check!
        if (!postTitle || !postContent) {
            alert("You must provide both a title and content!");
            return;
        }

        fetch(`https://cs571.org/rest/s25/hw6//messages?chatroom=${props.name}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: postTitle,
                content: postContent
            })
        })
        .then(res => {
            if (res.status === 200) {
                loadMessages();
                alert("Successfully posted!");
            }
        });
    }

    const deletePost = (e, messageId) => {
        e.preventDefault();

        fetch(`https://cs571.org/rest/s25/hw6/messages?id=${messageId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },
        })
        .then(res => {
            if (res.status === 200) {
                loadMessages();
                alert("Successfully deleted message!");
            }
        });
    }


    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props, page]);

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO: Allow an authenticated user to create a post. */    
            logingStatus ? <Col xm={12} md={6} lg={4}>
                <Form onSubmit={createPost}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="post-title">Post Title</Form.Label>
                        <Form.Control type="text" ref={postTitleRef}
                            id="post-title"    
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="post-content">Post Content</Form.Label>
                        <Form.Control type="text" ref={postContentRef}
                            id="post-content"
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type="submit">Create Post</Button>
                </Form>
             </Col> :
             <h4>You must be logged in to post!</h4>
        }
        <hr/>
        <Row>
        {
            (messages && messages.length > 0) ?
                <>
                    {
                        /* TODO: Complete displaying of messages. */
                        messages.map(message => 
                            <Col key={message.id} xm={12} md={6} lg={4}>
                                <BadgerMessage {...message} username={loginUsername} deletePost={deletePost}></BadgerMessage>
                            </Col> 
                        )
                    }
                
                </>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }
        </Row>
        <Pagination>
            <Pagination.Item active={page === 1} onClick={() => setPage(1)}>1</Pagination.Item>
            <Pagination.Item active={page === 2} onClick={() => setPage(2)}>2</Pagination.Item>
            <Pagination.Item active={page === 3} onClick={() => setPage(3)}>3</Pagination.Item>
            <Pagination.Item active={page === 4} onClick={() => setPage(4)}>4</Pagination.Item>
        </Pagination>
    </>
}
