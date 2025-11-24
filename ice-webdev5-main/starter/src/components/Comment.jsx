import { Card } from "react-bootstrap";
import memo from "react"

const Comment =  (props) => {

    console.log("I have rendered!")

    const createdDt = new Date(props.created);

    return <Card style={{margin: "0.5rem"}}>
        <p>{props.comment}</p>
        <p>Posted on {createdDt.toLocaleDateString()} at {createdDt.toLocaleTimeString()} by {props.author}</p>
    </Card>
}

export default memo(Comment);

