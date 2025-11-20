import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import TickContext from "../contexts/TicketContex"

const Ticket = (props) => {

    const move = useContext(TickContext);

    function moveToDo() {
        move(props.status, "todo", props.id);
    }

    function moveInprogress() {
        move(props.status, "inprogress", props.id);
    }

    function moveDone() {
        move(props.status, "done", props.id);
    }

    return <Card style={{margin: "0.25rem"}}>
        <h2 style={{fontSize: "1.25rem"}}>{props.name}</h2>
        <sub>{props.author}</sub>
        <br/>
        <p>{props.description}</p>
        <Button onClick={moveToDo}>Move to TODO</Button>
        <Button onClick={moveInprogress} variant="secondary">Move to InProgress</Button>
        <Button onClick={moveDone} variant="success">Move to Done</Button>
    </Card>
}

export default Ticket;