import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import Student from "./Student"

const Classroom = () => {
    const [students, setStudents] = useState([]);

    const [searchName, setSearchName] = useState("");
    const [searchMajor, setSearchMajor] = useState("");
    const [searchInterest, setsearchInterest] = useState("");

    const [page, setPage] = useState(1);

    function resetPageNum() {
        setPage(1);
    }

    function addPageNum() {
        setPage((pre) => pre + 1);
    }

    function minusPageNum() {
        setPage((pre) => pre - 1);
    }

    const searchedStudents = students.filter(s => {
        const name = `${s.name.first} ${s.name.last}`.toLowerCase();
        const major = s.major.toLowerCase();
        const interests = s.interests.map(i => i.toLowerCase());
        return (
            name.includes(searchName) &&
            major.includes(searchMajor) &&
            interests.some(i => i.includes(searchInterest))
        )
    });
    const shownStudents = searchedStudents.slice((page - 1) * 24, page * 24);
    const pageNum = Math.ceil(searchedStudents.length / 24);


    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw4/students", {
            headers: {
                "X-CS571-ID": "bid_dc56d365e836ff175237d8976f1c3b307e4fd6ae5fe4aa149a45d6f567466e04"
            }
        }) 
        .then(response => response.json()) 
        .then(students => {
            setStudents(students);
            console.log(students);
        })
    }, []);

    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName"
            value={searchName}
            onChange={(e) => {setSearchName(e.target.value.toLowerCase().trim())
                resetPageNum()
            }}/>
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor"
            value={searchMajor}
            onChange={(e) => {setSearchMajor(e.target.value.toLowerCase().trim())
                resetPageNum()
            }}/>
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest"
            value={searchInterest}
            onChange={(e) => {setsearchInterest(e.target.value.toLowerCase().trim())
                resetPageNum()
            }}/>
            <br />
            <Button variant="neutral" onClick={() => {
                setSearchName("");
                setSearchMajor("");
                setsearchInterest("");
                resetPageNum();
            }}>Reset Search</Button>
        </Form>
        { searchedStudents.length > 0 ? <p>There are {searchedStudents.length} student(s) matching your search.</p> :
            <p>Students data still loading...</p>
        }
        <Container fluid>
            <Row>
                { /* TODO Students go here! */ }
                {
                    shownStudents.map((student) => 
                        <Col xs={12} sm={12} md={6} lg={4} xl={3} key={student.id}> 
                            <Student {...student} ></Student>
                        </Col>
                    )
                }
            </Row>
                <Pagination>
                    {
                        ((page !== 1 && searchedStudents.length > 0)  && 
                        <Button onClick={() => minusPageNum()} variant="secondary">Previous</Button>)
                    }
                    {   
                        Array.from({ length: pageNum}, (_, i) => 
                            <Pagination.Item key={i + 1}
                                active={page === i + 1} 
                                onClick={() => setPage(i + 1)}
                                >
                                {i + 1}
                            </Pagination.Item>)
                    }
                                        {
                        ((page !== pageNum && searchedStudents.length > 0) && 
                        <Button onClick={() => addPageNum()} variant="secondary">Next</Button>)
                    }
                </Pagination>
        </Container>
    </div>

}

export default Classroom;