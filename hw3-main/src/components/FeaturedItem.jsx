import { useState } from "react"
import { Card, Button, Table } from "react-bootstrap"

export default function FeaturedItem(props) {
    const [showNutrition, setShowNutrition] = useState(false);

    return <Card className="featureed-item-card">
        <img src={props.img} alt={props.name}></img>
        <h2>{props.name}</h2>
        <h3>${props.price} per unit</h3>
        <p>{props.description}</p>

        <h3>Nutrition Facts</h3>
        {showNutrition && (
            <div>    
                <Table>
                    <thead>
                        <tr>
                            <th>Calories</th>
                            <th>Fat</th>
                            <th>Carbohydrates</th>
                            <th>Protein</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>{props.nutrition.calories}</th>
                            <th>{props.nutrition.fat??"0g"}</th>
                            <th>{props.nutrition.carbohydrates??"0g"}</th>
                            <th>{props.nutrition.protein??"0g"}</th>
                        </tr>
                    </tbody>
                </Table>

            </div>
            )
        }

        <Button variant="secondary" 
            onClick={() => setShowNutrition(() => !showNutrition)}>
            {`${showNutrition ? "Hide Nutrition Facts" : "Show Nutrition Facts"}`}
        </Button> 

    </Card>
}