import React, {useEffect, useState} from 'react'
import { NavLink, useParams} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import { Badge } from 'react-bootstrap';
import Unknown from './Unknown';

const Meal = () => {
  const [meal, setMeal] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const param = useParams()
  const country = param.country
  const mealId = param.mealId
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        if(!response.ok){
          throw new Error(`HTTP Response Error: ${response.status}`);
        }
        const result = await response.json()
        setMeal(result.meals[0])
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [mealId]);

      if(loading) return <h2>LOADING...</h2>
      if(error) return <h2>ERROR: {error}</h2>
      if(!meal) return <Unknown />

      const instructions = String(meal.strInstructions).split("\r\n\r\n")
      const ingredientKeys = Object.keys(meal).filter(key => key.startsWith('strIngredient'));
      
    return (
      <div className='p-5'>
        <NavLink to={`/${country}`} style={{textDecoration:'none', color:'black', fontWeight: 'bold'}}>←Back to {country}'s meals List</NavLink>
        <h2 className='mt-4 text-center'>{meal.strMeal}</h2>
        <Card>
          <Card.Img variant="top" src={meal.strMealThumb&&meal.strMealThumb} className='row-4 img-fluid' style={{maxWidth: '400px', margin:'10px auto'}}/>
          <Card.Body>
            <Card.Title>
              {meal.strMeal&&meal.strMeal}
              <a href={meal.strYoutube} target='_blank' rel="noreferrer">
                <Badge bg="white">
                  <button className='btn btn-outline-danger px-2 py-1 lh-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
                  </svg>
                  </button>
                </Badge>
                </a>
            </Card.Title>
            <div>
            <h5>Ingredients:</h5>
            <ul>
            {meal&&ingredientKeys.map((e,i)=>
              meal[e].length > 0 && <li key={e}>{meal['strMeasure'.concat(i+1)]+' '+meal[e]}</li>
            )}
            </ul>
            <h5>Instructions:</h5>
              {meal.strInstructions&&instructions.map((e,i) =>i%2 === 0?<span className='py-0 my-0 d-block' key={e}>{e}</span>:<span className='d-block' key={e}>{e}</span>)}
            
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  
}

export default Meal
