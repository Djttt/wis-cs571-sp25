import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import TicketLane from './TicketLane'
import TickContext from "../contexts/TicketContex"

const TicketBoard = (props) => {

    const [ticketLanes, setTicketLanes] = useState({
        todo: [],
        inprogress: [],
        done: [],
    })

    useEffect(() => {
        fetch('https://cs571.org/rest/s25/ice/tickets', {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(ticketData => {
            console.log(ticketData);
            setTicketLanes({
                todo: ticketData,
                inprogress: [],
                done: []
            });
        })
    }, []);

    function move(from, to, id) {
        // TODO Remove the tickes
        console.log("MOVE", from, to, id)

        setTicketLanes(oldLanes => {
            let oldLane = oldLanes[from];
            let toLane = oldLanes[to];
            let ticket = oldLane.find(t => t.id === id);

            let newLanes = { ...oldLanes }
            newLanes[to] = [...toLane, ticket]
            newLanes[from] = oldLane.filter(t => t.id !== id);
            return newLanes;
        })
    }

    return <div>
        <h1>Ticket Board</h1>
        <TickContext.Provider value={move}>
            <Container fluid>
                {
                    Object.keys(ticketLanes).map(laneName => {
                        return <TicketLane 
                            key={laneName}
                            status={laneName}
                            tickets={ticketLanes[laneName]}
                        />
                    })
                }
            </Container>
        </TickContext.Provider>

    </div>
}

export default TicketBoard;