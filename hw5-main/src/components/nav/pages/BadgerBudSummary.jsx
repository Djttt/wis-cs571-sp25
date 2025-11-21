import { Button, Container, Carousel } from "react-bootstrap";
import { useState, useContext } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";

export default function BadgerBudSummary(props) {
    const defaultImgSrc = "https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/";

    const [shownBtnCtl, setShownBtnCtl] = useState(false);


    function showBtnToggle() {
        setShownBtnCtl((pre) => !pre);
    }

    function saveBuddy(name, id) {
        alert(`${name} has been added to your basket!`);
        props.apply("save", id);
    }

    function unsaveBuddy(name, id) {
        alert(`${name} has been removed to your basket!`);
        props.apply("remove", id);
    }

    function adoptedCommit(name, id) {
        alert(`${name} has been adopted!`);
        props.apply("adopted", id);
    }

    return <Container>
        <div style={{
                    aspectRatio: "1 / 1 ",
                    border: "1px solid gray",
                    borderRadius: "8px",
                    padding: "8px"
                }} 
                className="me-3 mb-3"
        >   
            {
                !shownBtnCtl ?  <img src={defaultImgSrc + props.imgIds[0]}
                                    alt={`a picture of ${props.name}`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover" 
                                        }}
                                > 
                                </img> :            
                                <Carousel>
                                    {
                                        props.imgIds.map(imgId => 
                                            <Carousel.Item key={imgId}>
                                                <img src={defaultImgSrc + imgId}
                                                    alt={`a picture of ${props.name}`}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover" 
                                                        }}
                                                > 
                                                </img>    
                                            </Carousel.Item>
                                        )
                                    }
                                </Carousel>
            }

            <div>
                <h3 className="catName">{props.name}</h3>
                {
                    shownBtnCtl && (<div className="catDiscription">
                        <h5>{props.gender}</h5>
                        <p>{props.breed}</p>
                        <p>{props.age}</p>
                        <p>{props.description??"No more description!"}</p>
                    </div>)
                }
                
            </div>

            <div style={{
                border: "1px solid gray",
                padding: "8px"
            }}
            >   
                {   
                    props.for === "adoptable" ?
                    <Button className="me-2" onClick={showBtnToggle}>{shownBtnCtl? "Show less": "Show more"}</Button> :
                    <Button className="me-2" onClick={() => unsaveBuddy(props.name, props.id)}>Unselect</Button>
                }

                {
                    props.for === "adoptable" ?
                     <Button variant="secondary" onClick={() => saveBuddy(props.name, props.id)}>❤️ Save</Button> :
                     <Button variant="secondary" onClick={() => adoptedCommit(props.name, props.id)}>❤️ Adopt</Button>
                }               
               
            </div>
        </div>

    </Container>
}