const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        {/* TODO Student data goes here! */}
        <h5>{props.major}</h5>
        <p>{props.name.first} is taking {props.numCredits} credits and is {props.fromWisconsin ?
        "" : "NOT"} from Wisconsin</p>
        <p>They have {props.interests.length} interest(s) including...</p>
        <ul>
            {props.interests.map((interest) => <li key={interest}>{interest}</li>)}
        </ul>
    </div>
}

export default Student;