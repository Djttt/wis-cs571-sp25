import { useContext, useEffect } from "react"
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import BadgerBudSummary from "./BadgerBudSummary";
import { Row, Col } from "react-bootstrap";

export default function BadgerBudsBasket(props) {
    const {savedBuds, applyBuds} = useContext(BadgerBudsDataContext);

    return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        <Row>
            {   
                savedBuds.length > 0 ? 
                savedBuds.map(b => 
                    <Col xs={12} md={6} lg={4} key={b.id}>
                        <BadgerBudSummary {...b}  for={"basket"} apply={applyBuds}></BadgerBudSummary>
                    </Col>    
                ) : <p>You have no buds in your basket!</p>
            }
        </Row>
    </div>
}