import { useContext } from "react"
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import BadgerBudSummary from "./BadgerBudSummary";
import { Row, Col } from "react-bootstrap";

export default function BadgerBudsAdoptable(props) {
    const { availableBuds, applyBuds } = useContext(BadgerBudsDataContext);

    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        <Row>
            {
                availableBuds.length > 0 ? 
                availableBuds.map(b => 
                    <Col xs={12} md={6} lg={4} key={b.id}>
                        <BadgerBudSummary {...b} apply={applyBuds} for={"adoptable"}></BadgerBudSummary>
                    </Col>    
                ) : <p>No buds are avaiable for adoption!</p>
            }
        </Row>
    </div>
}