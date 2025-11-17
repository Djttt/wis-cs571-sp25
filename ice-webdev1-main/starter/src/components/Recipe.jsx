import { useState } from "react";
import { Button, Card } from "react-bootstrap";

export default function Recipe(props) {
    
    const [likes, setLikes] = useState(0)

    function handleLike() {
        setLikes(oldValue => oldValue + 1);
        setLikes(oldValue => oldValue + 1); 
    }


    return <div>
        <h2>{props.name}</h2>
        <p>by {props.author}</p>
        <p>{likes} likes</p>
        <Button onClick={handleLike} >Like this Recipe</Button>
    </div>
} 