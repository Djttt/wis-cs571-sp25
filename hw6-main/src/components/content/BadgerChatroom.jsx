import React, { useEffect, useState } from "react";
import {Row, Col, Pagination} from "react-bootstrap";
import BadgerMessage from "./BadgerMessage";

export default function BadgerChatroom(props) {

    const [page, setPage] = useState(1);
    const [messages, setMessages] = useState([]);
    // derived state

    const loadMessages = () => {
        fetch(`https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };


    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props, page]);

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO: Allow an authenticated user to create a post. */    
        }
        <hr/>
        {
            (messages && messages.length > 0) ?
                <>
                <Row>
                    {
                        /* TODO: Complete displaying of messages. */
                        messages.map(message => 
                            <Col key={message.id} xm={12} md={6} lg={4}>
                                <BadgerMessage {...message}></BadgerMessage>
                            </Col> 
                        )
                    }
                </Row>
                </>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }
            <Pagination>
                <Pagination.Item active={page === 1} onClick={() => setPage(1)}>1</Pagination.Item>
                <Pagination.Item active={page === 2} onClick={() => setPage(2)}>2</Pagination.Item>
                <Pagination.Item active={page === 3} onClick={() => setPage(3)}>3</Pagination.Item>
                <Pagination.Item active={page === 4} onClick={() => setPage(4)}>4</Pagination.Item>
            </Pagination>
    </>
}
